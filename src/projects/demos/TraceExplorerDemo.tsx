import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../../lib/assets';
import { ShieldAlert, Search } from 'lucide-react';

interface Span {
  span_id: string;
  name: string;
  start_ms: number;
  duration_ms: number;
  attributes: Record<string, any>;
}
interface Trace {
  trace_id: string;
  name: string;
  status: string;
  wall_clock_duration_ms: number;
  cache_hit: boolean;
  retrieval: boolean;
  spans: Span[];
}

const SPAN_COLOR = (name: string) =>
  name.includes('redis') ? '#18528C' : name.includes('chromadb') ? '#D9381E' : name.includes('ollama') ? '#33312E' : '#8A8680';

export default function TraceExplorerDemo() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [selectedTraceId, setSelectedTraceId] = useState<string>('');
  const [filter, setFilter] = useState<'ALL' | 'HITS' | 'RETRIEVAL' | 'CIRCUIT_OPEN'>('ALL');
  const [query, setQuery] = useState('');
  const [openSpan, setOpenSpan] = useState<string | null>(null);

  useEffect(() => {
    fetch(getAssetUrl('data/sample_traces.json'))
      .then((r) => r.json())
      .then((data: Trace[]) => {
        setTraces(data);
        if (data.length) setSelectedTraceId(data[0].trace_id);
      })
      .catch(console.error);
  }, []);

  const filtered = traces.filter((t) => {
    if (filter === 'HITS') return t.cache_hit;
    if (filter === 'RETRIEVAL') return t.retrieval;
    if (filter === 'CIRCUIT_OPEN') return t.status === 'CIRCUIT_OPEN';
    return true;
  }).filter((t) => !query || (t.name + t.trace_id).toLowerCase().includes(query.toLowerCase()));

  const active = traces.find((t) => t.trace_id === selectedTraceId) ?? filtered[0] ?? traces[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Recorded OTLP sample traces — explore the waterfall</p>
          <p className="text-sm text-ink2 mt-1">C++ gateway → WAL → Parquet · Redis semantic cache · circuit-breaker fallbacks</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-ink3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search name / trace id…"
            className="input-frame !pl-8 !py-1.5 !text-xs w-52"
            data-testid="lrcp-search"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ['ALL', 'All spans'],
            ['HITS', 'Redis cache hits'],
            ['RETRIEVAL', 'ChromaDB retrievals'],
            ['CIRCUIT_OPEN', 'Circuit-breaker events'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] px-3 py-1.5 transition-transform duration-150 hover:-translate-y-0.5 ${
              filter === key ? 'border-red text-red bg-paper2 shadow-hard-sm' : 'border-ink/40 text-ink2 hover:border-ink'
            }`}
            data-testid={`lrcp-filter-${key}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-5">
        <div className="space-y-2">
          <p className="label-mono text-ink3">Traces ({filtered.length})</p>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filtered.map((t) => (
              <button
                key={t.trace_id}
                onClick={() => setSelectedTraceId(t.trace_id)}
                className={`w-full text-left px-3 py-2.5 border-[1.5px] transition-transform duration-150 hover:-translate-y-0.5 ${
                  t.trace_id === active?.trace_id ? 'border-ink bg-paper2 shadow-hard-sm' : 'border-ink/40 bg-paper hover:border-ink'
                }`}
                data-testid={`lrcp-trace-${t.trace_id}`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-mono text-xs font-bold truncate">{t.name}</span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 border ${t.status === 'OK' ? 'border-blue text-blue' : 'border-red text-red'}`}>
                    {t.status}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-ink3 mt-1 truncate">{t.trace_id.slice(0, 20)}…</p>
                <p className="font-mono text-[10px] text-ink2 mt-1">
                  {t.wall_clock_duration_ms} ms {t.cache_hit && '· cache hit'}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          {active && (
            <div className="frame-sm bg-paper p-4">
              <div className="flex justify-between items-baseline border-b-[1.5px] border-dashed border-ink/40 pb-2">
                <div>
                  <p className="font-mono text-sm font-bold">{active.name}</p>
                  <p className="font-mono text-[10px] text-ink3">trace {active.trace_id}</p>
                </div>
                <p className="font-mono font-bold">{active.wall_clock_duration_ms} ms</p>
              </div>
              <div className="mt-4 space-y-2.5" data-testid="lrcp-waterfall">
                {active.spans.map((span) => {
                  const left = (span.start_ms / active.wall_clock_duration_ms) * 100;
                  const width = Math.max(2.5, (span.duration_ms / active.wall_clock_duration_ms) * 100);
                  const isOpen = openSpan === span.span_id;
                  return (
                    <div key={span.span_id}>
                      <button
                        className="w-full text-left group"
                        onClick={() => setOpenSpan(isOpen ? null : span.span_id)}
                        data-testid={`lrcp-span-${span.name}`}
                      >
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="font-bold group-hover:text-red transition-colors">{span.name}</span>
                          <span className="text-ink3">{span.duration_ms} ms</span>
                        </div>
                        <div className="h-2.5 bg-paper2 border border-ink/30 mt-1 relative">
                          <div
                            className="absolute inset-y-0"
                            style={{ left: `${left}%`, width: `${width}%`, background: SPAN_COLOR(span.name), opacity: 0.85 }}
                          />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {Object.entries(span.attributes).map(([k, v]) => (
                            <span key={k} className="font-mono text-[10px] border border-ink/40 px-1.5 py-0.5">
                              {k}: <b>{String(v)}</b>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="frame-red bg-paper2/50 p-4 text-xs leading-relaxed text-ink2 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red shrink-0 mt-0.5" />
            <p>
              <span className="font-bold">Integrity note: </span>
              these are bundled sample traces, not a live telemetry service. The ~5 ms p99 ingest, 50k spans/sec
              compaction and &lt;100 ms p99 DuckDB query figures are informal dev measurements on a single host, and
              the RAG quality targets are unmeasured design goals — labeled as such in the notebook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
