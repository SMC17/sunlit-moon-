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
  side: string;
  sideDeep: string;
};

const dayTone: Tone = {
  night: false,
  sky0: "#0E3A82",
  sky1: "#1F5FA8",
  sky2: "#4A98D0",
  sky3: "#A9D2EC",
  sky4: "#F2C4B0",
  sky5: "#E8A888",
  star: "#FFF6EA",
  bloom: "#F7D8C2",
  sea0: "#3A8CB4",
  sea1: "#2498B0",
  sea2: "#147888",
  water0: "#5AD4DE",
  water1: "#2BB8C9",
  water2: "#0E6A7A",
  glass0: "#D7F0F6",
  glass1: "#6EB8D4",
  glass2: "#2A6E98",
  city: "#1A4A8C",
  cityFar: "#2A5A9A",
  horizon: "#F6C8B0",
  side: "#C4A070",
  sideDeep: "#A88858",
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
  bloom: "#F0A094",
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
  horizon: "#8AA0B8",
  side: "#8A7354",
  sideDeep: "#6E5A40",
};

/** Slim pinnate frond — fine teeth, long taper, real droop. */
function featherPath(length: number, droop = 28) {
  const n = 20;
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = length * t;
    const y = droop * t * t;
    const amp = (1 - t) * 8.5 + 1.2;
    const tooth = i % 2 === 0 ? amp : amp * 0.4;
    top.push(`${(x - 1.6).toFixed(1)},${(y - tooth).toFixed(1)}`);
    bot.unshift(`${(x - 1.6).toFixed(1)},${(y + tooth * 0.82).toFixed(1)}`);
  }
  return `M 0,0 L ${top.join(" L ")} L ${length.toFixed(1)},${(droop + 3).toFixed(1)} L ${bot.join(" L ")} Z`;
}

function Frond({ length = 150, droop = 26, deep = false }: { length?: number; droop?: number; deep?: boolean }) {
  return (
    <path
      d={featherPath(length, droop)}
      fill={deep ? nagai.palmDeep : nagai.palm}
    />
  );
}

const PALM_FRONDS = [
  { r: -118, l: 78, d: 36 },
  { r: -96, l: 118, d: 32 },
  { r: -74, l: 148, d: 28 },
  { r: -52, l: 168, d: 22 },
  { r: -30, l: 178, d: 16 },
  { r: -10, l: 184, d: 12 },
  { r: 12, l: 180, d: 16 },
  { r: 34, l: 166, d: 22 },
  { r: 56, l: 146, d: 28 },
  { r: 78, l: 120, d: 34 },
  { r: 98, l: 92, d: 40 },
  { r: 116, l: 70, d: 44 },
  { r: -64, l: 96, d: 48 },
  { r: 48, l: 90, d: 50 },
  { r: -140, l: 64, d: 20 },
  { r: 132, l: 58, d: 22 },
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
      <path d="M -7 8 C -5 -50, -3 -130, 0 -210 C 3 -130, 6 -50, 8 8 C 4 14, -4 14, -7 8 Z" fill={nagai.palm} />
      <ellipse cx="0" cy="-56" rx="6.2" ry="2.6" fill={nagai.palmDeep} opacity="0.5" />
      <ellipse cx="0" cy="-110" rx="5.4" ry="2.3" fill={nagai.palmDeep} opacity="0.45" />
      <ellipse cx="0" cy="-162" rx="4.6" ry="2" fill={nagai.palmDeep} opacity="0.4" />
      <ellipse cx="0" cy="8" rx="10" ry="4.5" fill={nagai.palmDeep} />
      <g transform="translate(0 -210)">
        {PALM_FRONDS.map((f, i) => (
          <g key={`${f.r}-${i}`} transform={`rotate(${f.r})`}>
            <Frond length={f.l} droop={f.d} deep={i % 3 === 0} />
          </g>
        ))}
        <circle r="7" fill={nagai.palmDeep} />
      </g>
    </g>
  );
}

function ChromeLadder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M -15 -90 C -22 -100, -18 -108, -10 -104 L -8 -90 Z" fill="#9AABB8" />
      <path d="M 23 -90 C 30 -100, 26 -108, 18 -104 L 16 -90 Z" fill="#7E8E9A" />
      <rect x="-12" y="-92" width="5" height="102" rx="1.4" fill="#9AABB8" />
      <rect x="15" y="-92" width="5" height="102" rx="1.4" fill="#6E7E8A" />
      <rect x="-12" y="-92" width="1.6" height="102" fill={nagai.chromeHi} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="-12" y={-78 + i * 15.5} width="32" height="3.4" rx="1" fill="#C5D0D8" />
          <rect x="-12" y={-78 + i * 15.5} width="32" height="1.1" fill={nagai.chromeHi} opacity="0.75" />
        </g>
      ))}
      <rect x="-20" y="8" width="48" height="5" rx="1" fill="#8A9AAA" />
    </g>
  );
}

function DivingBoard() {
  return (
    <g>
      <polygon points="500,622 698,622 716,608 524,608" fill="#E8EEF2" />
      <polygon points="524,608 716,608 728,600 540,600" fill={nagai.chromeHi} />
      <polygon points="698,622 728,600 728,608 698,630" fill="#6E7E8A" />
      <rect x="604" y="622" width="9" height="16" fill="#9AABB8" />
      <rect x="636" y="622" width="9" height="16" fill="#7E8E9A" />
      <rect x="598" y="636" width="54" height="6" rx="1" fill="#6E7E8A" />
    </g>
  );
}

function Chaise() {
  return (
    <g>
      <polygon points="154,818 242,800 314,856 218,878" fill="#F4EFE2" />
      <polygon points="218,878 314,856 320,864 222,886" fill="#C9AE86" />
      <path d="M 162 816 L 248 798" stroke="#9AABB8" strokeWidth="4" strokeLinecap="round" />
      <path d="M 220 878 L 312 856" stroke="#7E8E9A" strokeWidth="4" strokeLinecap="round" />
      <rect x="176" y="818" width="3.4" height="30" transform="rotate(-16 176 818)" fill="#9AABB8" />
      <rect x="292" y="856" width="3.4" height="24" transform="rotate(-14 292 856)" fill="#7E8E9A" />
    </g>
  );
}

function citySilhouette(y = 478) {
  return [
    `M 0 ${y}`,
    "L 0 464 L 48 464 L 56 438 L 92 438 L 98 460",
    "L 146 460 L 156 412 L 186 408 L 198 428 L 216 428 L 222 460",
    "L 280 460 L 288 442 L 324 442 L 334 424 L 366 424 L 372 460",
    "L 428 462 L 438 430 L 478 428 L 492 446 L 522 446 L 530 462",
    "L 980 462 L 990 434 L 1028 430 L 1042 448 L 1074 448 L 1082 462",
    "L 1140 460 L 1152 418 L 1190 414 L 1206 438 L 1240 438 L 1248 460",
    "L 1304 460 L 1314 444 L 1360 444 L 1370 426 L 1412 426 L 1420 460",
    "L 1476 462 L 1486 448 L 1536 448 L 1546 430 L 1588 430 L 1596 462",
    `L 1600 464 L 1600 ${y} Z`,
  ].join(" ");
}

function facadePt(u: number, v: number): [number, number] {
  const tl: [number, number] = [780, 268];
  const tr: [number, number] = [1124, 292];
  const bl: [number, number] = [780, 618];
  const br: [number, number] = [1124, 586];
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
  const ia = facadePt(u0 + 0.012, v0 + 0.014);
  const ib = facadePt(u1 - 0.012, v0 + 0.014);
  const ic = facadePt(u1 - 0.012, v1 - 0.014);
  const id = facadePt(u0 + 0.012, v1 - 0.014);
  const shard = quad(
    facadePt(u0 + 0.02, v0 + 0.022),
    facadePt(u0 + 0.07, v0 + 0.022),
    facadePt(u0 + 0.05, v1 - 0.05),
    facadePt(u0 + 0.02, v1 - 0.05),
  );
  return (
    <g>
      <polygon points={quad(a, b, c, d)} fill="#D8C9A8" />
      <polygon points={quad(ia, ib, ic, id)} fill={`url(#${glass})`} />
      <polygon points={shard} fill="#FFFFFF" opacity="0.38" />
    </g>
  );
}

export function NagaiSceneArt({ scene = "sleeve" }: { scene?: NagaiScene }) {
  const raw = `n${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const g = (name: string) => `${raw}-${name}`;
  const tone = scene === "night" ? nightTone : dayTone;
  const glass = g("glass");
  const cols = [0.07, 0.38, 0.69];

  return (
    <svg
      viewBox={sceneCrop[scene]}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={g("sky")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="478">
          <stop offset="0%" stopColor={tone.sky0} />
          <stop offset="18%" stopColor={tone.sky1} />
          <stop offset="42%" stopColor={tone.sky2} />
          <stop offset="64%" stopColor={tone.sky3} />
          <stop offset="82%" stopColor={tone.sky4} />
          <stop offset="100%" stopColor={tone.sky5} />
        </linearGradient>
        <radialGradient id={g("sun")} gradientUnits="userSpaceOnUse" cx="1260" cy="128" r="280">
          <stop offset="0%" stopColor={tone.bloom} />
          <stop offset="22%" stopColor={tone.night ? "#F0A09488" : "#F7D8C2AA"} />
          <stop offset="55%" stopColor={tone.night ? "#F0A09400" : "#F2C4B000"} />
          <stop offset="100%" stopColor="#00000000" />
        </radialGradient>
        <linearGradient id={g("sea")} gradientUnits="userSpaceOnUse" x1="0" y1="478" x2="0" y2="610">
          <stop offset="0%" stopColor={tone.sea0} />
          <stop offset="55%" stopColor={tone.sea1} />
          <stop offset="100%" stopColor={tone.sea2} />
        </linearGradient>
        <linearGradient id={g("water")} gradientUnits="userSpaceOnUse" x1="240" y1="640" x2="900" y2="940">
          <stop offset="0%" stopColor={tone.water0} />
          <stop offset="40%" stopColor={tone.water1} />
          <stop offset="100%" stopColor={tone.water2} />
        </linearGradient>
        <linearGradient id={g("glass")} x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor={tone.glass0} />
          <stop offset="42%" stopColor={tone.glass1} />
          <stop offset="100%" stopColor={tone.glass2} />
        </linearGradient>
        <linearGradient id={g("side")} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={tone.side} />
          <stop offset="100%" stopColor={tone.sideDeep} />
        </linearGradient>
        <linearGradient id={g("deck")} gradientUnits="userSpaceOnUse" x1="0" y1="590" x2="200" y2="1000">
          <stop offset="0%" stopColor={nagai.concrete} />
          <stop offset="100%" stopColor={nagai.plaza} />
        </linearGradient>
        <linearGradient id={g("cope")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8EC" />
          <stop offset="100%" stopColor={nagai.warm} />
        </linearGradient>
        <filter id={g("air")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <clipPath id={g("pool")}>
          <polygon points="92,932 988,932 848,642 252,642" />
        </clipPath>
        <clipPath id={g("deckOnly")} clipPathUnits="userSpaceOnUse">
          <path
            clipRule="evenodd"
            d="M 0 600 L 1600 572 L 1600 1000 L 0 1000 Z M 64 948 L 1020 948 L 868 628 L 208 628 Z"
          />
        </clipPath>
      </defs>

      <rect width="1600" height="1000" fill={`url(#${g("sky")})`} />
      <g className="nagai-bloom">
        <ellipse cx="1260" cy="128" rx="260" ry="150" fill={`url(#${g("sun")})`} filter={`url(#${g("air")})`} />
        <rect width="1600" height="520" fill={`url(#${g("sun")})`} />
      </g>
      <circle cx="1260" cy="122" r={tone.night ? 30 : 42} fill={tone.star} />

      <rect x="0" y="478" width="1600" height="132" fill={`url(#${g("sea")})`} />
      <path d={citySilhouette(478)} fill={tone.cityFar} opacity={tone.night ? 0.62 : 0.38} />
      <path d={citySilhouette(482)} fill={tone.city} opacity={tone.night ? 0.45 : 0.22} transform="translate(10 5)" />
      {tone.night
        ? [
            [160, 444],
            [190, 418],
            [330, 430],
            [1016, 438],
            [1172, 422],
            [1378, 432],
            [1554, 438],
          ].map(([x, y], i) => <rect key={i} x={x} y={y} width="4" height="3" fill="#F2C4B0" opacity="0.75" />)
        : null}
      <line x1="0" y1="478" x2="1600" y2="478" stroke={tone.horizon} strokeWidth="2.4" opacity="0.7" />
      <line x1="60" y1="498" x2="400" y2="498" stroke="#EFFFFF" strokeWidth="1.3" opacity="0.22" />
      <line x1="1040" y1="508" x2="1460" y2="508" stroke="#EFFFFF" strokeWidth="1" opacity="0.14" />
      <g transform="translate(198 492)">
        <polygon points="0,8 20,8 16,13 -2,13" fill={nagai.palmDeep} opacity="0.5" />
        <polygon points="11,8 11,-12 18,8" fill="#FFF8EC" opacity="0.85" />
      </g>

      <polygon points="0,600 1600,572 1600,1000 0,1000" fill={`url(#${g("deck")})`} />
      <polygon points="0,588 1600,560 1600,574 0,602" fill={nagai.warm} />
      <polygon points="0,582 1600,554 1600,562 0,590" fill={nagai.concrete} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1={20 + i * 230}
          y1="1000"
          x2={480 + i * 150}
          y2="590"
          stroke="#C9AE86"
          strokeWidth="1"
          opacity="0.2"
        />
      ))}

      <polygon points="64,948 1020,948 868,628 208,628" fill={`url(#${g("cope")})`} />
      {Array.from({ length: 20 }, (_, i) => (
        <line
          key={i}
          x1={80 + i * 46}
          y1="948"
          x2={80 + i * 46}
          y2="934"
          stroke="#E4D2B4"
          strokeWidth="2.2"
          opacity="0.65"
        />
      ))}
      <polygon points="92,932 988,932 848,642 252,642" fill={`url(#${g("water")})`} />

      <g clipPath={`url(#${g("pool")})`}>
        <polygon points="252,642 848,642 820,698 278,698" fill={tone.water0} opacity="0.35" />
        <path
          d="M 140 720 C 300 688, 470 758, 640 726 C 780 700, 880 776, 980 806"
          fill="none"
          stroke="#EFFFFF"
          strokeWidth="10"
          opacity="0.2"
        />
        <path
          d="M 130 802 C 290 770, 450 848, 620 814 C 760 788, 870 864, 960 886"
          fill="none"
          stroke="#B7F4F4"
          strokeWidth="7"
          opacity="0.16"
        />
        <path d="M 190 868 C 340 844, 520 910, 720 878" fill="none" stroke="#8FEAF0" strokeWidth="5" opacity="0.2" />
        <polygon points="760,642 988,642 900,820 690,788" fill={nagai.cream} opacity="0.18" />
        <polygon points="796,664 872,658 858,748 798,754" fill={tone.glass1} opacity="0.26" />
        <polygon points="900,664 972,658 950,748 892,754" fill={tone.glass1} opacity="0.2" />
        <polygon points="270,642 430,642 250,840 140,818" fill={nagai.palmDeep} opacity="0.16" />
        <polygon points="180,872 322,856 294,918 164,928" fill="#F4EDE0" opacity="0.42" />
        <polygon points="206,888 304,876 288,918 200,924" fill="#E8D9B8" opacity="0.5" />
        <polygon points="400,642 520,642 280,932 160,932" fill={nagai.shadow} opacity="0.14" />
      </g>

      <polyline points="92,932 252,642 848,642 988,932" fill="none" stroke="#FFF8EC" strokeWidth="3.4" opacity="0.8" />

      <g className="nagai-shade" clipPath={`url(#${g("deckOnly")})`}>
        <polygon points="780,618 1124,586 1328,528 380,1000 -40,1000" fill={nagai.shadow} opacity={tone.night ? 0.5 : 0.32} />
        <polygon points="372,618 430,618 40,1000 -80,1000" fill={nagai.shadow} opacity={tone.night ? 0.4 : 0.26} />
        <polygon points="468,624 520,624 180,1000 90,1000" fill={nagai.shadow} opacity="0.18" />
        <polygon points="1390,572 1460,572 1180,1000 1080,1000" fill={nagai.shadow} opacity="0.2" />
        <polygon points="154,824 250,802 200,910 100,920" fill={nagai.shadow} opacity="0.18" />
      </g>

      <polygon points="1124,292 1328,248 1328,528 1124,586" fill={`url(#${g("side")})`} />
      <polygon points="1124,430 1328,398 1328,412 1124,444" fill={tone.sideDeep} opacity="0.45" />
      {[0, 1, 2].map((i) => {
        const x = 1164 + i * 46;
        const y0 = 318 + i * -8;
        return (
          <g key={i}>
            <polygon points={`${x},${y0} ${x + 20},${y0 - 6} ${x + 20},${y0 + 86} ${x},${y0 + 94}`} fill="#D8C9A8" />
            <polygon
              points={`${x + 3},${y0 + 7} ${x + 17},${y0 + 3} ${x + 17},${y0 + 78} ${x + 3},${y0 + 84}`}
              fill={`url(#${glass})`}
            />
          </g>
        );
      })}
      <circle cx="1264" cy="470" r="26" fill="#D8C9A8" />
      <circle cx="1264" cy="470" r="19" fill={`url(#${glass})`} />
      <path d="M 1252 460 A 19 19 0 0 1 1276 460 L 1270 484 L 1254 484 Z" fill="#FFFFFF" opacity="0.28" />

      <polygon points="780,268 1124,292 1124,586 780,618" fill={nagai.cream} />
      <polygon points="780,268 1124,292 1124,308 780,284" fill="#E8DCC0" />

      {cols.map((u) => (
        <WindowPane key={`up-${u}`} u0={u} u1={u + 0.24} v0={0.08} v1={0.3} glass={glass} />
      ))}

      <polygon
        points={quad(facadePt(-0.01, 0.35), facadePt(1.01, 0.35), facadePt(1.01, 0.53), facadePt(-0.01, 0.53))}
        fill="#E6D6B4"
      />
      <polygon
        points={quad(facadePt(-0.02, 0.5), facadePt(1.02, 0.5), facadePt(1.02, 0.535), facadePt(-0.02, 0.535))}
        fill={nagai.warm}
      />
      <line
        x1={facadePt(0.02, 0.355)[0]}
        y1={facadePt(0.02, 0.355)[1]}
        x2={facadePt(0.98, 0.355)[0]}
        y2={facadePt(0.98, 0.355)[1]}
        stroke="#5A4A32"
        strokeWidth="2.4"
      />
      {Array.from({ length: 20 }, (_, i) => {
        const u = 0.04 + i * 0.047;
        const a = facadePt(u, 0.358);
        const b = facadePt(u, 0.5);
        return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#5A4A32" strokeWidth="2.2" />;
      })}
      {[0.12, 0.42, 0.72].map((u) => {
        const a = facadePt(u, 0.46);
        const b = facadePt(u + 0.16, 0.46);
        const c = facadePt(u + 0.16, 0.505);
        const d = facadePt(u, 0.505);
        const soil = facadePt(u + 0.08, 0.455);
        return (
          <g key={u}>
            <polygon points={quad(a, b, c, d)} fill={nagai.warm} />
            <ellipse cx={soil[0]} cy={soil[1] - 3} rx="17" ry="7" fill={nagai.mint} />
            <ellipse cx={soil[0] + 6} cy={soil[1] - 5} rx="9" ry="5" fill="#4EAE8C" />
          </g>
        );
      })}

      <WindowPane u0={0.09} u1={0.46} v0={0.58} v1={0.9} glass={glass} />
      <WindowPane u0={0.5} u1={0.87} v0={0.58} v1={0.9} glass={glass} />
      <polygon
        points={quad(facadePt(0.09, 0.888), facadePt(0.87, 0.888), facadePt(0.87, 0.915), facadePt(0.09, 0.915))}
        fill={nagai.warm}
      />

      <polygon points="752,244 1154,270 1360,220 948,198" fill="#FBF4E4" />
      <polygon points="752,244 1154,270 1124,292 780,268" fill="#D8C9A8" />
      <polygon points="1154,270 1360,220 1360,234 1328,248 1124,292" fill={tone.sideDeep} />
      <polygon points="752,244 780,268 780,280 742,256" fill={nagai.warm} />

      <DivingBoard />
      <g clipPath={`url(#${g("pool")})`} opacity="0.3">
        <g transform="translate(610 718) scale(1 0.3) translate(-610 -616)">
          <DivingBoard />
        </g>
      </g>

      <ChromeLadder x={752} y={878} />
      <g clipPath={`url(#${g("pool")})`} opacity="0.34">
        <g transform="translate(752 900) scale(1 0.34)">
          <ChromeLadder x={0} y={0} />
        </g>
      </g>

      <Chaise />

      <Palm x={372} y={618} scale={1.12} />
      <Palm x={468} y={626} scale={0.68} flip />
      <Palm x={1410} y={572} scale={0.92} />
      <Palm x={70} y={1010} scale={1.48} />
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
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#1F5FA8]">
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
    <div className={`overflow-hidden bg-[#1F5FA8] ${className}`}>
      <NagaiSceneArt scene={scene} />
    </div>
  );
}
