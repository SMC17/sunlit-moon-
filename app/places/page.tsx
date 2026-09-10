import type { Metadata } from "next";
import { EntityIndex } from "@/components/EntityPages";

export const metadata: Metadata = {
  title: "Places",
  description: "Squares, streets, a lakefront, a campus — the rooms a city is made of.",
};

export default function PlacesPage() {
  return <EntityIndex type="place" />;
}
