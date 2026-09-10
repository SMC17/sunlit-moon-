"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { nagai, type NagaiScene } from "@/lib/nagai";

function Palm({ x, y, h = 220, flip = false }: { x: number; y: number; h?: number; flip?: boolean }) {
  const trunk = h * 0.55;
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} 1)`}>
      <rect x="-5" y={-trunk} width="10" height={trunk} fill={nagai.palm} />
      <ellipse cx="0" cy={-trunk - 8} rx="52" ry="14" fill={nagai.palm} />
      <ellipse cx="28" cy={-trunk + 6} rx="44" ry="11" transform="rotate(28)" fill={nagai.palm} />
      <ellipse cx="-26" cy={-trunk + 4} rx="40" ry="11" transform="rotate(-24)" fill={nagai.palm} />
      <ellipse cx="8" cy={-trunk - 22} rx="36" ry="10" transform="rotate(8)" fill={nagai.cobalt} />
    </g>
  );
}

function PrintedSky({ night = false }: { night?: boolean }) {
  if (night) {
    return (
      <g>
        <rect width="1200" height="800" fill={nagai.night} />
        <rect y="0" width="1200" height="90" fill="#0A1220" />
        <rect y="90" width="1200" height="80" fill="#101A2C" />
        <rect y="170" width="1200" height="80" fill="#162238" />
        <rect y="250" width="1200" height="70" fill="#1C3A68" />
        <rect y="320" width="1200" height="50" fill="#2A4F86" />
        <circle cx="980" cy="120" r="36" fill={nagai.coral} />
      </g>
    );
  }
  return (
    <g>
      <rect width="1200" height="800" fill={nagai.sky} />
      <rect y="0" width="1200" height="70" fill={nagai.cobalt} />
      <rect y="70" width="1200" height="80" fill="#3478C4" />
      <rect y="150" width="1200" height="80" fill="#4E94D4" />
      <rect y="230" width="1200" height="70" fill={nagai.sky} />
      <rect y="300" width="1200" height="60" fill={nagai.skyMid} />
      <rect y="360" width="1200" height="50" fill={nagai.skyLow} />
      <rect y="410" width="1200" height="28" fill={nagai.horizon} />
      <circle cx="1040" cy="96" r="42" fill="#F3D7B0" />
    </g>
  );
}

function Facade({
  x,
  y,
  night = false,
}: {
  x: number;
  y: number;
  night?: boolean;
}) {
  const glass = night ? nagai.coral : nagai.glass;
  return (
    <g>
      <polygon points={`${x + 20},${y} ${x + 280},${y} ${x + 40},${y + 210} ${x - 220},${y + 210}`} fill={nagai.shadow} />
      <rect x={x} y={y - 260} width="260" height="260" fill={nagai.cream} />
      <rect x={x + 260} y={y - 260} width="36" height="260" fill={nagai.building} />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={x + 22 + col * 56}
            y={y - 236 + row * 56}
            width="40"
            height="40"
            fill={glass}
          />
        )),
      )}
      <rect x={x - 10} y={y - 148} width="280" height="10" fill={nagai.cream} />
      <rect x={x - 10} y={y - 148} width="280" height="3" fill={nagai.aqua} />
    </g>
  );
}

export function NagaiSceneArt({ scene = "sleeve" }: { scene?: NagaiScene }) {
  const night = scene === "night";
  const lake = scene === "lake";
  const poolFocus = scene === "pool";

  return (
    <svg
      viewBox="0 0 1200 800"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <PrintedSky night={night} />
      <rect x="0" y={lake ? 360 : 430} width="1200" height={lake ? 220 : 140} fill={night ? "#156A78" : nagai.poolDeep} />
      <rect x="0" y={lake ? 420 : 470} width="1200" height={lake ? 160 : 80} fill={night ? nagai.poolDeep : nagai.pool} />
      <rect x="0" y="540" width="1200" height="260" fill={nagai.plaza} />
      <rect x="0" y="540" width="1200" height="8" fill={nagai.building} />

      {poolFocus || scene === "sleeve" ? (
        <g>
          <rect x="70" y="600" width="420" height="150" fill={nagai.pool} />
          <rect x="70" y="600" width="420" height="22" fill={nagai.poolDeep} />
          <rect x="70" y="600" width="8" height="150" fill={nagai.aqua} />
        </g>
      ) : null}

      {scene !== "pool" ? (
        <Facade x={scene === "facade" ? 520 : 640} y={540} night={night} />
      ) : (
        <Facade x={760} y={540} night={night} />
      )}

      <Palm x={scene === "lake" ? 180 : 430} y={540} h={240} />
      <Palm x={scene === "lake" ? 260 : 500} y={540} h={180} flip />
      {scene === "sleeve" || scene === "night" ? <Palm x={1120} y={540} h={200} /> : null}

      <g transform="translate(180 700)">
        <rect x="0" y="0" width="92" height="28" rx="2" fill={night ? nagai.coral : nagai.cream} />
        <rect x="10" y="-16" width="48" height="16" fill={nagai.building} />
        <circle cx="20" cy="28" r="9" fill={nagai.indigo} />
        <circle cx="72" cy="28" r="9" fill={nagai.indigo} />
      </g>
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
  const shift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 16]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-cobalt">
      <motion.div className="absolute inset-[-4%] h-[108%] w-[108%]" style={{ y: shift }}>
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
    <div className={`overflow-hidden bg-cobalt ${className}`}>
      <NagaiSceneArt scene={scene === "sleeve" ? "facade" : scene} />
    </div>
  );
}
