import type { Metadata } from "next";
import { EntityIndex } from "@/components/EntityPages";

export const metadata: Metadata = {
  title: "Businesses",
  description: "Independents, markets, and the civic leagues that speak for a block.",
};

export default function BusinessesPage() {
  return <EntityIndex type="business" />;
}
