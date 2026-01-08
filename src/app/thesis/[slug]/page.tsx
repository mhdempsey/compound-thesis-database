import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ThesisContent } from "@/components/thesis/ThesisContent";
import { RelatedTheses } from "@/components/thesis/RelatedTheses";
import {
  getPublishedTheses,
  getThesisBySlug,
  getPageBlocks,
  getRelatedTheses,
} from "@/lib/notion-helpers";

export const revalidate = 60;

interface ThesisPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all published theses
export async function generateStaticParams() {
  const theses = await getPublishedTheses();
  return theses.map((thesis) => ({
    slug: thesis.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ThesisPageProps): Promise<Metadata> {
  const { slug } = await params;
  const thesis = await getThesisBySlug(slug);

  if (!thesis) {
    return {
      title: "Thesis Not Found | Compound VC",
    };
  }

  return {
    title: `${thesis.name} | Compound VC Theses`,
    description: thesis.oneLiner,
    openGraph: {
      title: thesis.name,
      description: thesis.oneLiner,
      type: "article",
      publishedTime: thesis.publicationDate || undefined,
    },
  };
}

export default async function ThesisPage({ params }: ThesisPageProps) {
  const { slug } = await params;
  const thesis = await getThesisBySlug(slug);

  if (!thesis) {
    notFound();
  }

  const [blocks, relatedTheses] = await Promise.all([
    getPageBlocks(thesis.id),
    getRelatedTheses(thesis, 3),
  ]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <ThesisContent thesis={thesis} blocks={blocks} />
          {relatedTheses.length > 0 && (
            <RelatedTheses theses={relatedTheses} />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
