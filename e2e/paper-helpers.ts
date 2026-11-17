import { expect, type Page } from "@playwright/test";
export const categoryFor: Record<string, string> = {
  "neural-query-optimizer": "ai",
  "workplace-safety-vision": "ai",
  "llm-reliability-control-plane": "systems",
  "fault-tolerant-ml-telemetry": "systems",
  tradeflow: "quant",
  moneyball: "quant",
  "warehouse-routing-engine": "algorithms",
};
export async function openNotebook(page: Page, id: string) {
  await page.getByTestId(`category-${categoryFor[id]}`).click();
  await page.getByTestId(`wall-${categoryFor[id]}`).waitFor();
  await page.getByTestId(`open-notebook-${id}`).click();
  await expect(page.getByTestId("project-detail-modal")).toBeVisible();
}
