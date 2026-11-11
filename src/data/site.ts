export const SITE = {
  name: 'Amriteshkumar Yadav',
  shortName: 'Amritesh',
  initials: 'AY',
  roles: 'AI/ML Systems · Backend Engineering · Distributed Systems · Quantitative Computing',
  education: 'B.Tech CSE (AI/ML Specialization), SRM Institute — Graduated Jul 2026',
  openTo: 'Software Engineer / AI-ML Systems Engineer — Remote · Worldwide · India',
  links: {
    github: 'https://github.com/Amrit-04',
    linkedin: 'https://www.linkedin.com/in/amriteshkumar-yadav-214594250/',
    email: 'mailto:amriteshyadav2004@gmail.com',
  },
};

export const HERO_LINES = ['I build systems', 'that survive', 'their benchmarks.'];

export const HERO_SUB =
  'I engineer high-throughput event-driven systems, learned query cost models, and quantitative research platforms — and I publish every metric with the artifact that produced it. Ride the track to find each one.';

export const ABOUT_PARAGRAPHS = [
  'I am an engineer who likes proving things. Every number on this site comes from a benchmark artifact sitting in a repository — evaluation JSONs, latency traces, chaos-run logs. If a measurement is informal, it says so. If a system missed its target, the target stays printed next to the miss.',
  'My work concentrates where ML meets hard infrastructure: graph neural networks that cost out database plans, C++ ingestion gateways holding a 5 ms p99 under WAL fsync, Go order-management state machines moving in 113 ns, and CUDA Monte Carlo engines pricing tail risk a million paths at a time.',
  'Outside the flagships, I build strange small things to understand how software works — a leaky integrate-and-fire neuron pet, a warehouse router you can poke from a browser, a telemetry replay you can scrub like film. The track above is the same instinct: systems, drawn by hand, made playable.',
];

export const ABOUT_FACTS = [
  { label: 'Degree', value: 'B.Tech CSE — AI/ML Specialization, SRM Institute' },
  { label: 'Graduated', value: 'Jul 2026' },
  { label: 'Open to roles', value: 'Software Engineer / AI-ML Systems Engineer — Remote, Worldwide, India' },
  { label: 'Publication', value: 'IEEE RMKMATE 2026 (IEEE Xplore 11518869)' },
  { label: 'Current focus', value: 'Distributed systems · learned optimization · quant computing' },
];

export const SKILL_GROUPS: { title: string; note: string; items: string[] }[] = [
  {
    title: 'Languages',
    note: 'spoken fluently',
    items: ['Python', 'C++17 / C++20', 'Go', 'TypeScript', 'SQL', 'Lua'],
  },
  {
    title: 'Data & Streaming',
    note: 'the plumbing',
    items: ['Apache Kafka', 'Redis', 'PostgreSQL 16', 'DuckDB', 'Parquet + Zstd', 'OpenTelemetry (OTLP)'],
  },
  {
    title: 'AI / ML',
    note: 'the models',
    items: ['PyTorch (CUDA)', 'GCN · GAT · GraphSAGE', 'ONNX Runtime', 'Gaussian HMM', 'XGBoost · LightGBM', 'YOLO'],
  },
  {
    title: 'Infrastructure',
    note: 'the workshop',
    items: ['Docker', 'FastAPI', 'Prometheus · Grafana', 'pybind11', 'WebAssembly / ONNX Runtime Web', 'FIX 4.2'],
  },
];

export const RESEARCH = {
  title:
    'Workplace Safety Using Computer Vision: A Framework for Personal Protective Equipment Detection and Intrusion Monitoring',
  venue: '2026 International Conference on Research Methodologies in Knowledge Management, Artificial Intelligence and Telecommunication Engineering (RMKMATE)',
  authors: 'Amriteshkumar Yadav, B. Hariharan, S. Prince Chelladurai, Ahaan Sekhar Das, Prajwal Sagar',
  doiUrl: 'https://ieeexplore.ieee.org/document/11518869',
  recordId: 'IEEE Xplore Record: 11518869',
};

export const SIDE_QUESTS = [
  {
    name: 'Fly_pet',
    note: 'A Drosophila desktop pet driven by leaky integrate-and-fire neurons — hunger, sensory input and locomotion simulated as circuits.',
    url: 'https://github.com/Amrit-04/Fly_pet',
  },
  {
    name: 'This track',
    note: 'A hand-built Verlet-physics bicycle you are welcome to crash into my benchmark checkpoints. All custom; no game engine.',
    url: '#/ride',
  },
];

export const MARQUEE_ITEMS = [
  '184 execution plans',
  '38.9% top-1 accuracy',
  '0.74 Spearman',
  '2.17x TPC-H Q10 speedup',
  '5 ms p99 ingestion',
  '50,000 spans/sec',
  '54 automated tests',
  '113 ns/op OMS transitions',
  '311 ns/op risk checks',
  '14.38 ms median e2e',
  '31x A* speedup',
  '56.5x Held-Karp speedup',
  '144 RPS served',
  '0.0359 Rank IC',
  '1.521 ICIR',
  '8.59% max drawdown',
  '1M paths / 29.26 ms CUDA',
  '7,117 events/sec sustained',
  '0 events lost',
];

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];
