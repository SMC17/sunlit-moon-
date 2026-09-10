import type { Metadata } from "next";
import { EntityIndex } from "@/components/EntityPages";

export const metadata: Metadata = {
  title: "Developments",
  description: "The civic statuses of Evanston’s buildings in motion.",
};

export default function DevelopmentsPage() {
  return <EntityIndex type="development" />;
}
