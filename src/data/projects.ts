export type ProjectTier = 'A' | 'B' | 'C';

export type RoleLensKey = 'aiml' | 'ds' | 'fintech' | 'sde';

export interface ProjectMetric {
  label: string;
  value: string;
  benchmarkContext?: string;
  sourceUrl: string;
  isInformal?: boolean;
}

export interface ProjectDecision {
  decision: string;
  rationale: string;
  tradeoff: string;
}

export type DemoType =
  | 'onnx-gnn'
  | 'trace-explorer'
  | 'pipeline-replay'
  | 'spatial-wasm'
  | 'oms-fsm'
  | 'hmm-risk'
  | 'case-study';

export interface ProjectDefinition {
  id: string;
  title: string;
  tagline: string;
  tier: ProjectTier;
  tierLabel: string;
  stack: string[];
  problem: string;
  built: string[];
  decisions: ProjectDecision[];
  limitations: string[];
  metrics: ProjectMetric[];
  links: {
    repo: string;
    paper?: string;
    sourceCodeUrl?: string;
  };
  demoType: DemoType;
  lensRank: Record<RoleLensKey, number>;
}

export const PROJECTS: ProjectDefinition[] = [
  {
    id: 'neural-query-optimizer',
    title: 'Neural Database Query Optimizer',
    tagline: 'Learned Cost Estimation & Physical Plan Selection with Graph Neural Networks',
    tier: 'A',
    tierLabel: 'RUNS IN BROWSER',
    stack: ['Python', 'PyTorch', 'Graph Neural Networks', 'ONNX Runtime', 'PostgreSQL 16', 'TPC-H', 'MLflow'],
    problem:
      'Traditional database cost-based optimizers (CBOs) rely on static heuristics with attribute value independence assumptions, causing severe cardinality misestimation and suboptimal join order selections on multi-table queries.',
    built: [
      'Parsed PostgreSQL 16 EXPLAIN plans into directed plan graphs preserving operator semantics, cardinalities, and cost features.',
      'Trained GCN, GAT, and GraphSAGE models using pairwise margin ranking loss on 184 real execution plans across 12 TPC-H query templates.',
      'Evaluated zero-shot plan selection via nested leave-one-template-out cross-validation across 3 random seeds.',
      'Exported winning PlanGCN model to ONNX Runtime for ultra-low latency single-threaded CPU inference.',
    ],
    decisions: [
      {
        decision: 'Pairwise margin ranking loss instead of absolute runtime regression',
        rationale:
          'Absolute execution times are highly noisy and hardware-dependent; ranking loss learns relative cost utility directly.',
        tradeoff:
          'Cannot predict exact wall-clock milliseconds directly, but excels at selecting the optimal physical join candidate.',
      },
      {
        decision: 'Nested leave-one-template-out cross-validation',
        rationale: 'Guarantees zero test-set leakage when evaluating unseen query topologies.',
        tradeoff: 'Significantly higher training computational overhead across 12 distinct fold evaluations.',
      },
    ],
    limitations: [
      'While outperforming flat GBDT (+9.7 pp) and achieving 2.17x speedup on TPC-H Q10, PostgreSQL native CBO still achieves higher overall top-1 accuracy (41.7% vs 38.9%) across the full 12-template suite.',
      'Training corpus was evaluated at TPC-H Scale Factor 0.05 on a single PostgreSQL instance.',
    ],
    metrics: [
      {
        label: 'Spearman Rank Correlation',
        value: '0.74 (0.738 ± 0.030)',
        benchmarkContext: '184 plans, 12 TPC-H templates, 3 seeds',
        sourceUrl:
          'https://github.com/Amrit-04/neural-query-optimizer/blob/main/results/evaluation_real.json',
      },
      {
        label: 'Top-1 Plan Selection Accuracy',
        value: '38.9% vs 29.2% Flat GBDT (+9.7 pp)',
        benchmarkContext: 'Nested leave-one-template-out CV',
        sourceUrl:
          'https://github.com/Amrit-04/neural-query-optimizer/blob/main/results/evaluation_real.json',
      },
      {
        label: 'TPC-H Q10 Query Speedup',
        value: '2.17x (Regret: 18.6ms -> 1.35ms)',
        benchmarkContext: 'Optimal Hash Join selection over NestLoop',
        sourceUrl: 'https://github.com/Amrit-04/neural-query-optimizer/blob/main/REPORT_REAL.md',
      },
      {
        label: 'ONNX CPU Latency (p95)',
        value: '0.21 ms model / 0.44 ms end-to-end',
        benchmarkContext: 'Single-threaded CPU execution (intra_op=1)',
        sourceUrl:
          'https://github.com/Amrit-04/neural-query-optimizer/blob/main/results/latency_results_real.json',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/neural-query-optimizer',
    },
    demoType: 'onnx-gnn',
    lensRank: { aiml: 1, ds: 2, fintech: 5, sde: 5 },
  },
  {
    id: 'llm-reliability-control-plane',
    title: 'LLM Reliability Control Plane (LRCP)',
    tagline: 'Self-Hosted, Local-First Observability & RAG Guardrails with Sub-5ms Ingestion',
    tier: 'A',
    tierLabel: 'RUNS IN BROWSER',
    stack: [
      'C++20',
      'Python',
      'FastAPI',
      'DuckDB',
      'OpenTelemetry (OTLP)',
      'Redis',
      'ChromaDB',
      'Llama 3.2',
      'Docker',
    ],
    problem:
      'Cloud-hosted LLM observability platforms impose prohibitive per-span ingestion costs, latency penalties, and data privacy leaks when tracing internal prompts, embeddings, and multi-agent spans.',
    built: [
      'Engineered an OTLP/HTTP Protobuf ingestion gateway in C++20 with CRC-32 checksumming, fsync durability, and 64 MB WAL segment rotation.',
      'Developed a streaming Python background materializer with two-phase Zstd-compressed Parquet compaction sustaining 50,000 spans/sec.',
      'Integrated an embedded DuckDB engine executing analytical trace queries over columnar Parquet files in <100 ms p99.',
      'Built a local RAG guardrail gateway (Llama 3.2 4-bit Q4_K_M, ChromaDB) with Redis semantic caching (0.90 cosine threshold) and circuit-breaker fallbacks.',
    ],
    decisions: [
      {
        decision: 'C++20 binary gateway with append-only WAL before HTTP 200 acknowledgment',
        rationale: 'Prevents span loss during backend process restarts while preserving sub-millisecond network throughput.',
        tradeoff: 'Requires two-process architecture with background Parquet materializer.',
      },
      {
        decision: 'Embedded DuckDB over Parquet rather than external ClickHouse or Elasticsearch',
        rationale: 'Zero operational footprint for single-node / local-first developer workstations.',
        tradeoff: 'Single-node analytical scale compared to distributed columnar clusters.',
      },
    ],
    limitations: [
      'Performance metrics (~5 ms p99 ingest, ~50k spans/sec compaction, <100 ms p99 query) are informal dev measurements on a single host; no formal distributed benchmark harness is included.',
      'RAG quality metrics (faithfulness, context precision) are unmeasured design targets, not empirical SLA guarantees.',
    ],
    metrics: [
      {
        label: 'Gateway Ingest Latency (p99)',
        value: '5 ms p99 (<50 MB RSS)',
        benchmarkContext: 'Informal dev measurement (C++ OTLP + fsync WAL)',
        sourceUrl: 'https://github.com/Amrit-04/llm-reliability-control-plane/blob/main/README.md',
        isInformal: true,
      },
      {
        label: 'Compaction Materialization Rate',
        value: '50,000 spans/sec',
        benchmarkContext: 'Informal dev measurement (Two-phase Zstd Parquet)',
        sourceUrl: 'https://github.com/Amrit-04/llm-reliability-control-plane/blob/main/README.md',
        isInformal: true,
      },
      {
        label: 'DuckDB Query Latency (p99)',
        value: '<100 ms p99',
        benchmarkContext: 'Informal dev measurement (Columnar Parquet scan)',
        sourceUrl: 'https://github.com/Amrit-04/llm-reliability-control-plane/blob/main/README.md',
        isInformal: true,
      },
      {
        label: 'Automated Test Coverage',
        value: '54 tests (100% passing)',
        benchmarkContext: '9 GTest C++ + 45 pytest Python suites',
        sourceUrl: 'https://github.com/Amrit-04/llm-reliability-control-plane/blob/main/backend/tests/',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/llm-reliability-control-plane',
    },
    demoType: 'trace-explorer',
    lensRank: { aiml: 2, ds: 3, fintech: 4, sde: 4 },
  },
  {
    id: 'fault-tolerant-ml-telemetry',
    title: 'Fault-Tolerant ML Telemetry Pipeline',
    tagline: 'High-Throughput Feature Streaming with Kafka, Redis Caching & Zero Data Loss DLQ',
    tier: 'B',
    tierLabel: 'REAL RUN, RECORDED',
    stack: ['Go (Chi)', 'Apache Kafka', 'PostgreSQL 16', 'Redis', 'Python', 'Prometheus', 'Grafana', 'Docker'],
    problem:
      'High-frequency telemetry streams from distributed ML models cause severe head-of-line blocking, memory exhaustion, and message loss during database crashes or network partitions.',
    built: [
      'Engineered a concurrent Go HTTP ingestion service using bounded goroutine worker pools (50 workers) and Snappy-compressed Kafka producers.',
      'Constructed a 12-partition Kafka streaming topology partitioned by entity_id with batched idempotent writes.',
      'Conducted a systematic 27-configuration empirical tuning sweep over partition counts, consumer threads, and batch sizes.',
      'Developed a resilient Go dead-letter queue (DLQ) re-drive service and strict JSON Schema validator with Prometheus observability.',
    ],
    decisions: [
      {
        decision: 'Go Goroutine worker pool with buffered channel instead of Python FastAPI',
        rationale:
          'Drastically reduces memory footprint under sustained concurrency and eliminates GIL latency spikes.',
        tradeoff: 'Polyglot architecture requiring Go for ingress and Python for ML client integrations.',
      },
      {
        decision: 'Partitioning by entity_id over 12 partitions',
        rationale:
          'Guarantees strictly ordered feature delivery per entity while enabling 12-way horizontal consumer scaling.',
        tradeoff: 'Potential partition skew if traffic distribution follows severe Zipfian concentrations.',
      },
    ],
    limitations: [
      'Under single-host container resource constraints (8 CPU / 10 GB RAM), the pipeline sustained 7,117 events/sec avg (7,892 peak), falling short of the artificial 10,000 eps target with consumer lag climbing to 1.56M events.',
      'Local NVMe SSD page cache rendered Redis feature cache latency reduction negligible (1,575 ms vs 1,585 ms p99).',
    ],
    metrics: [
      {
        label: 'Go vs. Python HTTP Ingestion Throughput',
        value: '288.0 vs 151.6 RPS (+90%)',
        benchmarkContext: '50k requests at concurrency 50',
        sourceUrl:
          'https://github.com/Amrit-04/Fault-Tolerant-ML-Telemetry-Feature-Streaming-Pipeline/blob/main/benchmarks/go_ingestion_results.json',
      },
      {
        label: 'Ingestion Latency & Memory Reduction',
        value: '-54.7% p99 / -71.6% RSS (24.3 MB)',
        benchmarkContext: '756ms vs 1,671ms p99; 24.3MB vs 85.7MB RSS',
        sourceUrl:
          'https://github.com/Amrit-04/Fault-Tolerant-ML-Telemetry-Feature-Streaming-Pipeline/blob/main/benchmarks/go_ingestion_results.json',
      },
      {
        label: 'Sustained Kafka Event Processing',
        value: '7,117 events/sec (7,892 peak)',
        benchmarkContext: '310s sustained run, 2.2M+ events on single node',
        sourceUrl:
          'https://github.com/Amrit-04/Fault-Tolerant-ML-Telemetry-Feature-Streaming-Pipeline/blob/main/benchmarks/results/throughput_20261022T151428.json',
      },
      {
        label: 'Chaos Fault Recovery & DLQ Isolation',
        value: '100% DLQ routed / 0 lost across 900K+',
        benchmarkContext: '44,493 malformed isolated; 900,469 valid persisted',
        sourceUrl:
          'https://github.com/Amrit-04/Fault-Tolerant-ML-Telemetry-Feature-Streaming-Pipeline/blob/main/benchmarks/results/chaos_20261022T160712.json',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/Fault-Tolerant-ML-Telemetry-Feature-Streaming-Pipeline',
    },
    demoType: 'pipeline-replay',
    lensRank: { aiml: 3, ds: 4, fintech: 3, sde: 1 },
  },
  {
    id: 'tradeflow',
    title: 'Tradeflow: Event-Driven OMS & Pre-Trade Risk',
    tagline: 'Tier-1 Institutional Equity Trade Lifecycle Engine with Atomic Redis Lua Checks',
    tier: 'A',
    tierLabel: 'RUNS IN BROWSER / REPLAY',
    stack: ['Go', 'PostgreSQL 16', 'Redis (Lua)', 'Apache Kafka', 'FIX 4.2', 'Rapid Property Testing', 'Docker'],
    problem:
      'Institutional equities systems require deterministic sub-microsecond pre-trade risk controls and strict idempotency to prevent overfills, erroneous executions, and catastrophic account drawdowns.',
    built: [
      'Built an event-driven Order Management System (OMS) in Go with deterministic state machine transitions (113 ns/op).',
      'Engineered an atomic pre-trade risk engine in Redis Lua evaluating 7 rules (price bands, order size, gross exposure, emergency kill switch) in 311 ns/op across 50 concurrent workers.',
      'Achieved 14.38 ms median and 17.99 ms p99 end-to-end latency with zero event loss across Kafka broker restarts.',
      'Verified idempotent position and P&L accounting across 1,000 randomized property tests using Rapid with duplicate and out-of-order execution fills.',
    ],
    decisions: [
      {
        decision: 'Pure integer basis-point math in Redis Lua scripts',
        rationale:
          'Completely eliminates IEEE-754 floating point rounding drift when verifying cash limits and price collars.',
        tradeoff: 'Requires strict fixed-point scaling factor conventions across API contracts.',
      },
      {
        decision: 'PostgreSQL Transactional Outbox pattern',
        rationale: 'Guarantees that database writes and Kafka event dispatches are atomically committed, preventing ghost orders.',
        tradeoff: 'Introduces a background outbox polling publisher with slight relay latency.',
      },
    ],
    limitations: [
      'Microbenchmarks measured in concurrent multi-worker environments yielded 113 ns/op (OMS) and 311 ns/op (Risk), reflecting slight lock contention compared to isolated single-core runs (102.3 ns and 274.4 ns).',
      'Historical simulation VaR is computed in offline Python reconciliation scripts, not inside the hot-path Go binary.',
    ],
    metrics: [
      {
        label: 'OMS State Machine Transition Latency',
        value: '113 ns/op (~8.85M ops/sec)',
        benchmarkContext: 'Deterministic FSM, 104 B/op (3 allocs)',
        sourceUrl: 'https://github.com/Amrit-04/Tradeflow/blob/main/README.md',
      },
      {
        label: 'Pre-Trade Risk Rule Evaluation (7 Rules)',
        value: '311 ns/op (~3.22M ops/sec)',
        benchmarkContext: '50 concurrent workers, atomic Redis Lua',
        sourceUrl: 'https://github.com/Amrit-04/Tradeflow/blob/main/README.md',
      },
      {
        label: 'Live End-to-End Latency (p50 / p99)',
        value: '14.38 ms median / 17.99 ms p99',
        benchmarkContext: '2,057 FIX orders through full multi-container stack',
        sourceUrl: 'https://github.com/Amrit-04/Tradeflow/blob/main/docs/benchmarks.md',
      },
      {
        label: 'Property-Based Verification',
        value: '1,000 Rapid Checks Passed',
        benchmarkContext: 'Up to 4x duplicate & out-of-order fills with zero overfills',
        sourceUrl: 'https://github.com/Amrit-04/Tradeflow/blob/main/tests/property_position_test.go',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/Tradeflow',
    },
    demoType: 'oms-fsm',
    lensRank: { aiml: 5, ds: 5, fintech: 1, sde: 2 },
  },
  {
    id: 'moneyball',
    title: 'Moneyball: Quantitative Alpha & GPU Risk Engine',
    tagline: 'Cross-Sectional Factor Pipeline, 3-State Gaussian HMM & CUDA Monte Carlo VaR',
    tier: 'B',
    tierLabel: 'REAL RUN, RECORDED',
    stack: ['Python', 'PyTorch (CUDA)', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Gaussian HMM', 'NumPy', 'Parquet'],
    problem:
      'Financial factor models suffer from lookahead bias, non-stationary market regimes, and severe computational bottlenecks when simulating non-linear jump-diffusion tail risk.',
    built: [
      'Built cross-sectional alpha framework across 24 assets over 1,260 trading days using purged and embargoed walk-forward cross-validation (504d train, 5d purge/embargo).',
      'Developed a 3-state Gaussian HMM on market log-returns and volatility, reducing 3-year out-of-sample max drawdown from 13.58% to 8.59% (2.02 Sharpe ratio) net of 10 bps turnover costs.',
      'Architected a PyTorch CUDA Monte Carlo risk engine simulating 1,000,000 Merton Jump-Diffusion paths in 29.26 ms (42.9x speedup over NumPy).',
      'Formulated cardinality-constrained portfolio optimization as a 14-qubit QAOA/QUBO Hamiltonian reaching a 95.49% approximation ratio.',
    ],
    decisions: [
      {
        decision: 'Purged and embargoed cross-validation (504d train / 5d purge / 63d test / 5d embargo)',
        rationale: 'Eliminates overlapping serial correlation and forward lookahead leakage in financial labels.',
        tradeoff: 'Reduces available effective training sample size per evaluation fold.',
      },
      {
        decision: 'GPU tensor parallelization for Merton Jump-Diffusion paths',
        rationale: 'Generates Poisson jump numbers and compound normal innovations simultaneously in GPU registers.',
        tradeoff: 'Requires high GPU VRAM bandwidth for billion-element intermediate matrices.',
      },
    ],
    limitations: [
      'All reported alpha, regime switching, and risk metrics represent simulated backtests and offline risk computations under zero-lookahead methodology; they do not represent live capital trading.',
      'Asset universe is a cross-asset panel of 24 liquid instruments (equities, ETFs, commodities, and 4 major crypto assets).',
    ],
    metrics: [
      {
        label: 'Out-of-Sample Alpha Rank IC & ICIR',
        value: '0.0359 Rank IC / 1.521 Annualized ICIR',
        benchmarkContext: 'Purged walk-forward validation (5 folds, 315 days)',
        sourceUrl: 'https://github.com/Amrit-04/moneyball/blob/main/benchmarks/quant_results.json',
      },
      {
        label: 'HMM Regime Drawdown Reduction',
        value: '13.58% -> 8.59% Max Drawdown (2.02 Sharpe)',
        benchmarkContext: '3-year backtest net of 10 bps turnover costs',
        sourceUrl: 'https://github.com/Amrit-04/moneyball/blob/main/benchmarks/quant_results.json',
      },
      {
        label: 'CUDA Monte Carlo Tail Risk Engine',
        value: '1M paths in 29.26 ms (42.9x vs NumPy)',
        benchmarkContext: '24 correlated assets, 10-day Merton Jump-Diffusion',
        sourceUrl: 'https://github.com/Amrit-04/moneyball/blob/main/benchmarks/quant_results.json',
      },
      {
        label: 'QAOA / QUBO Portfolio Optimization',
        value: '95.49% Approximation Ratio (Depth p=2)',
        benchmarkContext: '14 qubits, 16,384 basis states, K=4 cardinality',
        sourceUrl: 'https://github.com/Amrit-04/moneyball/blob/main/benchmarks/quant_results.json',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/moneyball',
    },
    demoType: 'hmm-risk',
    lensRank: { aiml: 4, ds: 1, fintech: 2, sde: 6 },
  },
  {
    id: 'warehouse-routing-engine',
    title: 'Real-Time Warehouse Routing Engine',
    tagline: 'C++17 Native Pathfinding & Order-Picking Optimization with O(1) Cache Invalidation',
    tier: 'A',
    tierLabel: 'RUNS IN BROWSER',
    stack: ['C++17', 'Python', 'FastAPI', 'Redis', 'pybind11', 'Docker', 'Prometheus'],
    problem:
      'Order picking in automated warehouses is an NP-hard Traveling Salesperson Problem (TSP) with dynamic aisle congestion and obstacle blockages that choke pure Python web services.',
    built: [
      'Engineered a native C++17 pathfinding engine bound to Python via pybind11, accelerating A* search across a 30,000-cell grid (3,294 nodes expanded) from 15.52 ms to 0.50 ms (31x speedup).',
      'Built a multi-threaded C++17 order-picking route optimizer (Held-Karp DP and 2-opt search), cutting 10-stop picking latency from 73.57 ms to 1.30 ms (56.5x speedup).',
      'Designed a FastAPI microservice with versioned Redis caching and O(1) invalidation, reducing median API latency by 43.8% at 144 RPS (79.7% cache hit rate; 0.0% errors).',
      'Validated exact path equality and dynamic obstacle avoidance across 20 automated test suites.',
    ],
    decisions: [
      {
        decision: 'Hybrid exact Held-Karp DP for K <= 10 and 2-opt heuristic for K > 10',
        rationale: 'Guarantees mathematically optimal order picking for typical pick batches while capping exponential runtime.',
        tradeoff: 'Heuristic routes above 10 stops may converge to local rather than global optima.',
      },
      {
        decision: 'O(1) versioned Redis namespace keying (spatial:graph_version)',
        rationale:
          'Instantaneously invalidates all cached paths upon obstacle reporting without costly SCAN or FLUSHDB commands.',
        tradeoff: 'Requires Redis memory TTL eviction to clean old version namespaces.',
      },
    ],
    limitations: [
      'Grid model treats movement on a 2D coordinate plane with Manhattan/Euclidean metrics; vertical pallet rack retrieval time is modeled as fixed picking dwell duration.',
      'C++ native acceleration is CPU-bound and compiled with pybind11 bindings.',
    ],
    metrics: [
      {
        label: 'A* Pathfinding Speedup (30k-node grid)',
        value: '15.52 ms -> 0.50 ms (31x speedup)',
        benchmarkContext: '3,294 nodes expanded, native C++17 kernel vs Python',
        sourceUrl:
          'https://github.com/Amrit-04/Real-Time-Indoor-Navigation-Engine/blob/main/benchmarks/cpp_benchmark_results.json',
      },
      {
        label: 'Held-Karp TSP 10-Stop Order Picking',
        value: '73.57 ms -> 1.30 ms (56.5x speedup)',
        benchmarkContext: 'Exact O(K^2 * 2^K) global minimum tour',
        sourceUrl:
          'https://github.com/Amrit-04/Real-Time-Indoor-Navigation-Engine/blob/main/benchmarks/cpp_benchmark_results.json',
      },
      {
        label: 'Microservice Median Latency Reduction',
        value: '-43.8% p50 Latency (144 RPS)',
        benchmarkContext: 'Redis versioned cache-aside under 20 concurrent workers',
        sourceUrl:
          'https://github.com/Amrit-04/Real-Time-Indoor-Navigation-Engine/blob/main/benchmarks/results.json',
      },
      {
        label: 'Cache Hit & Connection Error Rate',
        value: '79.7% hit rate / 0.0% error rate',
        benchmarkContext: '1,000 queries Pareto-Zipfian distribution',
        sourceUrl:
          'https://github.com/Amrit-04/Real-Time-Indoor-Navigation-Engine/blob/main/benchmarks/results.json',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/Real-Time-Indoor-Navigation-Engine',
    },
    demoType: 'spatial-wasm',
    lensRank: { aiml: 6, ds: 6, fintech: 3, sde: 3 },
  },
  {
    id: 'workplace-safety-vision',
    title: 'Workplace Safety Computer Vision Framework',
    tagline: 'Real-Time PPE Detection & Hazardous Zone Intrusion Tracking (IEEE RMKMATE 2026)',
    tier: 'C',
    tierLabel: 'CASE STUDY',
    stack: ['Python', 'PyTorch', 'YOLO', 'OpenCV', 'Flask', 'Multithreading', 'Edge Computing'],
    problem:
      'Industrial manufacturing facilities face severe occupational safety hazards when personnel operate without mandatory PPE or inadvertently enter active machinery operational perimeters.',
    built: [
      'Published in IEEE RMKMATE 2026 (IEEE Xplore: 11518869) establishing an industrial safety framework.',
      'Architected a decoupled dual-model YOLO architecture (fine-tuned PPE detection + person detection) running asynchronously via multi-threaded worker pools with non-blocking queues.',
      'Engineered interactive HTML5 canvas geofencing for drawing and persisting arbitrary boundary polygons (zones.json).',
      'Developed temporal centroid tracking (SimpleTracker) and multi-point ground-plane probing to eliminate false intrusion alarms.',
    ],
    decisions: [
      {
        decision: 'Multi-point anatomical probing: foot contact (cx, y2) and centroid',
        rationale:
          'Prevents false alarms caused by tall bounding boxes extending outside danger perimeters when feet are safe.',
        tradeoff: 'Requires calibrated camera angle with clear ground plane visibility.',
      },
      {
        decision: 'Asynchronous dual-worker pipeline with Queue(maxsize=1)',
        rationale: 'Prevents slow inference loops from dropping video frames or blocking live MJPEG streaming.',
        tradeoff: 'Drops intermediate frames if inference hardware is saturated.',
      },
    ],
    limitations: [
      'Detection fidelity is subject to camera occlusions, severe lens flare, and poor industrial illumination.',
      'Deployment is engineered for edge workstations with local webcam or RTSP camera streams.',
    ],
    metrics: [
      {
        label: 'Peer-Reviewed Research Publication',
        value: 'IEEE RMKMATE 2026 (IEEE Xplore 11518869)',
        benchmarkContext: 'Conference publication & citation',
        sourceUrl: 'https://ieeexplore.ieee.org/document/11518869',
      },
      {
        label: 'Multi-Class Detection Classes',
        value: '10 classes (Hardhat, Mask, Vest, Violations)',
        benchmarkContext: 'Custom fine-tuned YOLO weights (best.pt)',
        sourceUrl: 'https://github.com/Amrit-04/workplace-safety-vision/blob/main/README.md',
      },
      {
        label: 'Intrusion Alert Cooldown Throttling',
        value: '2.0s minimum interval',
        benchmarkContext: 'Prevents alert flood during persistent violations',
        sourceUrl: 'https://github.com/Amrit-04/workplace-safety-vision/blob/main/app.py',
      },
    ],
    links: {
      repo: 'https://github.com/Amrit-04/workplace-safety-vision',
      paper: 'https://ieeexplore.ieee.org/document/11518869',
    },
    demoType: 'case-study',
    lensRank: { aiml: 7, ds: 7, fintech: 6, sde: 7 },
  },
];

export function getProjectById(id: string): ProjectDefinition | null {
  return PROJECTS.find((p) => p.id === id) ?? null;
}
