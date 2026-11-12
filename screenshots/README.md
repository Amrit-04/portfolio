# Website Visual & Interaction Review Archive

> **Automated Visual Archive for AI Agents & Technical Reviewers**  
> **Repository:** [Amrit-04/portfolio](https://github.com/Amrit-04)  
> **Live Website:** [https://amrit-04.github.io/portfolio/](https://amrit-04.github.io/portfolio/)  
> **Design References:** [Tiago Fragoso](https://tiagofragoso.com/) (Handcrafted editorial exhibition) & [Free Rider HD](https://www.freeriderhd.com/) (Playable 2D bicycle physics world)  
> **Stack:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, Verlet Physics Engine, ONNX Runtime Web  

This folder contains high-resolution browser captures across **Desktop (1440×900)**, **Laptop (1366×768)**, and **Mobile (390×844)** viewports, documenting every page section, all 7 interactive in-browser demo sandboxes, and the 2D physics game.

---

## 📑 Visual Index

### 1. Portfolio Mode (Main Exhibition Sections)

| File Name | Resolution | Description & Key Visual Elements |
|---|:---:|---|
| [`01_portfolio_hero_desktop.png`](./01_portfolio_hero_desktop.png) | 1440×900 | **Hero Section**: Floating pill navigation bar, hand-drawn bike rider illustration, editorial serif headline (*"I build things that think, move, and scale."*), verified metrics marquee, and "Enter the track" game CTA. |
| [`02_portfolio_work_exhibits_desktop.png`](./02_portfolio_work_exhibits_desktop.png) | 1440×900 | **Exhibition Wall (Selected Works)**: Seven individualized project exhibits featuring distinct framing, hand-drawn SVG artwork, handwritten notes, and interactive "Open notebook" triggers (no uniform card grids). |
| [`03_portfolio_about_desktop.png`](./03_portfolio_about_desktop.png) | 1440×900 | **About Section**: Personal philosophy, education details (SRM IST B.Tech CSE AI/ML, July 2026), systems engineering approach, and hand-drawn desk sketch. |
| [`04_portfolio_skills_desktop.png`](./04_portfolio_skills_desktop.png) | 1440×900 | **Technical Skills Index**: Categorized taxonomy (Systems & Infrastructure, AI/ML & Deep Learning, Distributed Data & Streaming, Quant & Scientific Computing) with proficiency badges. |
| [`05_portfolio_research_desktop.png`](./05_portfolio_research_desktop.png) | 1440×900 | **Research & Publications**: Peer-reviewed paper presentation (*IEEE RMKMATE 2026*, IEEE Xplore: 11518869) with architecture diagrams and citation links. |
| [`06_portfolio_contact_desktop.png`](./06_portfolio_contact_desktop.png) | 1440×900 | **Contact & Colophon**: Hand-drawn signature, direct email, verified resume download button, GitHub, and LinkedIn links. |

---

### 2. Interactive In-Browser Demo Sandboxes (Modal Views)

Every project includes a client-side execution sandbox wrapped in an isolated `ErrorBoundary` running real algorithms with zero backend server dependencies:

| File Name | Project & Sandbox | Algorithmic Implementation & Visual State |
|---|---|---|
| [`01_demo_neural_query_optimizer.png`](./01_demo_neural_query_optimizer.png) | **Neural Database Query Optimizer** | **ONNX Web GNN Inference**: Client-side evaluation of PostgreSQL 16 EXPLAIN operator ASTs using PlanGCN (`models/best_real.onnx`, 54.5 KB). Compares predicted latency against verified golden predictions from `golden_predictions.json`. |
| [`02_demo_lrcp_trace_explorer.png`](./02_demo_lrcp_trace_explorer.png) | **LLM Reliability Control Plane (LRCP)** | **Interactive OTLP Trace Waterfall**: Hierarchical span explorer with reactive filter buttons (Redis cache hits, ChromaDB vectors, circuit breaker fallbacks) and search query synchronization. |
| [`03_demo_telemetry_pipeline_replay.png`](./03_demo_telemetry_pipeline_replay.png) | **Fault-Tolerant ML Telemetry Replay** | **310-Second Kafka Replay Scrubber**: Real recorded telemetry timeseries from `telemetry_benchmarks.json` with linear sample interpolation, playback speed toggles (0.5x–5x), 27-row consumer tuning sweep table, and chaos recovery reconciliation. |
| [`04_demo_tradeflow_oms.png`](./04_demo_tradeflow_oms.png) | **Tradeflow OMS & Pre-Trade Risk Engine** | **Deterministic FIX 4.2 Order FSM**: Interactive order state transitions (`PendingNew` → `New` → `PartiallyFilled` → `Filled`) with 7 atomic pre-trade risk checks, guarded fill quantities, and outbox event logging. |
| [`05_demo_moneyball_jump_diffusion.png`](./05_demo_moneyball_jump_diffusion.png) | **Moneyball Quantitative Risk Platform** | **Merton Compound Poisson Monte Carlo**: Seeded jump-diffusion path simulation ($N \sim \text{Poisson}(\lambda \Delta t)$), 95%/99% VaR, 99% CVaR tail metrics, and native CUDA benchmark comparison (1M paths in 29.26 ms, 42.9x speedup). |
| [`06_demo_warehouse_routing.png`](./06_demo_warehouse_routing.png) | **Warehouse Spatial Routing Engine** | **Open-Path Warehouse Router**: Fixed dock `(1,1)` → optimal pick sequence → checkout `(14,10)`. Pairwise distance matrix via obstacle-aware A* combined with exact Held-Karp DP (≤10 stops) or 2-opt (>10 stops). Displays solved tour steps and C++17 benchmarks (31x A*, 56.5x TSP). |
| [`07_demo_workplace_safety.png`](./07_demo_workplace_safety.png) | **Edge Workplace Safety Vision** | **Spatial Geofencing Sandbox**: Normalized coordinate projection, worker foot-point hazard boundary probing, dynamic zone editing, and 2.0s alert cooldown simulation (IEEE RMKMATE 2026). |

---

### 3. Ride Mode (Playable 2D Free Rider HD Bicycle Game)

| File Name | Resolution | Description & Key Visual Elements |
|---|:---:|---|
| [`08_ride_mode_desktop.png`](./08_ride_mode_desktop.png) | 1440×900 | **Ride Mode in Motion**: Playable side-scrolling 2D bicycle game powered by custom Verlet integration ragdoll physics. Shows rider traversing hand-drawn terrain, background landmark sketches, live speedometer HUD, and checkpoint banners. |
| [`09_ride_mode_paused_desktop.png`](./09_ride_mode_paused_desktop.png) | 1440×900 | **Game Pause Overlay**: Modal overlay triggered via `Space` key or HUD pause button, providing "Resume riding" and "Exit to portfolio" options. |
| [`12_ride_mode_mobile_touch_controls.png`](./12_ride_mode_mobile_touch_controls.png) | 390×844 | **Mobile Touch Controls**: Responsive touch D-Pad and action buttons for pedal forward, brake/reverse, lean back, lean forward, restart, and pause. |

---

### 4. Cross-Device Responsive Layouts

| File Name | Device Viewport | Purpose & Verified Elements |
|---|:---:|---|
| [`10_portfolio_laptop_1366x768.png`](./10_portfolio_laptop_1366x768.png) | Laptop (1366×768) | Verifies fluid scaling on common 13-14 inch laptops without horizontal overflow or misaligned SVG strokes. |
| [`11_portfolio_mobile_390x844.png`](./11_portfolio_mobile_390x844.png) | Mobile (390×844) | Verifies compact mobile header with branding and "Ride" CTA, responsive typography, single-column exhibition stack, and touch targets. |

---

## 🤖 Instructions for AI Agents Reviewing This Website

When evaluating or extending this portfolio:
1. **Design System**: Palette uses `#faf8f3` (warm paper), `#1c1917` (ink), `#c8372d` (red accent), and `#2d6a4f` (pine). Do not introduce generic dark-mode SaaS components or blueprint styling.
2. **Individualized Exhibits**: Do not revert `src/modes/portfolio/ProjectsGallery.tsx` into a uniform card loop. Keep each project's unique exhibition layout, frame styling, and hand-drawn annotations.
3. **Data Integrity**: All performance metrics and benchmarks cited in UI components must map to authoritative files in `public/data/` (`golden_predictions.json`, `telemetry_benchmarks.json`, `quant_and_routing_benchmarks.json`).
4. **Automated Testing**: Run `npm run test:e2e` to verify all 27 Playwright tests across Desktop, Laptop, and Mobile viewports before proposing structural UI changes.
