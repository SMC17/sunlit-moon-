import type { Metadata } from "next";
import { EntityDetail } from "@/components/EntityPages";
import { getEntitiesByType, getEntity } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getEntitiesByType("business").map((entity) => ({ slug: entity.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity(slug);
  return {
    title: entity?.name ?? "Business",
    description: entity?.dek,
  };
}

export default async function BusinessPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <EntityDetail type="business" slug={slug} />;
}
