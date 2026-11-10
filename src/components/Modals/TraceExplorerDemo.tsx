import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Clock, Database, Layers } from 'lucide-react';

export const TraceExplorerDemo: React.FC = () => {
  const [traces, setTraces] = useState<any[]>([]);
  const [selectedTraceId, setSelectedTraceId] = useState<string>('');
  const [filter, setFilter] = useState<'ALL' | 'HITS' | 'MISSES' | 'CIRCUIT_OPEN'>('ALL');

  useEffect(() => {
    fetch('/data/sample_traces.json')
      .then(res => res.json())
      .then(data => {
        setTraces(data);
        if (data.length > 0) {
          setSelectedTraceId(data[0].trace_id);
        }
      })
      .catch(console.error);
  }, []);

  const filteredTraces = traces.filter(t => {
    if (filter === 'HITS') return t.cache_hit;
    if (filter === 'MISSES') return !t.cache_hit && t.status !== 'CIRCUIT_OPEN';
    if (filter === 'CIRCUIT_OPEN') return t.status === 'CIRCUIT_OPEN';
    return true;
  });

  const activeTrace = traces.find(t => t.trace_id === selectedTraceId) || traces[0];

  return (
    <div className="space-y-6">
      {/* Tier Badge & Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-900 sketch-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500 text-white rounded">TIER A: RUNS IN BROWSER</span>
            <span className="text-xs text-slate-500">Live OTLP Waterfall & Tree Explorer</span>
          </div>
          <h3 className="text-lg font-bold mt-1">OpenTelemetry Trace Analytics & Guardrail Interventions</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 text-xs sketch-border ${filter === 'ALL' ? 'bg-black text-white dark:bg-white dark:text-black font-bold' : 'bg-white dark:bg-slate-800'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('HITS')}
            className={`px-2.5 py-1 text-xs sketch-border ${filter === 'HITS' ? 'bg-emerald-600 text-white font-bold' : 'bg-white dark:bg-slate-800'}`}
          >
            Redis Cache Hits
          </button>
          <button
            onClick={() => setFilter('MISSES')}
            className={`px-2.5 py-1 text-xs sketch-border ${filter === 'MISSES' ? 'bg-blue-600 text-white font-bold' : 'bg-white dark:bg-slate-800'}`}
          >
            ChromaDB Retrievals
          </button>
          <button
            onClick={() => setFilter('CIRCUIT_OPEN')}
            className={`px-2.5 py-1 text-xs sketch-border ${filter === 'CIRCUIT_OPEN' ? 'bg-rose-600 text-white font-bold' : 'bg-white dark:bg-slate-800'}`}
          >
            Circuit-Breaker Interventions
          </button>
        </div>
      </div>

      {/* Main Trace Split View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trace List */}
        <div className="md:col-span-1 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Traces ({filteredTraces.length})</div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredTraces.map(t => (
              <button
                key={t.trace_id}
                onClick={() => setSelectedTraceId(t.trace_id)}
                className={`w-full text-left p-3 text-xs sketch-border transition-all ${
                  t.trace_id === selectedTraceId
                    ? 'bg-slate-200 dark:bg-slate-800 border-black dark:border-white'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{t.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    t.status === 'OK' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 truncate">
                  {t.trace_id.slice(0, 16)}...
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2">
                  <span>Duration: {t.wall_clock_duration_ms} ms</span>
                  {t.cache_hit && <span className="text-emerald-600 font-bold">Cache Hit (0.90+)</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trace Waterfall & Span Details */}
        <div className="md:col-span-2 space-y-4">
          {activeTrace && (
            <div className="p-4 bg-white dark:bg-slate-900 sketch-border space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                <div>
                  <h4 className="font-bold text-sm">{activeTrace.name}</h4>
                  <span className="text-[11px] font-mono text-slate-400">Trace ID: {activeTrace.trace_id}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
                    {activeTrace.wall_clock_duration_ms} ms
                  </span>
                  <div className="text-[10px] text-slate-500">Wall-Clock Duration</div>
                </div>
              </div>

              {/* Waterfall Spans */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-500">Span Hierarchy & Latency Waterfall:</span>
                <div className="space-y-2">
                  {activeTrace.spans.map((span: any) => {
                    const totalDuration = activeTrace.wall_clock_duration_ms;
                    const leftPercent = (span.start_ms / totalDuration) * 100;
                    const widthPercent = Math.max(2, (span.duration_ms / totalDuration) * 100);

                    return (
                      <div key={span.span_id} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 sketch-border text-xs space-y-1.5">
                        <div className="flex justify-between items-center font-mono">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{span.name}</span>
                          <span className="text-slate-500 text-[11px]">{span.duration_ms} ms</span>
                        </div>

                        {/* Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden relative">
                          <div
                            className={`h-full rounded-full ${
                              span.name.includes('redis')
                                ? 'bg-emerald-500'
                                : span.name.includes('chromadb')
                                ? 'bg-blue-500'
                                : span.name.includes('ollama')
                                ? 'bg-purple-500'
                                : span.name.includes('circuit')
                                ? 'bg-rose-500'
                                : 'bg-slate-500'
                            }`}
                            style={{
                              marginLeft: `${leftPercent}%`,
                              width: `${widthPercent}%`
                            }}
                          />
                        </div>

                        {/* Attributes */}
                        <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] font-mono">
                          {Object.entries(span.attributes).map(([k, v]: any) => (
                            <span key={k} className="px-1.5 py-0.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                              {k}: <strong className="text-slate-900 dark:text-slate-100">{String(v)}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Architecture & Verification Alert */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs sketch-border space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Engineering & Benchmark Integrity Note:</span>
            </div>
            <p>
              • Ingestion latency (~5 ms p99), compaction (~50k spans/sec), and DuckDB query latency (&lt;100 ms p99) are <strong>informal measurements</strong> recorded on developer hardware (Intel i7, 32GB RAM).
              <br />
              • RAG evaluation targets (faithfulness, context precision) are unmeasured design goals and are labeled as such without synthetic numbers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
