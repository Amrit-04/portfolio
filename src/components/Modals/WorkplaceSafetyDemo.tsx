import React, { useState } from 'react';
import { ShieldCheck, BookOpen, ExternalLink, Layers, Crosshair } from 'lucide-react';

export const WorkplaceSafetyDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paper' | 'zones' | 'classes'>('paper');

  const classes = [
    { id: 0, label: 'Hardhat', type: 'Compliant', color: 'bg-emerald-500' },
    { id: 1, label: 'Mask', type: 'Compliant', color: 'bg-emerald-500' },
    { id: 2, label: 'NO-Hardhat', type: 'Violation', color: 'bg-rose-500' },
    { id: 3, label: 'NO-Mask', type: 'Violation', color: 'bg-rose-500' },
    { id: 4, label: 'NO-Safety Vest', type: 'Violation', color: 'bg-rose-500' },
    { id: 5, label: 'Person', type: 'General', color: 'bg-blue-500' },
    { id: 6, label: 'Safety Cone', type: 'Perimeter', color: 'bg-amber-500' },
    { id: 7, label: 'Safety Vest', type: 'Compliant', color: 'bg-emerald-500' },
    { id: 8, label: 'Machinery', type: 'Hazard', color: 'bg-purple-500' },
    { id: 9, label: 'Vehicle', type: 'Equipment', color: 'bg-slate-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Tier Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-900 sketch-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded">TIER C: CASE STUDY</span>
            <span className="text-xs text-slate-500">IEEE RMKMATE 2026 (IEEE Xplore: 11518869)</span>
          </div>
          <h3 className="text-lg font-bold mt-1">Workplace Safety Using Computer Vision</h3>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://ieeexplore.ieee.org/document/11518869"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded sketch-border text-xs font-bold flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View on IEEE Xplore
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2">
        {(['paper', 'zones', 'classes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs sketch-border font-mono uppercase ${
              activeTab === tab
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'bg-white dark:bg-slate-800'
            }`}
          >
            {tab === 'paper' ? 'IEEE Paper & Overview' : tab === 'zones' ? 'Geofencing Logic' : 'Detection Classes'}
          </button>
        ))}
      </div>

      {/* Tab 1: IEEE Paper Details */}
      {activeTab === 'paper' && (
        <div className="p-4 bg-white dark:bg-slate-800 sketch-border space-y-4 text-xs font-mono">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
            <div className="text-slate-500 uppercase text-[10px] font-bold">Citation & Publication</div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
              "Workplace Safety Using Computer Vision: A Framework for Personal Protective Equipment Detection and Intrusion Monitoring"
            </h4>
            <div className="text-slate-500 text-[11px] mt-1">
              Authors: Amriteshkumar Yadav, B. Hariharan, S. Prince Chelladurai, Ahaan Sekhar Das, Prajwal Sagar (IEEE RMKMATE 2026)
            </div>
          </div>

          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <p>
              • <strong>Dual-Model Decoupled YOLO:</strong> Co-authored a real-time computer vision framework separating PPE compliance detection (`best.pt` custom weights) from person detection (`yolo11n.pt`) via concurrent worker threads.
            </p>
            <p>
              • <strong>Multi-Point Ground-Plane Probing:</strong> Evaluates worker foot ground-contact `(cx, y2)` against calibrated restricted-zone boundary polygons to eliminate perspective false positives.
            </p>
            <p>
              • <strong>Streaming Telemetry & Cooldown:</strong> Integrated with Flask and OpenCV with single-frame hardware buffering (`FrameGrabber`) and 2.0s alert cooldown throttling.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Geofencing Logic */}
      {activeTab === 'zones' && (
        <div className="p-4 bg-white dark:bg-slate-800 sketch-border space-y-3">
          <h4 className="font-bold text-sm">Interactive Restricted-Zone Canvas Architecture</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Supervisors calibrate arbitrary polygon boundaries directly over the live stream via an interactive HTML5 canvas. Coordinates are normalized `[0.0 - 1.0]` to support dynamic resolution scaling across mobile, web, and edge displays.
          </p>
          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded space-y-1">
            <div>// Anatomical ground contact probe in OpenCV / NumPy</div>
            <div>foot_pt = (int(box.cx * width), int(box.y2 * height))</div>
            <div>inside = cv2.pointPolygonTest(zone_polygon, foot_pt, False) &gt;= 0</div>
            <div>if inside: trigger_throttled_alarm(person_id, cooldown_sec=2.0)</div>
          </div>
        </div>
      )}

      {/* Tab 3: Detection Classes */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {classes.map(c => (
            <div key={c.id} className="p-3 bg-white dark:bg-slate-800 sketch-border space-y-1 text-center">
              <span className={`w-3 h-3 rounded-full mx-auto block ${c.color}`} />
              <div className="font-bold text-xs font-mono">{c.label}</div>
              <div className="text-[10px] text-slate-500 uppercase">{c.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
