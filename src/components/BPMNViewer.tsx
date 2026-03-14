import { useEffect, useRef, useState, useCallback } from 'react';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import reliefBpmnXml from './bpmn/relief-process.bpmn?raw';

type ViewerInstance = InstanceType<typeof NavigatedViewer>;

export function BPMNProcessViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ViewerInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fitToViewport = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const canvas = viewer.get('canvas') as { zoom: (mode: string, center?: string) => void };
    canvas.zoom('fit-viewport', 'auto');
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new NavigatedViewer({
      container: containerRef.current,
    });
    viewerRef.current = viewer;

    viewer.importXML(reliefBpmnXml).then(() => {
      fitToViewport();
      setLoaded(true);
    }).catch((err: Error) => {
      setError(err.message);
    });

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [fitToViewport]);

  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => fitToViewport();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, fitToViewport]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-6 text-red-300">
        <p className="font-semibold">BPMN-Viewer Fehler</p>
        <p className="text-sm mt-1 opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
        <span className="text-xs font-medium text-white/70">BPMN 2.0</span>
        <span className="text-xs text-white/40">|</span>
        <span className="text-xs text-white/50">Scrollen zum Zoomen · Ziehen zum Bewegen</span>
      </div>
      <div
        ref={containerRef}
        className="bpmn-viewer-container w-full"
        style={{ height: 600 }}
      />
      <style>{`
        .bpmn-viewer-container .djs-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%) !important;
        }
        .bpmn-viewer-container .djs-shape .djs-visual > rect {
          fill: #1e293b !important;
          stroke: #60a5fa !important;
          stroke-width: 1.5px !important;
          rx: 8 !important;
          ry: 8 !important;
        }
        .bpmn-viewer-container .djs-shape .djs-visual > text {
          fill: #e2e8f0 !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 11px !important;
        }
        .bpmn-viewer-container .djs-connection .djs-visual > path {
          stroke: #94a3b8 !important;
          stroke-width: 1.5px !important;
        }
        .bpmn-viewer-container .djs-connection .djs-visual > path[marker-end] {
          stroke: #94a3b8 !important;
        }
        .bpmn-viewer-container marker path {
          fill: #94a3b8 !important;
          stroke: #94a3b8 !important;
        }
        /* Participant / Pool bands */
        .bpmn-viewer-container .djs-shape[data-element-id^="Lane_"] .djs-visual > rect,
        .bpmn-viewer-container .djs-shape[data-element-id^="Shape_Lane"] .djs-visual > rect {
          fill: #0f172a !important;
          stroke: #3b82f6 !important;
          stroke-width: 2px !important;
          rx: 0 !important;
          ry: 0 !important;
        }
        /* Participant label */
        .bpmn-viewer-container .djs-shape[data-element-id^="Lane_"] .djs-visual > text {
          fill: #60a5fa !important;
          font-weight: 600 !important;
          font-size: 13px !important;
        }
        /* Gateway diamonds */
        .bpmn-viewer-container .djs-shape .djs-visual > polygon {
          fill: #1e1b4b !important;
          stroke: #818cf8 !important;
          stroke-width: 2px !important;
        }
        /* Events (circles) */
        .bpmn-viewer-container .djs-shape .djs-visual > circle {
          fill: #1e293b !important;
          stroke: #10b981 !important;
          stroke-width: 2px !important;
        }
        /* End events — thicker border */
        .bpmn-viewer-container .djs-shape[data-element-id^="End_"] .djs-visual > circle {
          stroke: #ef4444 !important;
          stroke-width: 3px !important;
        }
        /* Message flows (dashed) */
        .bpmn-viewer-container .djs-connection[data-element-id^="MF_"] .djs-visual > path {
          stroke: #f59e0b !important;
          stroke-dasharray: 8, 5 !important;
          stroke-width: 1.5px !important;
        }
        .bpmn-viewer-container .djs-connection[data-element-id^="MF_"] marker path {
          fill: #f59e0b !important;
          stroke: #f59e0b !important;
        }
        /* Labels on flows */
        .bpmn-viewer-container .djs-label .djs-visual > text {
          fill: #cbd5e1 !important;
          font-size: 11px !important;
        }
        /* Hover effect */
        .bpmn-viewer-container .djs-shape:hover .djs-visual > rect {
          stroke: #38bdf8 !important;
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.3));
        }
        .bpmn-viewer-container .djs-shape .djs-visual > path {
          fill: #e2e8f0 !important;
        }
      `}</style>
    </div>
  );
}
