"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import { nagai, sceneCrop, type NagaiScene } from "@/lib/nagai";

type Tone = {
  night: boolean;
  sky0: string;
  sky1: string;
  sky2: string;
  sky3: string;
  sky4: string;
  sky5: string;
  star: string;
  bloom: string;
  bloomFade: string;
  sea0: string;
  sea1: string;
  sea2: string;
  water0: string;
  water1: string;
  water2: string;
  glass0: string;
  glass1: string;
  glass2: string;
  city: string;
  cityFar: string;
  horizon: string;
};

const dayTone: Tone = {
  night: false,
  sky0: "#163E86",
  sky1: "#2B6FBC",
  sky2: "#5AA4D6",
  sky3: "#B7D6EA",
  sky4: "#F2C4B0",
  sky5: "#E8B89A",
  star: "#FFF6EA",
  bloom: "#FFF3E4",
  bloomFade: "#F2C4B0",
  sea0: "#4E9CC0",
  sea1: nagai.pool,
  sea2: nagai.poolDeep,
  water0: "#46D0DC",
  water1: nagai.pool,
  water2: "#0F7484",
  glass0: "#D7F0F6",
  glass1: nagai.glass,
  glass2: "#3A88B0",
  city: nagai.cobalt,
  cityFar: "#2A5A9A",
  horizon: "#F0D0BC",
};

const nightTone: Tone = {
  night: true,
  sky0: "#070C16",
  sky1: "#101A30",
  sky2: "#1A335C",
  sky3: "#2A4A78",
  sky4: "#3A5A82",
  sky5: "#4A688C",
  star: nagai.coral,
  bloom: nagai.coral,
  bloomFade: "#F0A094",
  sea0: "#1A5060",
  sea1: "#146070",
  sea2: "#0E4A58",
  water0: "#1C7A88",
  water1: "#15707E",
  water2: "#0D5560",
  glass0: "#F6C2A4",
  glass1: "#E89A78",
  glass2: "#C46A52",
  city: "#0E2248",
  cityFar: "#163056",
  horizon: "#6A88A8",
};

function gid(raw: string, name: string) {
  return `${raw}-${name}`;
}

/** Serrated palm frond — a filled feather, not a stroke with dots. */
function featherPath(length: number, droop = 14) {
  const n = 11;
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = length * t;
    const y = droop * t * t;
    const spread = (1 - t * 0.86) * (i % 2 === 0 ? 31 : 22) + 3;
    const tip = x - length * 0.032;
    top.push(`${tip.toFixed(1)},${(y - spread).toFixed(1)}`, `${x.toFixed(1)},${(y - spread * 0.12).toFixed(1)}`);
    bot.unshift(`${x.toFixed(1)},${(y + spread * 0.14).toFixed(1)}`, `${tip.toFixed(1)},${(y + spread * 0.92).toFixed(1)}`);
  }
  return `M 0,0 L ${top.join(" L ")} L ${length.toFixed(1)},${(droop + 6).toFixed(1)} L ${bot.join(" L ")} Z`;
}

function Frond({ length = 136, droop = 16, deep = false }: { length?: number; droop?: number; deep?: boolean }) {
  return (
    <g>
      <path d={featherPath(length, droop)} fill={deep ? nagai.palmDeep : nagai.palm} />
      <path
        d={`M 0 2 C ${length * 0.35} ${droop * 0.25}, ${length * 0.7} ${droop * 0.7}, ${length} ${droop + 4}`}
        fill="none"
        stroke={nagai.palmDeep}
        strokeWidth="1.6"
        opacity="0.55"
      />
    </g>
  );
}

const PALM_FRONDS = [
  { r: -102, l: 92, d: 22 },
  { r: -78, l: 118, d: 18 },
  { r: -56, l: 138, d: 14 },
  { r: -34, l: 150, d: 10 },
  { r: -12, l: 156, d: 8 },
  { r: 10, l: 152, d: 10 },
  { r: 32, l: 140, d: 14 },
  { r: 54, l: 124, d: 18 },
  { r: 76, l: 102, d: 22 },
  { r: 96, l: 80, d: 26 },
  { r: -44, l: 88, d: 28 },
  { r: 40, l: 84, d: 30 },
  { r: -88, l: 70, d: 16 },
  { r: 68, l: 66, d: 16 },
];

function Palm({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M -8 10 C -6 -40, -4 -120, -1 -196 C 1 -196, 5 -120, 8 -40 C 9 10, 6 14, 0 14 Z" fill={nagai.palm} />
      <ellipse cx="0" cy="-42" rx="7" ry="3.2" fill={nagai.palmDeep} opacity="0.45" />
      <ellipse cx="0" cy="-88" rx="6.2" ry="2.8" fill={nagai.palmDeep} opacity="0.4" />
      <ellipse cx="0" cy="-136" rx="5.4" ry="2.4" fill={nagai.palmDeep} opacity="0.35" />
      <ellipse cx="1" cy="6" rx="11" ry="5" fill={nagai.palmDeep} />
      <g transform="translate(0 -196)">
        {PALM_FRONDS.map((f, i) => (
          <g key={`${f.r}-${i}`} transform={`rotate(${f.r})`}>
            <Frond length={f.l} droop={f.d} deep={i % 3 === 0} />
          </g>
        ))}
        <circle r="8" fill={nagai.palmDeep} />
      </g>
    </g>
  );
}

function ChromeLadder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M -16 -86 C -22 -94, -20 -102, -12 -100 L -8 -86 Z" fill={nagai.chrome} />
      <path d="M 24 -86 C 30 -94, 28 -102, 20 -100 L 16 -86 Z" fill={nagai.chrome} />
      <rect x="-13" y="-88" width="5" height="96" rx="1.6" fill={nagai.chrome} />
      <rect x="16" y="-88" width="5" height="96" rx="1.6" fill="#A8B8C4" />
      <rect x="-13" y="-88" width="1.8" height="96" fill={nagai.chromeHi} opacity="0.85" />
      <rect x="16" y="-88" width="1.4" height="96" fill={nagai.chromeHi} opacity="0.4" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="-13" y={-76 + i * 15} width="34" height="3.2" rx="1.2" fill="#E4EEF4" />
          <rect x="-13" y={-76 + i * 15} width="34" height="1" fill={nagai.chromeHi} opacity="0.7" />
        </g>
      ))}
      <rect x="-22" y="6" width="52" height="5" rx="1.2" fill="#B7C6D0" />
      <rect x="-22" y="6" width="52" height="1.4" fill={nagai.chromeHi} opacity="0.5" />
    </g>
  );
}

function DivingBoard() {
  return (
    <g>
      <polygon points="508,628 686,628 702,618 524,618" fill="#E8EEF2" />
      <polygon points="524,618 702,618 718,604 548,604" fill={nagai.chromeHi} />
      <polygon points="686,628 718,604 718,610 686,634" fill="#B7C6D0" />
      <rect x="612" y="628" width="8" height="14" fill={nagai.chrome} />
      <rect x="640" y="628" width="8" height="14" fill="#A8B8C4" />
      <rect x="606" y="640" width="48" height="6" rx="1" fill="#C5D4E0" />
      <polygon points="548,604 718,604 728,598 560,598" fill="#D7E2EA" />
    </g>
  );
}

function Chaise() {
  return (
    <g>
      <polygon points="168,812 248,796 312,848 224,868" fill="#EDE6D4" />
      <polygon points="176,808 240,794 248,798 184,814" fill={nagai.chrome} />
      <polygon points="224,868 312,848 318,854 228,874" fill="#C9AE86" />
      <rect x="186" y="814" width="4" height="28" transform="rotate(-18 186 814)" fill={nagai.chrome} />
      <rect x="292" y="850" width="4" height="22" transform="rotate(-16 292 850)" fill="#A8B8C4" />
      <polygon points="198,820 268,806 292,836 218,852" fill="#F4EFE2" />
    </g>
  );
}

function citySilhouette(y = 508) {
  return [
    `M 0 ${y}`,
    "L 0 492 L 46 492 L 52 468 L 88 468 L 92 488",
    "L 140 488 L 148 442 L 176 438 L 188 456 L 204 456 L 210 488",
    "L 268 488 L 274 470 L 310 470 L 318 454 L 348 454 L 352 488",
    "L 410 490 L 418 460 L 456 458 L 470 476 L 498 476 L 506 490",
    "L 560 490 L 566 474 L 602 474 L 608 488",
    "L 980 490 L 988 464 L 1024 460 L 1036 478 L 1068 478 L 1074 490",
    "L 1130 488 L 1140 450 L 1176 446 L 1190 468 L 1224 468 L 1232 488",
    "L 1288 488 L 1296 472 L 1340 472 L 1348 456 L 1388 456 L 1394 488",
    "L 1450 490 L 1458 478 L 1508 478 L 1516 462 L 1560 462 L 1568 490",
    `L 1600 492 L 1600 ${y} Z`,
  ].join(" ");
}

function facadePt(u: number, v: number): [number, number] {
  const tl: [number, number] = [742, 276];
  const tr: [number, number] = [1106, 262];
  const bl: [number, number] = [742, 624];
  const br: [number, number] = [1106, 608];
  const topX = tl[0] + (tr[0] - tl[0]) * u;
  const topY = tl[1] + (tr[1] - tl[1]) * u;
  const botX = bl[0] + (br[0] - bl[0]) * u;
  const botY = bl[1] + (br[1] - bl[1]) * u;
  return [topX + (botX - topX) * v, topY + (botY - topY) * v];
}

function quad(a: [number, number], b: [number, number], c: [number, number], d: [number, number]) {
  return `${a[0]},${a[1]} ${b[0]},${b[1]} ${c[0]},${c[1]} ${d[0]},${d[1]}`;
}

function WindowPane({
  u0,
  u1,
  v0,
  v1,
  glass,
}: {
  u0: number;
  u1: number;
  v0: number;
  v1: number;
  glass: string;
}) {
  const a = facadePt(u0, v0);
  const b = facadePt(u1, v0);
  const c = facadePt(u1, v1);
  const d = facadePt(u0, v1);
  const inset = (u: number, v: number, iu: number, iv: number) => facadePt(u + iu, v + iv);
  const ia = inset(u0, v0, 0.012, 0.012);
  const ib = inset(u1, v0, -0.012, 0.012);
  const ic = inset(u1, v1, -0.012, -0.012);
  const id = inset(u0, v1, 0.012, -0.012);
  const shard = quad(inset(u0, v0, 0.02, 0.02), inset(u0, v0, 0.055, 0.02), inset(u0, v1, 0.04, -0.04), inset(u0, v1, 0.018, -0.04));
  return (
    <g>
      <polygon points={quad(a, b, c, d)} fill="#E8DCC4" />
      <polygon points={quad(ia, ib, ic, id)} fill={`url(#${glass})`} />
      <polygon points={shard} fill="#FFFFFF" opacity="0.3" />
    </g>
  );
}

export function NagaiSceneArt({ scene = "sleeve" }: { scene?: NagaiScene }) {
  const raw = `n${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const g = (name: string) => gid(raw, name);
  const tone = scene === "night" ? nightTone : dayTone;
  const glass = g("glass");

  const cols = [0.08, 0.38, 0.68];
  const colW = 0.24;

  return (
    <svg
      viewBox={sceneCrop[scene]}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={g("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone.sky0} />
          <stop offset="22%" stopColor={tone.sky1} />
          <stop offset="46%" stopColor={tone.sky2} />
          <stop offset="68%" stopColor={tone.sky3} />
          <stop offset="84%" stopColor={tone.sky4} />
          <stop offset="100%" stopColor={tone.sky5} />
        </linearGradient>
        <radialGradient id={g("sun")} cx="78%" cy="17%" r="32%">
          <stop offset="0%" stopColor={tone.bloom} />
          <stop offset="16%" stopColor={tone.night ? "#F0A094" : nagai.sun} />
          <stop offset="42%" stopColor={`${tone.bloomFade}00`} />
          <stop offset="100%" stopColor="#00000000" />
        </radialGradient>
        <radialGradient id={g("horizonBloom")} cx="55%" cy="48%" r="42%">
          <stop offset="0%" stopColor={tone.night ? "#3A5A8288" : "#F2C4B066"} />
          <stop offset="55%" stopColor={tone.night ? "#2A4A7800" : "#B7D6EA00"} />
          <stop offset="100%" stopColor="#00000000" />
        </radialGradient>
        <linearGradient id={g("haze")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone.night ? "#1A335C00" : "#B7D6EA00"} />
          <stop offset="40%" stopColor={tone.night ? "#2A4A7855" : "#F2C4B055"} />
          <stop offset="100%" stopColor={tone.night ? "#3A5A8200" : "#E8B89A00"} />
        </linearGradient>
        <linearGradient id={g("sea")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone.sea0} />
          <stop offset="50%" stopColor={tone.sea1} />
          <stop offset="100%" stopColor={tone.sea2} />
        </linearGradient>
        <linearGradient id={g("water")} x1="0.18" y1="0" x2="0.72" y2="1">
          <stop offset="0%" stopColor={tone.water0} />
          <stop offset="38%" stopColor={tone.water1} />
          <stop offset="100%" stopColor={tone.water2} />
        </linearGradient>
        <linearGradient id={g("glass")} x1="0" y1="0" x2="0.28" y2="1">
          <stop offset="0%" stopColor={tone.glass0} />
          <stop offset="40%" stopColor={tone.glass1} />
          <stop offset="100%" stopColor={tone.glass2} />
        </linearGradient>
        <linearGradient id={g("side")} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={nagai.concrete} />
          <stop offset="100%" stopColor={nagai.warm} />
        </linearGradient>
        <linearGradient id={g("deck")} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor={nagai.concrete} />
          <stop offset="100%" stopColor={nagai.plaza} />
        </linearGradient>
        <linearGradient id={g("cope")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={nagai.cope} />
          <stop offset="100%" stopColor={nagai.warm} />
        </linearGradient>
        <filter id={g("air")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <clipPath id={g("pool")}>
          <polygon points="98,928 980,928 854,648 246,648" />
        </clipPath>
        <clipPath id={g("seaClip")}>
          <rect x="0" y="500" width="1600" height="130" />
        </clipPath>
      </defs>

      <rect width="1600" height="1000" fill={`url(#${g("sky")})`} />
      <rect width="1600" height="1000" fill={`url(#${g("horizonBloom")})`} />
      <rect x="0" y="390" width="1600" height="130" fill={`url(#${g("haze")})`} />
      <g className="nagai-bloom">
        <ellipse cx="1248" cy="168" rx="220" ry="140" fill={`url(#${g("sun")})`} filter={`url(#${g("air")})`} />
        <rect width="1600" height="1000" fill={`url(#${g("sun")})`} />
      </g>
      <circle cx="1248" cy="162" r={tone.night ? 32 : 44} fill={tone.star} opacity={tone.night ? 0.96 : 0.92} />

      <rect x="0" y="508" width="1600" height="122" fill={`url(#${g("sea")})`} />
      <path d={citySilhouette(508)} fill={tone.cityFar} opacity={tone.night ? 0.55 : 0.28} />
      <g clipPath={`url(#${g("seaClip")})`} opacity={tone.night ? 0.4 : 0.32}>
        <path d={citySilhouette(512)} fill={tone.city} transform="translate(8 6)" />
      </g>
      {tone.night
        ? [
            [156, 478],
            [182, 450],
            [320, 462],
            [1008, 470],
            [1160, 456],
            [1360, 464],
            [1524, 470],
          ].map(([x, y], i) => <rect key={i} x={x} y={y} width="4" height="3" fill="#F2C4B0" opacity="0.7" />)
        : null}
      <line x1="0" y1="508" x2="1600" y2="508" stroke={tone.horizon} strokeWidth="2.2" opacity="0.55" />
      <line x1="80" y1="528" x2="420" y2="528" stroke="#DFFFFF" strokeWidth="1.2" opacity="0.18" />
      <line x1="980" y1="536" x2="1420" y2="536" stroke="#DFFFFF" strokeWidth="1" opacity="0.12" />
      <line x1="200" y1="554" x2="360" y2="554" stroke="#E8FFFF" strokeWidth="1" opacity="0.1" />
      <g transform="translate(214 524)">
        <polygon points="0,8 18,8 14,12 -2,12" fill={nagai.palmDeep} opacity="0.45" />
        <polygon points="10,8 10,-10 16,8" fill={nagai.cope} opacity="0.8" />
      </g>

      <polygon points="0,618 1600,596 1600,1000 0,1000" fill={`url(#${g("deck")})`} />
      <polygon points="0,606 1600,588 1600,598 0,620" fill={nagai.warm} />
      <polygon points="0,602 1600,584 1600,590 0,608" fill={nagai.concrete} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          x1={40 + i * 210}
          y1="1000"
          x2={520 + i * 140}
          y2="618"
          stroke="#C9AE86"
          strokeWidth="1"
          opacity="0.18"
        />
      ))}

      <g className="nagai-shade">
        <polygon points="742,624 1106,608 1276,556 420,980 -20,980" fill={nagai.shadow} opacity={tone.night ? 0.48 : 0.34} />
        <polygon points="400,624 458,624 90,980 -40,980" fill={nagai.shadow} opacity={tone.night ? 0.36 : 0.24} />
        <polygon points="488,628 536,628 220,980 140,980" fill={nagai.shadow} opacity="0.18" />
        <polygon points="1348,600 1410,600 1120,980 1020,980" fill={nagai.shadow} opacity="0.2" />
        <polygon points="168,820 250,800 200,900 110,910" fill={nagai.shadow} opacity="0.16" />
      </g>

      <polygon points="1106,262 1276,236 1276,556 1106,608" fill={`url(#${g("side")})`} />
      <polygon points="1106,418 1276,396 1276,408 1106,430" fill={nagai.warm} opacity="0.55" />
      {[0, 1, 2].map((i) => {
        const x = 1144 + i * 36;
        const y0 = 292 + i * -6;
        return (
          <g key={i}>
            <polygon
              points={`${x},${y0} ${x + 18},${y0 - 4} ${x + 18},${y0 + 78} ${x},${y0 + 84}`}
              fill="#E8DCC4"
            />
            <polygon
              points={`${x + 3},${y0 + 6} ${x + 15},${y0 + 3} ${x + 15},${y0 + 72} ${x + 3},${y0 + 76}`}
              fill={`url(#${glass})`}
            />
          </g>
        );
      })}
      <circle cx="1228" cy="478" r="22" fill="#E8DCC4" />
      <circle cx="1228" cy="478" r="16" fill={`url(#${glass})`} />
      <path d="M 1218 470 A 16 16 0 0 1 1238 470 L 1232 490 L 1220 490 Z" fill="#FFFFFF" opacity="0.22" />

      <polygon points="742,276 1106,262 1106,608 742,624" fill={nagai.cream} />
      <polygon points="742,276 1106,262 1106,278 742,292" fill="#EFE4CC" />

      {cols.map((u) => (
        <WindowPane key={`up-${u}`} u0={u} u1={u + colW} v0={0.09} v1={0.3} glass={glass} />
      ))}

      <polygon
        points={quad(facadePt(0.02, 0.36), facadePt(0.98, 0.36), facadePt(0.98, 0.52), facadePt(0.02, 0.52))}
        fill={nagai.cream}
      />
      <polygon
        points={`${facadePt(0.0, 0.5)[0]},${facadePt(0.0, 0.5)[1] + 6} ${facadePt(1, 0.5)[0]},${facadePt(1, 0.5)[1] + 4} ${facadePt(1, 0.52)[0]},${facadePt(1, 0.52)[1]} ${facadePt(0, 0.52)[0]},${facadePt(0, 0.52)[1]}`}
        fill={nagai.warm}
      />
      <line
        x1={facadePt(0.03, 0.365)[0]}
        y1={facadePt(0.03, 0.365)[1]}
        x2={facadePt(0.97, 0.365)[0]}
        y2={facadePt(0.97, 0.365)[1]}
        stroke={nagai.cope}
        strokeWidth="3"
      />
      {Array.from({ length: 21 }, (_, i) => {
        const u = 0.04 + i * 0.045;
        const a = facadePt(u, 0.368);
        const b = facadePt(u, 0.495);
        return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={nagai.cope} strokeWidth="2.1" />;
      })}
      {[0.14, 0.42, 0.7].map((u) => {
        const a = facadePt(u, 0.455);
        const b = facadePt(u + 0.16, 0.455);
        const c = facadePt(u + 0.16, 0.498);
        const d = facadePt(u, 0.498);
        const soil = facadePt(u + 0.08, 0.452);
        return (
          <g key={u}>
            <polygon points={quad(a, b, c, d)} fill={nagai.warm} />
            <ellipse cx={soil[0]} cy={soil[1] - 2} rx="18" ry="7" fill={nagai.mint} />
            <ellipse cx={soil[0] + 7} cy={soil[1] - 4} rx="10" ry="5" fill="#5FBF9A" />
          </g>
        );
      })}

      <WindowPane u0={0.1} u1={0.46} v0={0.58} v1={0.9} glass={glass} />
      <WindowPane u0={0.5} u1={0.86} v0={0.58} v1={0.9} glass={glass} />
      <polygon
        points={quad(facadePt(0.1, 0.885), facadePt(0.86, 0.885), facadePt(0.86, 0.91), facadePt(0.1, 0.91))}
        fill={nagai.warm}
      />

      <polygon points="720,258 1128,244 1304,216 888,228" fill="#F7F0E0" />
      <polygon points="720,258 1128,244 1106,262 742,276" fill={nagai.concrete} />
      <polygon points="1128,244 1304,216 1304,228 1276,236 1106,262" fill={nagai.warm} />
      <polygon points="720,258 742,276 742,286 710,268" fill={nagai.warm} />

      <polygon points="70,944 1014,944 876,632 220,632" fill={`url(#${g("cope")})`} />
      {Array.from({ length: 22 }, (_, i) => (
        <line
          key={i}
          x1={86 + i * 42}
          y1="944"
          x2={86 + i * 42}
          y2="932"
          stroke="#E8DCC4"
          strokeWidth="2"
          opacity="0.55"
        />
      ))}
      <polygon points="98,928 980,928 854,648 246,648" fill={`url(#${g("water")})`} />

      <g clipPath={`url(#${g("pool")})`}>
        <polygon points="246,648 854,648 820,700 280,700" fill={tone.water0} opacity="0.28" />
        <path
          d="M 160 720 C 300 690, 460 760, 620 730 C 760 704, 860 780, 960 810"
          fill="none"
          stroke="#EFFFFF"
          strokeWidth="9"
          opacity="0.16"
        />
        <path
          d="M 140 800 C 280 770, 430 850, 590 820 C 730 796, 840 870, 940 890"
          fill="none"
          stroke="#B7F4F4"
          strokeWidth="6"
          opacity="0.14"
        />
        <path
          d="M 200 860 C 340 840, 500 900, 680 874"
          fill="none"
          stroke="#8FEAF0"
          strokeWidth="4"
          opacity="0.18"
        />
        <polygon points="760,648 980,648 900,820 700,790" fill={nagai.cream} opacity="0.15" />
        <polygon points="788,668 860,662 848,742 792,748" fill={tone.glass1} opacity="0.22" />
        <polygon points="900,668 970,662 948,742 894,748" fill={tone.glass1} opacity="0.18" />
        <polygon points="280,648 430,648 250,840 150,820" fill={nagai.palmDeep} opacity="0.14" />
        <polygon points="188,868 318,854 292,914 170,924" fill="#F4EDE0" opacity="0.38" />
        <polygon points="214,884 300,874 286,914 208,920" fill="#E8D9B8" opacity="0.45" />
      </g>

      <polyline points="98,928 246,648 854,648 980,928" fill="none" stroke={nagai.cope} strokeWidth="3.2" opacity="0.7" />
      <polyline points="70,944 220,632 876,632 1014,944" fill="none" stroke="#EFE4CC" strokeWidth="1.6" opacity="0.4" />

      <DivingBoard />
      <g clipPath={`url(#${g("pool")})`} opacity="0.28">
        <g transform="translate(610 720) scale(1 0.32) translate(-610 -620)">
          <DivingBoard />
        </g>
      </g>

      <ChromeLadder x={768} y={872} />
      <g clipPath={`url(#${g("pool")})`} opacity="0.32">
        <g transform="translate(768 896) scale(1 0.34)">
          <ChromeLadder x={0} y={0} />
        </g>
      </g>

      <Chaise />

      <Palm x={400} y={624} scale={1.08} />
      <Palm x={494} y={630} scale={0.7} flip />
      <Palm x={1360} y={598} scale={0.9} />
      <Palm x={96} y={1008} scale={1.42} />
    </svg>
  );
}

export function NagaiSleeve() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const shift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 14]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#2B6FBC]">
      <motion.div className="absolute inset-[-3%] h-[106%] w-[106%]" style={{ y: shift }}>
        <NagaiSceneArt scene="sleeve" />
      </motion.div>
    </div>
  );
}

export function NagaiPanel({
  scene,
  className = "",
}: {
  scene: NagaiScene;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden bg-[#2B6FBC] ${className}`}>
      <NagaiSceneArt scene={scene} />
    </div>
  );
}
