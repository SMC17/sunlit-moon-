export const nagai = {
  cobalt: "#1B4F9C",
  cerulean: "#3A86C8",
  sky: "#6FB4E2",
  haze: "#A9D2EC",
  flesh: "#F2C4B0",
  sun: "#F7D8C2",
  pool: "#2BB8C9",
  poolDeep: "#178A9C",
  mint: "#7ED8C5",
  aqua: "#8FDFE6",
  glass: "#9ED4E4",
  coral: "#F0A094",
  cream: "#F3E6CF",
  concrete: "#E4D2B4",
  warm: "#C9AE86",
  plaza: "#D8C29A",
  sand: "#F3EFE4",
  indigo: "#162238",
  night: "#0C1424",
  shadow: "#1A3A6E",
  palm: "#143052",
  palmDeep: "#0C2038",
  chrome: "#C9D6E0",
  chromeHi: "#F4FBFF",
  cope: "#F7F1E2",
} as const;

export type NagaiScene = "sleeve" | "pool" | "facade" | "lake" | "night";

export function sceneForKicker(kicker: string): NagaiScene {
  const key = kicker.toLowerCase();
  if (key.includes("civic") || key.includes("tuesday")) return "night";
  if (key.includes("landscape") || key.includes("water") || key.includes("lake")) return "lake";
  if (key.includes("street") || key.includes("mile")) return "pool";
  return "facade";
}

export const sceneCrop: Record<NagaiScene, string> = {
  sleeve: "0 0 1600 1000",
  pool: "20 500 860 480",
  facade: "600 140 920 760",
  lake: "0 20 1600 540",
  night: "0 0 1600 1000",
};
