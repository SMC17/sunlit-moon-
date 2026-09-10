import type { Metadata } from "next";
import { EntityIndex } from "@/components/EntityPages";

export const metadata: Metadata = {
  title: "People",
  description: "Commissioners, staff, architects, and the people who keep asking who the plaza is for.",
};

export default function PeoplePage() {
  return <EntityIndex type="person" />;
}
