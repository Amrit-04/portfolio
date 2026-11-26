import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rampagePath = path.join(root, "scripts", "rampage-map.json");
const outputPath = path.join(root, "public", "openrider", "rampage-track.js");
const source = JSON.parse(await readFile(rampagePath, "utf8"));
const encode = (value) => {
    if (!Number.isSafeInteger(value)) {
        throw new Error(`Expected an integer track coordinate, received ${value}.`);
    }

    return value.toString(32);
};
const encodeLines = (lines) => lines.map((line) => {
    if (line.length < 4 || line.length % 2 !== 0) {
        throw new Error("Track geometry must contain coordinate pairs.");
    }

    return line.map(encode).join(" ");
}).join(",");

const [startX, startY] = source.start;
const [finishX, finishY] = source.finish;
const checkpoints = source.checkpoints
    .filter(([x]) => x >= startX && x < finishX)
    .sort(([xA], [xB]) => xA - xB)
    .map(([x, y]) => `C ${encode(x)} ${encode(y)}`);
const boosts = source.boosts.map(([x, y, angle]) => {
    return `B ${encode(x)} ${encode(y)} ${encode(angle - 360)}`;
});
const items = [
    ...checkpoints,
    ...boosts,
    `T ${encode(finishX)} ${encode(finishY)}`,
].join(",");
const trackCode = [
    encodeLines(source.physics),
    encodeLines(source.scenery),
    items,
    "",
    "",
    "BMX",
    `${encode(startX)} ${encode(startY - 51)}`,
].join("#");

await writeFile(outputPath, `window.OPENRIDER_TRACK_CODE=${JSON.stringify(trackCode)};\n`);
console.log(`Converted ${source.physics.length} physics lines, ${source.scenery.length} scenery lines, ${checkpoints.length} checkpoints, ${boosts.length} boosts, and the finish target.`);
