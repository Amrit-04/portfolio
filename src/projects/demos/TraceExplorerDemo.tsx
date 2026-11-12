import React, { useState, useEffect, useMemo } from 'react';
import { getAssetUrl } from '../../lib/assets';
import { ShieldAlert, Search, AlertTriangle, Layers } from 'lucide-react';

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
  name.includes('redis')
    ? '#18528C'
    : name.includes('chromadb')
    ? '#D9381E'
    : name.includes('ollama')
    ? '#33312E'
    : '#8A8680';

export default function TraceExplorerDemo() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [selectedTraceId, setSelectedTraceId] = useState<string>('');
  const [filter, setFilter] = useState<'ALL' | 'HITS' | 'RETRIEVAL' | 'CIRCUIT_OPEN'>('ALL');
  const [query, setQuery] = useState('');
  const [openSpan, setOpenSpan] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getAssetUrl('data/sample_traces.json'))
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        return r.json();
      })
      .then((data: Trace[]) => {
        setTraces(data);
        if (data.length) setSelectedTraceId(data[0].trace_id);
      })
      .catch((err) => setLoadError(`Failed to load trace samples: ${err.message}`));
  }, []);

  const filtered = useMemo(() => {
    return traces
      .filter((t) => {
        if (filter === 'HITS') return t.cache_hit;
        if (filter === 'RETRIEVAL') return t.retrieval;
        if (filter === 'CIRCUIT_OPEN') return t.status === 'CIRCUIT_OPEN';
        return true;
      })
      .filter((t) => !query || (t.name + t.trace_id).toLowerCase().includes(query.toLowerCase()));
  }, [traces, filter, query]);

  // Keep selectedTraceId synchronized with filtered items
  useEffect(() => {
    if (filtered.length > 0) {
      const exists = filtered.some((t) => t.trace_id === selectedTraceId);
      if (!exists) {
        setSelectedTraceId(filtered[0].trace_id);
      }
    } else {
      setSelectedTraceId('');
    }
  }, [filtered, selectedTraceId]);

  const active = useMemo(() => {
    return filtered.find((t) => t.trace_id === selectedTraceId) || (filtered.length > 0 ? filtered[0] : null);
  }, [filtered, selectedTraceId]);

  if (loadError) {
    return (
      <div className="frame-sm bg-paper2/60 border-red text-red p-4 font-mono text-xs flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>{loadError}</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Recorded OTLP Trace Waterfall &amp; Distributed Spans</p>
          <p className="text-sm text-ink2 mt-1">
            C++ Gateway → WAL → Parquet · Redis semantic cache hits · Circuit breaker fallback traces
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-ink3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trace name or ID…"
            className="input-frame !pl-8 !py-1.5 !text-xs w-56"
            data-testid="lrcp-search"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ['ALL', 'All Spans'],
            ['HITS', 'Redis Cache Hits'],
            ['RETRIEVAL', 'ChromaDB Retrievals'],
            ['CIRCUIT_OPEN', 'Circuit-Breaker Events'],
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

      <div className="grid md:grid-cols-[260px_1fr] gap-5">
        {/* Trace List */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="label-mono text-ink3">Traces ({filtered.length})</p>
            {query && (
              <button onClick={() => setQuery('')} className="font-mono text-[10px] text-ink3 underline">
                Clear search
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="frame-sm bg-paper2/50 p-6 text-center space-y-2 border-dashed">
              <Layers className="w-6 h-6 text-ink3 mx-auto" />
              <p className="font-mono text-xs text-ink2">No traces match this filter.</p>
              <button
                onClick={() => {
                  setFilter('ALL');
                  setQuery('');
                }}
                className="btn-outline !py-1 !px-2 text-xs"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {filtered.map((t) => (
                <button
                  key={t.trace_id}
                  onClick={() => setSelectedTraceId(t.trace_id)}
                  className={`w-full text-left px-3 py-2.5 border-[1.5px] transition-transform duration-150 hover:-translate-y-0.5 rounded-xs ${
                    t.trace_id === active?.trace_id ? 'border-ink bg-paper2 shadow-hard-sm' : 'border-ink/40 bg-paper hover:border-ink'
                  }`}
                  data-testid={`lrcp-trace-${t.trace_id}`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-mono text-xs font-bold truncate">{t.name}</span>
                    <span
                      className={`font-mono text-[9px] px-1.5 py-0.5 border rounded-xs ${
                        t.status === 'OK' ? 'border-blue text-blue' : 'border-red text-red'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-ink3 mt-1 truncate">ID: {t.trace_id}</p>
                  <p className="font-mono text-[10px] text-ink2 mt-1">
                    {t.wall_clock_duration_ms} ms {t.cache_hit && '· Cache Hit'}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Trace Waterfall Detail */}
        <div className="space-y-4 min-w-0">
          {active ? (
            <div className="frame-sm bg-paper p-4 shadow-hard-sm">
              <div className="flex justify-between items-baseline border-b-[1.5px] border-dashed border-ink/40 pb-3">
                <div>
                  <p className="font-mono text-sm font-bold text-ink">{active.name}</p>
                  <p className="font-mono text-[10px] text-ink3">Trace ID: {active.trace_id}</p>
                </div>
                <div className="text-right font-mono">
                  <p className="text-sm font-bold text-blue">{active.wall_clock_duration_ms} ms</p>
                  <p className="text-[10px] text-ink3">{active.spans.length} recorded spans</p>
                </div>
              </div>

              {/* Waterfall Bars */}
              <div className="mt-4 space-y-3" data-testid="lrcp-waterfall">
                {active.spans.map((span) => {
                  const left = (span.start_ms / Math.max(1, active.wall_clock_duration_ms)) * 100;
                  const width = Math.max(2.5, (span.duration_ms / Math.max(1, active.wall_clock_duration_ms)) * 100);
                  const isOpen = openSpan === span.span_id;

                  return (
                    <div key={span.span_id}>
                      <button
                        className="w-full text-left group cursor-pointer"
                        onClick={() => setOpenSpan(isOpen ? null : span.span_id)}
                        data-testid={`lrcp-span-${span.name}`}
                      >
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="font-bold group-hover:text-red transition-colors text-ink">
                            {span.name}
                          </span>
                          <span className="text-ink3">{span.duration_ms} ms</span>
                        </div>
                        <div className="h-2.5 bg-paper2 border border-ink/30 mt-1 relative rounded-xs overflow-hidden">
                          <div
                            className="absolute inset-y-0"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              background: SPAN_COLOR(span.name),
                              opacity: 0.85,
                            }}
                          />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="mt-2 p-2.5 bg-paper2/60 border border-ink/30 rounded-xs flex flex-wrap gap-1.5 font-mono text-[10px]">
                          {Object.entries(span.attributes).map(([k, v]) => (
                            <span key={k} className="border border-ink/30 px-2 py-0.5 bg-paper rounded-xs">
                              {k}: <b className="text-ink">{String(v)}</b>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="frame-sm bg-paper p-8 text-center text-ink3 font-mono text-xs">
              Select a trace on the left to inspect its waterfall and span attributes.
            </div>
          )}

          <div className="frame-red bg-paper2/50 p-4 text-xs leading-relaxed text-ink2 flex items-start gap-2 shadow-hard-sm">
            <ShieldAlert className="w-4 h-4 text-red shrink-0 mt-0.5" />
            <p>
              <span className="font-bold">Recorded sample data: </span>
              These are verified sample OTLP traces bundled from the repository test suite. The ~5 ms p99 ingestion,
              50k spans/sec compaction and &lt;100 ms DuckDB analytical query latencies are informal dev measurements
              on a single host, labeled as such in the notebook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
