# Amriteshkumar Yadav — Engineering Portfolio

> **Dual-Mode Systems, AI/ML, and Quantitative Engineering Portfolio**  
> *B.Tech CSE (AI/ML Specialization), SRM Institute of Science and Technology (Graduated Jul 2026)*  
> **GitHub:** [Amrit-04](https://github.com/Amrit-04) • **Live Site:** [https://amrit-04.github.io/portfolio/](https://amrit-04.github.io/portfolio/)

---

## 🎨 Overview & Creative Direction

This portfolio combines two complementary frontend experiences built with **React 19**, **TypeScript**, and **Tailwind CSS v4**:

1. **Portfolio Mode (Inspired by Tiago Fragoso):**  
   An expressive, hand-drawn editorial portfolio with a warm paper palette (`#faf8f3`), organic SVG linework, and individually composed exhibition works. Every project has a distinct layout and composition, avoiding repetitive card grids and dashboard aesthetics.
2. **Ride Mode (Inspired by Free Rider HD):**  
   A playable, side-scrolling 2D bicycle game powered by custom **Verlet integration physics**, continuous line-segment terrain collision, landmark scenery, ramps, jumps, and in-game checkpoints that open interactive project notebooks.

All seven flagship systems feature **interactive, client-side browser sandboxes** running directly in WebAssembly/JavaScript with zero backend server dependencies.

---

## ⚡ Flagship Projects & In-Browser Sandboxes

| Exhibit | Project | Stack | Verified Benchmark / Source Highlight | Browser Execution Sandbox |
|:---:|:---|:---|:---|:---|
| **01** | **Neural Database Query Optimizer** | Python, PyTorch Geometric, ONNX Runtime Web, PostgreSQL 16, TPC-H | PlanGCN top-1 accuracy 38.9% (vs 29.2% GBDT baseline), 0.74 Spearman correlation, 2.17x speedup on TPC-H Q10. Native C++ model inference: 0.21 ms p95 (0.30 ms end-to-end). | **Live ONNX Web GNN Inference**: Evaluates real PostgreSQL EXPLAIN AST graphs client-side using `models/best_real.onnx` (54.5 KB) across 22 TPC-H query plan fixtures with verified mathematical parity (<1e-4). |
| **02** | **LLM Reliability Control Plane (LRCP)** | C++20, Python, DuckDB, Parquet, Redis, Next.js | CRC-32 checksummed WAL with fsync before ack, ~5 ms p99 ingest, 50k spans/sec compaction, <100 ms p99 DuckDB queries, 54 passing tests. | **Interactive OTLP Trace Explorer**: Hierarchical span waterfall visualizer with filters for Redis semantic cache hits, ChromaDB retrievals, and circuit-breaker fallback traces. |
| **03** | **Fault-Tolerant ML Telemetry Pipeline** | Go, Kafka KRaft (12 partitions), Python, Postgres, Redis | Go HTTP gateway (288.0 RPS, 5.37 ms p99, 24.3 MB RSS vs 85.7 MB Python), 7,117 eps sustained Kafka consumption (7,892 peak), 44,493 malformed DLQ routed, 0 loss across 900K+ chaos events. | **310-Second Kafka Replay Scrubber**: Replays real recorded telemetry samples from `telemetry_benchmarks.json` with linear sample interpolation, playback speed controls, 27-config partition sweep, and chaos integrity reconciliation. |
| **04** | **Tradeflow OMS & Pre-Trade Risk Engine** | Go, Redis Lua, FIX 4.2, Kafka, PostgreSQL Outbox | 113 ns/op OMS state transitions, 311 ns/op risk checks, 14.38 ms median E2E latency (17.99 ms p99), 1,000 rapid property tests, zero event loss across 2,057 FIX orders. | **Client-Side Go OMS Port**: Interactive FIX 4.2 order state machine (PendingNew → New → PartiallyFilled → Filled) with 7 pre-trade integer basis-point risk checks, fill quantity guards, and transactional outbox event ledger. |
| **05** | **Moneyball Quantitative Research Platform** | Python, PyTorch CUDA, HMM, Qiskit QAOA, CVXPY | 24-asset universe over 1,260 days, purged walk-forward CV (Rank IC 0.0359, ICIR 1.521), 3-state HMM (max DD 13.58% → 8.59%, Sharpe 2.02), CUDA Monte Carlo 1M paths in 29.26 ms (42.9x vs NumPy), 14-qubit QAOA (95.49% approx ratio). | **Seeded Merton Jump-Diffusion Monte Carlo**: Client-side compound Poisson jump simulation ($N \sim \text{Poisson}(\lambda \Delta t)$ via Knuth RNG), 95%/99% VaR, and 99% CVaR tail metrics, clearly compared against the native CUDA 29.26 ms benchmark. |
| **06** | **Warehouse Spatial Routing Engine** | C++17, pybind11, FastAPI, Redis, Docker | C++17 A* (0.50 ms, 31x speedup), Held-Karp / 2-opt TSP (1.30 ms, 56.5x speedup), Redis O(1) invalidation (-43.8% p50 latency, 144 RPS). | **Open-Path Warehouse Router**: Fixed dock start → optimal pick permutation → checkout goal. Pairs obstacle-aware A* with exact Held-Karp DP (≤10 stops) or 2-opt (>10 stops) with dynamic obstacle toggling and unreachable route detection. |
| **07** | **Edge Workplace Safety Computer Vision** | Python, Ultralytics YOLOv11, OpenCV, ByteTrack | Published in *IEEE RMKMATE 2026* (IEEE Xplore: 11518869). Dual-model cascade (`best.pt` PPE detector + `yolo11n.pt` person tracker), polygon geofencing, temporal centroid tracking. | **Spatial Geofencing Sandbox**: Normalized polygon projection, worker foot-point ground contact probing, and 2.0s alert cooldown logic simulation. |

---

## 🛠️ Architecture & Technologies

- **Core Framework:** React 19.3.1, TypeScript 7.0, Vite 8.3
- **Styling & Design System:** Tailwind CSS v4, custom `@theme` variables, warm paper aesthetic (`#faf8f3`), editorial typography (`Playfair Display`, `Inter`, `Caveat`, `JetBrains Mono`)
- **Animations & Smooth Scrolling:** Framer Motion, Lenis smooth scrolling
- **Game Physics Engine:** Custom 2D Verlet integration ragdoll bike physics:
  - Spring-damped distance constraints connecting chassis, wheels, and rider
  - Continuous line-segment collision resolution
  - Robust touch controls with `pointercancel`, pointer-release, and `window.blur` safety handlers
  - Checkpoint proximity triggers that open project notebooks and save respawn anchors
- **WASM Machine Learning:** `onnxruntime-web` loading PlanGCN models with isolated `ErrorBoundary` wrappers ensuring sandbox stability
- **Automated Testing:** Playwright E2E suite (`@playwright/test`) testing Desktop, Laptop, and Mobile viewports with local Chrome channel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Amrit-04/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
# Start local Vite development server
npm run dev
```

### Production Build

```bash
# Run typechecking and generate production dist with 404.html fallback
npm run build

# Preview production build locally on http://127.0.0.1:4173/portfolio/
npm run preview
```

### Automated End-to-End Testing

```bash
# Run full Playwright test suite across Desktop, Laptop, and Mobile viewports
npm run test:e2e
```

### Code Quality & Linting

```bash
# Run oxlint across all source files
npm run lint
```

---

## 📑 Empirical Source-of-Truth Standard

Every performance metric, accuracy claim, and speedup ratio cited across this website is backed by verified benchmark data and test suites preserved in repository artifacts:
- [`public/data/golden_predictions.json`](./public/data/golden_predictions.json): 22 verified TPC-H execution plan cost tensors.
- [`public/data/telemetry_benchmarks.json`](./public/data/telemetry_benchmarks.json): 310s sustained Kafka run, 27 partition tuning results, Go vs Python polyglot benchmarks, and chaos recovery reconciliation.
- [`public/data/quant_and_routing_benchmarks.json`](./public/data/quant_and_routing_benchmarks.json): 1,260-day walk-forward ICIR, CUDA 1M-path Monte Carlo benchmarks, QAOA circuit metrics, and C++17 routing execution times.
- [`README_ALIGNMENT_REPORT.md`](./README_ALIGNMENT_REPORT.md): Complete repository audit alignment report.

---

## 📄 License

MIT © [Amriteshkumar Yadav](https://github.com/Amrit-04)
