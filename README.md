# Amriteshkumar Yadav — Engineering Portfolio

> **Dual-Mode Systems, AI/ML, and Quantitative Engineering Portfolio**  
> *B.Tech CSE AI/ML, SRM Institute of Science and Technology (Graduated Jul 2026)*  
> **GitHub:** [Amrit-04](https://github.com/Amrit-04) • **Live Site:** [https://amrit-04.github.io/portfolio/](https://amrit-04.github.io/portfolio/)

---

## 📐 Overview

This portfolio showcases production-grade systems engineering, applied AI/ML, distributed pipelines, and quantitative research. It is built around a **strict empirical source-of-truth standard**: every metric is verified from repository tests, benchmark artifacts, and peer-reviewed publication data.

The portfolio features two distinct presentation modes:
1. **Blueprint Mode**: An architectural sketchbook UI with a 20px grid, hand-drawn aesthetic, high-contrast monospace typography, and interactive role-lens filtering (AI/ML, Data Science, Fintech, SDE).
2. **Rider Mode**: A canvas-based 2D ragdoll physics game inspired by *Free Rider HD*, powered by a custom Verlet integration physics engine. Users ride across line-segment terrain, encounter anti-gravity pads, and trigger interactive project deep-dive modals at signposts and pit drops.

---

## ⚡ Featured Projects & Interactive Demos

| Tier | Project | Key Technologies | Verified Highlights | In-Browser Demo |
|:---:|:---|:---|:---|:---|
| **Tier A** | **Neural Database Query Optimizer** | Python, PyG, ONNX Runtime Web, PostgreSQL 16, TPC-H | GNN top-1 38.9% (vs 29.2% GBDT baseline), 0.74 Spearman correlation, 2.17x speedup on TPC-H Q10, 0.21 ms p95 ONNX model latency | **Real ONNX Web GNN Execution**: parses real PostgreSQL EXPLAIN JSON trees client-side and computes cost predictions with zero server calls. |
| **Tier A** | **LLM Reliability Control Plane** | C++20, Python, DuckDB, Parquet, Redis, Next.js | CRC-32 checksummed WAL with fsync before ack, ~5 ms p99 ingest, 50k spans/sec compaction, <100 ms p99 DuckDB queries, 54 passing tests | **Interactive Trace Explorer**: waterfall & span hierarchy visualizer with cache-hit, cache-miss, and circuit-breaker telemetry filters. |
| **Tier A** | **Tradeflow OMS** | Go, Redis Lua, FIX 4.2, Kafka, PostgreSQL Outbox | 113 ns/op OMS state transitions, 311 ns/op risk checks, 14.38 ms median E2E latency (17.99 ms p99), 1,000 rapid property tests, zero event loss | **Client-Side Go OMS Port**: interactive FIX 4.2 state transition engine with 7 integer basis-point pre-trade risk checks and transactional outbox log. |
| **Tier A** | **Warehouse Routing Engine** | C++17, pybind11, FastAPI, Redis, Docker | C++17 A* (0.50 ms, 31x speedup), Held-Karp / 2-opt TSP (1.30 ms, 56.5x speedup), Redis O(1) invalidation (-43.8% p50 latency, 144 RPS) | **Interactive Grid Routing Sandbox**: live A* obstacle traversal and exact Held-Karp ($O(K^2 \cdot 2^K)$) multi-waypoint path optimization. |
| **Tier B** | **Fault-Tolerant ML Telemetry Pipeline** | Go, Kafka KRaft (12 partitions), Python, Postgres, Redis | Go HTTP gateway (288.0 RPS, 5.37 ms p99, 24.3 MB RSS vs 85.7 MB Python), 7,117 events/sec sustained Kafka consumption (7,892 peak), 44,493 malformed DLQ routed, 0 loss across 900K+ chaos events | **310-Second Kafka Replay Scrubber**: interactive telemetry playback tracking throughput vs consumer lag, 27-config tuning sweeps, and chaos inject milestones. |
| **Tier B** | **Moneyball Quantitative Platform** | Python, PyTorch CUDA, HMM, Qiskit QAOA, CVXPY | 24-asset universe over 1,260 days, purged walk-forward CV (Rank IC 0.0359, ICIR 1.521), 3-state HMM (max DD 13.58% → 8.59%, Sharpe 2.02), CUDA Monte Carlo 1M paths in 29.26 ms (42.9x vs NumPy), 14-qubit QAOA (95.49% approx ratio) | **Alpha & Risk Replay Engine**: walk-forward regime visualizer paired with an interactive Jump-Diffusion Monte Carlo risk slider. |
| **Tier C** | **Workplace Safety Computer Vision** | Python, Ultralytics YOLOv11, OpenCV, ByteTrack | Published in *IEEE RMKMATE 2026* (IEEE Xplore: 11518869). Dual-model cascade (`best.pt` PPE detector + `yolo11n.pt` person tracker), polygon geofencing, temporal centroid tracking | **Architecture & Geofence Case Study**: interactive polygon geofencing sandbox demonstrating intrusion violation detection and citation details. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend & UI:** React 18, TypeScript, Tailwind CSS v4, Lucide React, Zustand
- **Physics Engine:** Custom 2D Verlet integration physics engine (`RiderCanvas.tsx`):
  - Two wheels connected by distance constraints with spring damping
  - Ragdoll rider with rigid torso and head constraints
  - Continuous line-segment collision resolution
  - Dynamic anti-gravity bounce pads and checkpoint signposts
- **Client-Side AI Inference:** `onnxruntime-web` (WebAssembly single-threaded CPU runtime loading `models/best_real.onnx` lazily on modal open)
- **Design Language:** Architectural sketchbook aesthetic (`#f8f9fa` / `#0f141c`), 20px CSS grid pattern, hand-drawn sketch borders (`sketch-box`), high contrast, fully accessible (WCAG AA).
- **Zero Fabrication Standard:** All metrics carry direct `sourceUrl` links to repository test suites, benchmarks, and publication records.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Amrit-04/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start Vite development server
npm run dev
```

Open your browser to `http://localhost:5173`.

### Production Build

```bash
# Run typecheck and bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 📑 Resume Alignment & Documentation Audit

As part of this repository's engineering standards, all 8 associated repositories were audited and aligned with verified claims:
- See [`README_ALIGNMENT_REPORT.md`](./README_ALIGNMENT_REPORT.md) for the complete audit log, verified benchmarks, and repository branches (`docs/align-readme-verified-resume`).

---

## 📄 License

MIT © [Amriteshkumar Yadav](https://github.com/Amrit-04)
