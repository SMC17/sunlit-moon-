import type { Metadata } from "next";
import { EntityDetail } from "@/components/EntityPages";
import { getEntitiesByType, getEntity } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getEntitiesByType("development").map((entity) => ({ slug: entity.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity(slug);
  return {
    title: entity?.name ?? "Development",
    description: entity?.dek,
  };
}

export default async function DevelopmentPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <EntityDetail type="development" slug={slug} />;
}
