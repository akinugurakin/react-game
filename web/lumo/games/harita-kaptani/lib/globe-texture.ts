/**
 * Prosedürel dünya texture'ı — Natural Earth verisinden Canvas 2D.
 * Site brand renk paleti.
 */

import {
  AFRIKA, AVRUPA, ASYA, KUZEYAMERIKA,
  GUNEYAMERIKA, OKYANUSYA, ANTARKTIKA,
} from "./continents";

function toXY(lat: number, lng: number, w: number, h: number): [number, number] {
  return [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];
}

type Poly = Array<[number, number]>;

// Site brand renkleri
const CONTINENT_STYLES: Array<{ polys: Poly[]; fill: string; stroke: string }> = [
  { polys: AFRIKA, fill: "#D6D58E", stroke: "#a8a85e" },         // brand-sand
  { polys: AVRUPA, fill: "#005C53", stroke: "#003e39" },         // brand-teal
  { polys: ASYA, fill: "#DBF227", stroke: "#8aad2a" },           // brand-lime
  { polys: KUZEYAMERIKA, fill: "#1aa295", stroke: "#005C53" },   // brand-teal-400
  { polys: GUNEYAMERIKA, fill: "#9FC131", stroke: "#6e8a22" },   // brand-green
  { polys: OKYANUSYA, fill: "#53671a", stroke: "#374411" },      // brand-green-700
  { polys: ANTARKTIKA, fill: "#e6f5f3", stroke: "#b3e0db" },     // brand-teal-50
];

function drawPoly(ctx: CanvasRenderingContext2D, poly: Poly, w: number, h: number) {
  if (poly.length < 3) return;
  ctx.beginPath();
  const [sx, sy] = toXY(poly[0][0], poly[0][1], w, h);
  ctx.moveTo(sx, sy);
  for (let i = 1; i < poly.length; i++) {
    const [px, py] = toXY(poly[i][0], poly[i][1], w, h);
    ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export function createGlobeTexture(width = 2048, height = 1024): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Okyanus gradient — brand teal tones
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#b3e0db");
  grad.addColorStop(0.25, "#80ccc4");
  grad.addColorStop(0.5, "#4db7ac");
  grad.addColorStop(0.75, "#80ccc4");
  grad.addColorStop(1, "#b3e0db");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Kıtalar
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (const style of CONTINENT_STYLES) {
    for (const poly of style.polys) {
      drawPoly(ctx, poly, width, height);
      ctx.fillStyle = style.fill;
      ctx.fill();
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Ekvator
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.strokeStyle = "rgba(230,57,70,0.4)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Başlangıç meridyeni
  const [pmX] = toXY(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(pmX, 0);
  ctx.lineTo(pmX, height);
  ctx.strokeStyle = "rgba(4,41,64,0.3)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.stroke();
  ctx.setLineDash([]);

  return canvas;
}
