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

/** Broad drooping blade — a fountain of leaves, not a sea urchin. */
function bladePath(length: number, droop: number, width: number) {
  const mid = length * 0.42;
  const tip = length;
  return [
    `M 0,2`,
    `C ${mid * 0.35},${-width * 0.2} ${mid},${-width} ${length * 0.7},${-width * 0.45 + droop * 0.35}`,
    `C ${length * 0.86},${-width * 0.12 + droop * 0.6} ${tip},${droop * 0.75} ${tip},${droop}`,
    `C ${length * 0.86},${droop + width * 0.18} ${length * 0.7},${width * 0.4 + droop * 0.35} ${mid},${width * 0.62}`,
    `C ${mid * 0.35},${width * 0.22} 10,8 0,3`,
    `Z`,
  ].join(" ");
}

function Frond({
  length = 150,
  droop = 36,
  width = 22,
  deep = false,
}: {
  length?: number;
  droop?: number;
  width?: number;
  deep?: boolean;
}) {
  return <path d={bladePath(length, droop, width)} fill={deep ? nagai.palmDeep : nagai.palm} />;
}

const PALM_FRONDS = [
  { r: -108, l: 92, d: 48, w: 18 },
  { r: -78, l: 128, d: 40, w: 22 },
  { r: -50, l: 152, d: 34, w: 24 },
  { r: -24, l: 168, d: 26, w: 26 },
  { r: 2, l: 174, d: 22, w: 26 },
  { r: 28, l: 162, d: 30, w: 24 },
  { r: 54, l: 140, d: 38, w: 22 },
  { r: 80, l: 112, d: 46, w: 18 },
  { r: 104, l: 86, d: 52, w: 16 },
  { r: -128, l: 70, d: 30, w: 14 },
  { r: 122, l: 64, d: 34, w: 14 },
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
            <Frond length={f.l} droop={f.d} width={f.w} deep={i % 3 === 0} />
          </g>
        ))}
        <circle r="7" fill={nagai.palmDeep} />
      </g>
    </g>
  );
}

function ChromeLadder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.18)`}>
      <path d="M -16 -96 C -24 -108, -20 -116, -10 -110 L -8 -96 Z" fill="#9AABB8" />
      <path d="M 26 -96 C 34 -108, 30 -116, 20 -110 L 18 -96 Z" fill="#6E7E8A" />
      <rect x="-13" y="-98" width="6" height="112" rx="1.5" fill="#9AABB8" />
      <rect x="17" y="-98" width="6" height="112" rx="1.5" fill="#5E6E7A" />
      <rect x="-13" y="-98" width="2" height="112" fill={nagai.chromeHi} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="-13" y={-82 + i * 16.5} width="36" height="3.8" rx="1" fill="#C5D0D8" />
          <rect x="-13" y={-82 + i * 16.5} width="36" height="1.2" fill={nagai.chromeHi} opacity="0.8" />
        </g>
      ))}
      <rect x="-22" y="12" width="54" height="6" rx="1" fill="#6E7E8A" />
    </g>
  );
}

function DivingBoard() {
  return (
    <g>
      <polygon points="488,626 710,626 732,608 516,608" fill="#E8EEF2" />
      <polygon points="516,608 732,608 746,598 532,598" fill={nagai.chromeHi} />
      <polygon points="710,626 746,598 746,610 710,636" fill="#5E6E7A" />
      <rect x="598" y="626" width="11" height="18" fill="#9AABB8" />
      <rect x="634" y="626" width="11" height="18" fill="#6E7E8A" />
      <rect x="590" y="642" width="64" height="7" rx="1" fill="#5E6E7A" />
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
  const tl: [number, number] = [748, 246];
  const tr: [number, number] = [1068, 286];
  const bl: [number, number] = [748, 628];
  const br: [number, number] = [1068, 568];
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
          <polygon points="88,928 968,928 788,648 298,648" />
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

      <g className="nagai-shade">
        <polygon points="748,628 1068,568 1296,498 980,628 420,980 40,980" fill={nagai.shadow} opacity={tone.night ? 0.28 : 0.16} />
        <polygon points="340,618 412,618 80,980 -40,980" fill={nagai.shadow} opacity={tone.night ? 0.38 : 0.28} />
        <polygon points="448,626 508,626 200,980 110,980" fill={nagai.shadow} opacity="0.2" />
        <polygon points="1396,568 1470,568 1200,980 1090,980" fill={nagai.shadow} opacity="0.22" />
        <polygon points="154,824 250,802 210,920 100,928" fill={nagai.shadow} opacity="0.2" />
      </g>

      <polygon points="36,962 1024,962 812,616 250,616" fill={`url(#${g("cope")})`} />
      {Array.from({ length: 18 }, (_, i) => (
        <line
          key={i}
          x1={58 + i * 52}
          y1="962"
          x2={58 + i * 52}
          y2="938"
          stroke="#E4D2B4"
          strokeWidth="2.4"
          opacity="0.75"
        />
      ))}
      <polygon points="88,928 968,928 788,648 298,648" fill={`url(#${g("water")})`} />

      <g clipPath={`url(#${g("pool")})`}>
        <polygon points="298,648 788,648 768,708 320,708" fill={tone.water0} opacity="0.42" />
        <path
          d="M 160 720 C 320 688, 490 758, 650 726 C 780 704, 860 770, 940 798"
          fill="none"
          stroke="#EFFFFF"
          strokeWidth="12"
          opacity="0.28"
        />
        <path
          d="M 150 804 C 300 772, 460 848, 630 814 C 760 790, 850 854, 930 878"
          fill="none"
          stroke="#B7F4F4"
          strokeWidth="8"
          opacity="0.22"
        />
        <path d="M 200 868 C 360 844, 540 910, 740 876" fill="none" stroke="#8FEAF0" strokeWidth="6" opacity="0.26" />
        <polygon points="700,642 978,642 880,820 660,786" fill={nagai.cream} opacity="0.2" />
        <polygon points="748,662 830,656 816,746 754,752" fill={tone.glass1} opacity="0.28" />
        <polygon points="860,662 936,656 914,746 852,752" fill={tone.glass1} opacity="0.22" />
        <polygon points="300,642 450,642 260,840 150,818" fill={nagai.palmDeep} opacity="0.18" />
        <polygon points="180,872 322,856 294,918 164,928" fill="#F4EDE0" opacity="0.45" />
        <polygon points="206,888 304,876 288,918 200,924" fill="#E8D9B8" opacity="0.52" />
        <polygon points="420,642 560,642 300,936 160,936" fill={nagai.shadow} opacity="0.2" />
      </g>

      <polyline points="88,928 298,648 788,648 968,928" fill="none" stroke="#FFF8EC" strokeWidth="4" opacity="0.9" />

      <polygon points="1068,286 1296,228 1296,498 1068,568" fill={`url(#${g("side")})`} />
      <polygon points="1068,430 1296,388 1296,404 1068,446" fill={tone.sideDeep} opacity="0.5" />
      {[0, 1, 2].map((i) => {
        const x = 1112 + i * 50;
        const y0 = 312 + i * -10;
        return (
          <g key={i}>
            <polygon points={`${x},${y0} ${x + 22},${y0 - 8} ${x + 22},${y0 + 80} ${x},${y0 + 90}`} fill="#D8C9A8" />
            <polygon
              points={`${x + 3},${y0 + 8} ${x + 19},${y0 + 2} ${x + 19},${y0 + 72} ${x + 3},${y0 + 80}`}
              fill={`url(#${glass})`}
            />
          </g>
        );
      })}
      <circle cx="1238" cy="458" r="26" fill="#D8C9A8" />
      <circle cx="1238" cy="458" r="19" fill={`url(#${glass})`} />
      <path d="M 1226 448 A 19 19 0 0 1 1250 448 L 1244 472 L 1228 472 Z" fill="#FFFFFF" opacity="0.28" />

      <polygon points="748,246 1068,286 1068,568 748,628" fill={nagai.cream} />
      <polygon points="748,246 1068,286 1068,304 748,264" fill="#E8DCC0" />

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

      <polygon points="718,208 1110,258 1344,190 910,156" fill="#FBF4E4" />
      <polygon points="718,208 1110,258 1068,286 748,246" fill="#B89568" />
      <polygon points="1110,258 1344,190 1344,208 1296,228 1068,286" fill={tone.sideDeep} />
      <polygon points="718,208 748,246 748,260 706,222" fill={nagai.warm} />

      <polygon points="1088,575 1336,508 1480,600 1480,1000 1020,956" fill={nagai.shadow} opacity={tone.night ? 0.34 : 0.22} />
      <polygon points="0,620 248,628 40,960 0,1000" fill={nagai.shadow} opacity={tone.night ? 0.3 : 0.18} />

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
