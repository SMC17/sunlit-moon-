"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import { nagai, sceneCrop, type NagaiScene } from "@/lib/nagai";

function Frond({ length = 130 }: { length?: number }) {
  const pairs = 8;
  return (
    <g>
      <path
        d={`M 0 0 C ${length * 0.15} ${-length * 0.08}, ${length * 0.55} ${-length * 0.04}, ${length} 0`}
        fill="none"
        stroke={nagai.palmDeep}
        strokeWidth="2.2"
      />
      {Array.from({ length: pairs }, (_, i) => {
        const t = (i + 1) / (pairs + 0.4);
        const x = length * t;
        const spread = 26 * (1 - t * 0.72) + 5;
        const leaf = 34 * (1 - t * 0.35);
        return (
          <g key={i}>
            <ellipse cx={x + 4} cy={-spread} rx={leaf} ry={4.2} transform={`rotate(${-18 - t * 8} ${x} 0)`} fill={nagai.palm} />
            <ellipse cx={x + 4} cy={spread} rx={leaf} ry={4.2} transform={`rotate(${18 + t * 8} ${x} 0)`} fill={nagai.palmDeep} />
          </g>
        );
      })}
    </g>
  );
}

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
  const fronds = [
    { r: -82, l: 108 },
    { r: -58, l: 128 },
    { r: -34, l: 140 },
    { r: -12, l: 148 },
    { r: 10, l: 146 },
    { r: 32, l: 134 },
    { r: 54, l: 118 },
    { r: 74, l: 98 },
    { r: -46, l: 86 },
    { r: 42, l: 80 },
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path
        d="M -7 8 C -5 -70, -3 -150, 0 -198 C 3 -150, 6 -70, 8 8 Z"
        fill={nagai.palm}
      />
      <ellipse cx="1" cy="-8" rx="9" ry="5" fill={nagai.palmDeep} />
      <g transform="translate(0 -198)">
        {fronds.map((f) => (
          <g key={f.r} transform={`rotate(${f.r})`}>
            <Frond length={f.l} />
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
      <rect x="-11" y="-78" width="5" height="86" rx="1.5" fill="#D7E4EE" />
      <rect x="14" y="-78" width="5" height="86" rx="1.5" fill="#C5D4E0" />
      <rect x="-11" y="-78" width="2" height="86" fill="#F4FBFF" opacity="0.7" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="-11" y={-70 + i * 16} width="30" height="3" rx="1" fill="#E8F1F6" />
      ))}
      <rect x="-18" y="6" width="44" height="4" rx="1" fill="#C5D4E0" />
    </g>
  );
}

export function NagaiSceneArt({ scene = "sleeve" }: { scene?: NagaiScene }) {
  const raw = useId().replace(/:/g, "");
  const g = (name: string) => `${raw}-${name}`;
  const night = scene === "night";

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
          <stop offset="0%" stopColor={night ? "#070C16" : "#163E86"} />
          <stop offset="28%" stopColor={night ? "#101A30" : "#2B6FBC"} />
          <stop offset="52%" stopColor={night ? "#1A335C" : "#5AA4D6"} />
          <stop offset="72%" stopColor={night ? "#2A4A78" : "#B7D6EA"} />
          <stop offset="86%" stopColor={night ? "#3A5A82" : "#F2C4B0"} />
          <stop offset="100%" stopColor={night ? "#4A688C" : "#E8B89A"} />
        </linearGradient>
        <radialGradient id={g("sun")} cx="78%" cy="18%" r="28%">
          <stop offset="0%" stopColor={night ? nagai.coral : "#FFF3E4"} />
          <stop offset="18%" stopColor={night ? "#F0A094" : nagai.sun} />
          <stop offset="46%" stopColor={night ? "#F0A09400" : "#F2C4B000"} />
          <stop offset="100%" stopColor="#00000000" />
        </radialGradient>
        <linearGradient id={g("sea")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night ? "#1A5060" : "#4E9CC0"} />
          <stop offset="55%" stopColor={night ? "#146070" : nagai.pool} />
          <stop offset="100%" stopColor={night ? "#0E4A58" : nagai.poolDeep} />
        </linearGradient>
        <linearGradient id={g("water")} x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={night ? "#1C7A88" : "#46D0DC"} />
          <stop offset="40%" stopColor={night ? "#15707E" : nagai.pool} />
          <stop offset="100%" stopColor={night ? "#0D5560" : "#0F7484"} />
        </linearGradient>
        <linearGradient id={g("glass")} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={night ? "#F6C2A4" : "#D7F0F6"} />
          <stop offset="38%" stopColor={night ? "#E89A78" : nagai.glass} />
          <stop offset="100%" stopColor={night ? "#C46A52" : "#3A88B0"} />
        </linearGradient>
        <linearGradient id={g("side")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={nagai.concrete} />
          <stop offset="100%" stopColor={nagai.warm} />
        </linearGradient>
        <linearGradient id={g("deck")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={nagai.concrete} />
          <stop offset="100%" stopColor={nagai.plaza} />
        </linearGradient>
        <linearGradient id={g("cope")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7EEDC" />
          <stop offset="100%" stopColor={nagai.warm} />
        </linearGradient>
        <clipPath id={g("pool")}>
          <polygon points="96,926 972,926 838,638 248,638" />
        </clipPath>
        <clipPath id={g("seaClip")}>
          <rect x="0" y="498" width="1600" height="130" />
        </clipPath>
      </defs>

      <rect width="1600" height="1000" fill={`url(#${g("sky")})`} />
      <rect width="1600" height="1000" fill={`url(#${g("sun")})`} />
      <circle cx="1240" cy="168" r={night ? 34 : 46} fill={night ? nagai.coral : "#FFF6EA"} opacity={night ? 0.95 : 0.9} />

      <rect x="0" y="498" width="1600" height="128" fill={`url(#${g("sea")})`} />
      <g clipPath={`url(#${g("seaClip")})`} opacity={night ? 0.25 : 0.35}>
        <rect x="180" y="506" width="220" height="28" fill={nagai.cobalt} />
        <rect x="430" y="512" width="90" height="42" fill={nagai.cerulean} />
        <rect x="560" y="508" width="160" height="22" fill={nagai.cobalt} />
        <rect x="980" y="510" width="70" height="36" fill={nagai.cerulean} />
        <rect x="1180" y="506" width="190" height="26" fill={nagai.cobalt} />
      </g>
      <rect x="0" y="498" width="1600" height="3" fill={night ? "#6A88A8" : "#F0D0BC"} opacity="0.55" />

      <polygon points="0,620 1600,620 1600,1000 0,1000" fill={`url(#${g("deck")})`} />
      <polygon points="0,610 1600,596 1600,622 0,636" fill={nagai.warm} />

      <polygon points="1110,620 1236,588 380,930 80,930" fill={nagai.shadow} opacity={night ? 0.45 : 0.38} />
      <polygon points="430,620 510,620 120,960 -40,960" fill={nagai.shadow} opacity={night ? 0.32 : 0.26} />
      <polygon points="1288,620 1360,620 1080,980 980,980" fill={nagai.shadow} opacity="0.2" />

      <g>
        <polygon points="1110,298 1248,262 1248,582 1110,622" fill={`url(#${g("side")})`} />
        <polygon points="1110,430 1248,402 1248,414 1110,442" fill={nagai.warm} />
        {[0, 1, 2].map((i) => (
          <polygon
            key={i}
            points={`${1134 + i * 28},${328 + i * -7} ${1154 + i * 28},${322 + i * -7} ${1154 + i * 28},${388 + i * -7} ${1134 + i * 28},${394 + i * -7}`}
            fill={`url(#${g("glass")})`}
          />
        ))}
      </g>

      <rect x="758" y="300" width="352" height="322" fill={nagai.cream} />
      <polygon points="740,286 1134,286 1270,246 872,246" fill="#F7F0E0" />
      <polygon points="740,286 1134,286 1134,300 758,300 758,314 740,314" fill={nagai.concrete} />
      <polygon points="1134,286 1270,246 1270,260 1134,300" fill={nagai.warm} />

      {[0, 1].map((row) =>
        [0, 1, 2].map((col) => (
          <g key={`${row}-${col}`}>
            <rect x={788 + col * 104} y={324 + row * 78} width="86" height="64" fill="#EFE4CC" />
            <rect x={794 + col * 104} y={330 + row * 78} width="74" height="52" fill={`url(#${g("glass")})`} />
            <path
              d={`M ${798 + col * 104} ${334 + row * 78} L ${830 + col * 104} ${334 + row * 78} L ${818 + col * 104} ${378 + row * 78} L ${798 + col * 104} ${378 + row * 78} Z`}
              fill="#FFFFFF"
              opacity="0.28"
            />
          </g>
        )),
      )}

      <rect x="746" y="468" width="376" height="14" fill={nagai.cream} />
      <rect x="746" y="468" width="376" height="3" fill={nagai.mint} opacity="0.55" />
      {Array.from({ length: 19 }, (_, i) => (
        <rect key={i} x={754 + i * 19} y={436} width="2.4" height="32" fill="#F7F1E2" />
      ))}
      <rect x="746" y="434" width="376" height="3" fill="#F7F1E2" />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={772 + i * 118} y="448" width="52" height="16" fill={nagai.warm} />
          <ellipse cx={798 + i * 118} cy="446" rx="22" ry="9" fill={nagai.mint} />
          <ellipse cx={808 + i * 118} cy="444" rx="12" ry="7" fill="#5FBF9A" />
        </g>
      ))}

      <rect x="788" y="508" width="292" height="96" fill="#EFE4CC" />
      <rect x="796" y="516" width="134" height="80" fill={`url(#${g("glass")})`} />
      <rect x="934" y="516" width="134" height="80" fill={`url(#${g("glass")})`} />
      <rect x="928" y="516" width="6" height="80" fill={nagai.cream} />
      <path d="M 802 522 L 848 522 L 834 588 L 802 588 Z" fill="#FFFFFF" opacity="0.22" />
      <rect x="796" y="590" width="272" height="4" fill={nagai.warm} />

      <polygon points="80,930 988,930 854,622 232,622" fill={`url(#${g("cope")})`} />
      <polygon points="96,926 972,926 838,638 248,638" fill={`url(#${g("water")})`} />

      <g clipPath={`url(#${g("pool")})`}>
        <ellipse cx="420" cy="720" rx="210" ry="36" fill="#8FEAF0" opacity="0.22" />
        <ellipse cx="610" cy="790" rx="180" ry="28" fill="#B7F4F4" opacity="0.16" />
        <ellipse cx="360" cy="840" rx="140" ry="22" fill="#6AD8E0" opacity="0.2" />
        <path d="M 220 700 C 340 680, 480 760, 620 740 C 760 720, 820 800, 900 820" fill="none" stroke="#DFFFFF" strokeWidth="7" opacity="0.14" />
        <polygon points="780,638 980,638 860,780 700,760" fill={nagai.cream} opacity="0.16" />
        <polygon points="300,638 430,638 250,820 160,800" fill={nagai.palmDeep} opacity="0.12" />
        <polygon points="200,860 310,848 286,900 178,910" fill="#F4EDE0" opacity="0.35" />
        <polygon points="230,878 300,870 286,900 220,906" fill="#E8D9B8" opacity="0.4" />
      </g>

      <polyline points="96,926 248,638 838,638 972,926" fill="none" stroke="#F7F1E2" strokeWidth="3" opacity="0.55" />

      <ChromeLadder x={900} y={868} />
      <g clipPath={`url(#${g("pool")})`} opacity="0.35">
        <g transform="translate(900 888) scale(1 0.35)">
          <ChromeLadder x={0} y={0} />
        </g>
      </g>

      <g>
        <rect x="486" y="598" width="168" height="8" fill="#F4F0E6" />
        <rect x="558" y="574" width="10" height="32" fill="#D5E0E8" />
        <rect x="554" y="570" width="18" height="6" fill="#E8F1F6" />
        <rect x="620" y="596" width="6" height="10" fill="#C5D4E0" />
      </g>

      <Palm x={428} y={624} scale={1.05} />
      <Palm x={512} y={628} scale={0.72} flip />
      <Palm x={1326} y={624} scale={0.88} />
      <Palm x={118} y={980} scale={1.35} />
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
