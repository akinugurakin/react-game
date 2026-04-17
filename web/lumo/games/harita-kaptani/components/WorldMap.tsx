"use client";

import React, { useRef, useEffect, useCallback, useState, useMemo } from "react";
import {
  AFRIKA, AVRUPA, ASYA, KUZEYAMERIKA,
  GUNEYAMERIKA, OKYANUSYA, ANTARKTIKA,
} from "../lib/continents";

// Site brand renkleri
const CONTINENT_STYLES: Array<{
  id: string;
  name: string;
  polys: Array<[number, number]>[];
  fill: string;
  stroke: string;
}> = [
  { id: "afrika", name: "Afrika", polys: AFRIKA, fill: "#D6D58E", stroke: "#a8a85e" },
  { id: "avrupa", name: "Avrupa", polys: AVRUPA, fill: "#005C53", stroke: "#003e39" },
  { id: "asya", name: "Asya", polys: ASYA, fill: "#DBF227", stroke: "#8aad2a" },
  { id: "kuzey-amerika", name: "Kuzey Amerika", polys: KUZEYAMERIKA, fill: "#1aa295", stroke: "#005C53" },
  { id: "guney-amerika", name: "Güney Amerika", polys: GUNEYAMERIKA, fill: "#9FC131", stroke: "#6e8a22" },
  { id: "okyanusya", name: "Okyanusya", polys: OKYANUSYA, fill: "#53671a", stroke: "#374411" },
  { id: "antarktika", name: "Antarktika", polys: ANTARKTIKA, fill: "#e6f5f3", stroke: "#b3e0db" },
];

function latLngToXY(lat: number, lng: number, w: number, h: number): [number, number] {
  return [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];
}

export interface MapMarker {
  lat: number;
  lng: number;
  color: string;
  label?: string;
  pulse?: boolean;
}

export interface MapLabel {
  lat: number;
  lng: number;
  text: string;
  color: string;
}

interface WorldMapProps {
  width?: number;
  height?: number;
  onClick?: (lat: number, lng: number) => void;
  markers?: MapMarker[];
  labels?: MapLabel[];
  highlightRegions?: boolean;
  onRegionClick?: (regionId: string) => void;
  highlightedRegions?: Set<string>;
  showGrid?: boolean;
  /** Yön okları göster */
  showDirectionArrows?: boolean;
  /** Yön oku tıklandığında */
  onDirectionClick?: (dir: "kuzey" | "guney" | "dogu" | "bati") => void;
  /** Tamamlanmış yön ID'leri */
  completedDirections?: Set<string>;
}

export function WorldMap({
  width: propW,
  height: propH,
  onClick,
  markers = [],
  labels = [],
  highlightRegions,
  onRegionClick,
  highlightedRegions,
  showGrid = true,
  showDirectionArrows,
  onDirectionClick,
  completedDirections,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ w: propW ?? 900, h: propH ?? 450 });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Responsive
  useEffect(() => {
    if (propW && propH) { setDims({ w: propW, h: propH }); return; }
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const w = Math.round(width);
      setDims({ w, h: Math.round(w * 0.5) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [propW, propH]);

  // Hit test: which continent polygon contains logical (cx, cy)?
  // Uses a separate off-screen canvas at 1x to avoid HiDPI scaling issues.
  const hitCanvas = useRef<HTMLCanvasElement | null>(null);
  const hitTest = useCallback(
    (cx: number, cy: number): string | null => {
      if (!hitCanvas.current) {
        hitCanvas.current = document.createElement("canvas");
      }
      const hc = hitCanvas.current;
      hc.width = dims.w;
      hc.height = dims.h;
      const hctx = hc.getContext("2d")!;
      for (const cs of CONTINENT_STYLES) {
        for (const poly of cs.polys) {
          if (poly.length < 3) continue;
          hctx.beginPath();
          const [sx, sy] = latLngToXY(poly[0][0], poly[0][1], dims.w, dims.h);
          hctx.moveTo(sx, sy);
          for (let i = 1; i < poly.length; i++) {
            const [px, py] = latLngToXY(poly[i][0], poly[i][1], dims.w, dims.h);
            hctx.lineTo(px, py);
          }
          hctx.closePath();
          if (hctx.isPointInPath(cx, cy)) return cs.id;
        }
      }
      return null;
    },
    [dims]
  );

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const { w, h } = dims;
    canvas.width = w * 2; // HiDPI
    canvas.height = h * 2;
    ctx.scale(2, 2);

    // Ocean
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#b3e0db");
    grad.addColorStop(0.5, "#80ccc4");
    grad.addColorStop(1, "#b3e0db");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Grid
    if (showGrid) {
      ctx.strokeStyle = "rgba(4,41,64,0.08)";
      ctx.lineWidth = 0.5;
      // Parallels every 30°
      for (let lat = -60; lat <= 60; lat += 30) {
        const [, y] = latLngToXY(lat, 0, w, h);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      // Meridians every 30°
      for (let lng = -150; lng <= 150; lng += 30) {
        const [x] = latLngToXY(0, lng, w, h);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }

      // Ekvator
      const [, eqY] = latLngToXY(0, 0, w, h);
      ctx.strokeStyle = "rgba(230,57,70,0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(0, eqY); ctx.lineTo(w, eqY); ctx.stroke();

      // Başlangıç meridyeni
      const [pmX] = latLngToXY(0, 0, w, h);
      ctx.strokeStyle = "rgba(4,41,64,0.35)";
      ctx.beginPath(); ctx.moveTo(pmX, 0); ctx.lineTo(pmX, h); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Continents
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    for (const cs of CONTINENT_STYLES) {
      const isHighlighted = highlightedRegions?.has(cs.id);
      const isHovered = hoveredRegion === cs.id;
      for (const poly of cs.polys) {
        if (poly.length < 3) continue;
        ctx.beginPath();
        const [sx, sy] = latLngToXY(poly[0][0], poly[0][1], w, h);
        ctx.moveTo(sx, sy);
        for (let i = 1; i < poly.length; i++) {
          const [px, py] = latLngToXY(poly[i][0], poly[i][1], w, h);
          ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = isHighlighted
          ? cs.fill
          : highlightRegions
            ? isHovered ? cs.fill : `${cs.fill}88`
            : cs.fill;
        ctx.fill();
        ctx.strokeStyle = cs.stroke;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();
      }
    }

    // Markers
    for (const m of markers) {
      const [mx, my] = latLngToXY(m.lat, m.lng, w, h);
      ctx.beginPath();
      ctx.arc(mx, my, m.pulse ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (m.label) {
        ctx.font = "bold 10px system-ui";
        ctx.fillStyle = "#042940";
        ctx.textAlign = "center";
        ctx.fillText(m.label, mx, my - 10);
      }
    }

    // Labels
    for (const l of labels) {
      const [lx, ly] = latLngToXY(l.lat, l.lng, w, h);
      ctx.font = "bold 11px system-ui";
      const tw = ctx.measureText(l.text).width;
      ctx.fillStyle = l.color;
      const pad = 4;
      ctx.beginPath();
      ctx.roundRect(lx - tw / 2 - pad, ly - 8 - pad, tw + pad * 2, 16 + pad, 4);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(l.text, lx, ly);
    }
  }, [dims, markers, labels, hoveredRegion, highlightRegions, highlightedRegions, showGrid]);

  const handleCanvasEvent = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>, type: "click" | "move") => {
      const rect = e.currentTarget.getBoundingClientRect();
      // Map mouse → logical coords (dims.w × dims.h space)
      const cx = ((e.clientX - rect.left) / rect.width) * dims.w;
      const cy = ((e.clientY - rect.top) / rect.height) * dims.h;

      if (type === "move" && highlightRegions) {
        setHoveredRegion(hitTest(cx, cy));
        return;
      }
      if (type === "click") {
        // Region click?
        if (onRegionClick) {
          const region = hitTest(cx, cy);
          if (region) { onRegionClick(region); return; }
        }
        // Lat/Lng click
        if (onClick) {
          const lng = (cx / dims.w) * 360 - 180;
          const lat = 90 - (cy / dims.h) * 180;
          onClick(Math.round(lat), Math.round(lng));
        }
      }
    },
    [dims, onClick, onRegionClick, hitTest, highlightRegions]
  );

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          style={{ width: dims.w, height: dims.h, cursor: highlightRegions ? "pointer" : "crosshair" }}
          className="rounded-xl shadow-sm border border-[#005C53]/10"
          onClick={(e) => handleCanvasEvent(e, "click")}
          onMouseMove={(e) => handleCanvasEvent(e, "move")}
        />
        {showDirectionArrows && (
          <>
            <DirArrow pos="top-3 left-1/2 -translate-x-1/2" arrow="↑" done={completedDirections?.has("kuzey")} onClick={() => onDirectionClick?.("kuzey")} />
            <DirArrow pos="bottom-3 left-1/2 -translate-x-1/2" arrow="↓" done={completedDirections?.has("guney")} onClick={() => onDirectionClick?.("guney")} />
            <DirArrow pos="top-1/2 -translate-y-1/2 left-3" arrow="←" done={completedDirections?.has("bati")} onClick={() => onDirectionClick?.("bati")} />
            <DirArrow pos="top-1/2 -translate-y-1/2 right-3" arrow="→" done={completedDirections?.has("dogu")} onClick={() => onDirectionClick?.("dogu")} />
          </>
        )}
      </div>
    </div>
  );
}

function DirArrow({ pos, arrow, done, onClick }: {
  pos: string; arrow: string; done?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={done}
      className={[
        "absolute z-10 flex items-center justify-center rounded-full w-10 h-10 text-xl font-bold transition-all",
        pos,
        done
          ? "bg-[#9FC131] text-white shadow-md"
          : "bg-white/90 backdrop-blur-sm border-2 border-[#005C53]/20 text-[#042940] shadow-lg hover:bg-[#005C53] hover:text-white hover:border-[#005C53] active:scale-90 cursor-pointer",
      ].join(" ")}
    >
      {arrow}
    </button>
  );
}

export { CONTINENT_STYLES };
