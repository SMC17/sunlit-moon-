export const nagai = {
  cobalt: "#1F5FA8",
  sky: "#6FB0E0",
  skyMid: "#9BCCEC",
  skyLow: "#C8DFF2",
  horizon: "#E7C4A4",
  pool: "#2EC4D4",
  poolDeep: "#1A9EAD",
  aqua: "#8FDFE6",
  glass: "#B9E8EE",
  coral: "#F0A094",
  cream: "#F4E6C8",
  building: "#E8D5B0",
  plaza: "#D9C49A",
  sand: "#F3EFE4",
  indigo: "#162238",
  night: "#0E1828",
  shadow: "#1A3F72",
  palm: "#16345C",
} as const;

export type NagaiScene = "sleeve" | "pool" | "facade" | "lake" | "night";

export function sceneForKicker(kicker: string): NagaiScene {
  const key = kicker.toLowerCase();
  if (key.includes("civic") || key.includes("tuesday")) return "night";
  if (key.includes("landscape") || key.includes("water") || key.includes("lake")) return "lake";
  if (key.includes("street") || key.includes("mile")) return "pool";
  return "facade";
}
