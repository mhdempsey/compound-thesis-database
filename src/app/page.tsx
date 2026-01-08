import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ThesisListClient } from "@/components/home/ThesisListClient";
import { ThesisCardSkeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/layout/Container";
import { getPublishedTheses } from "@/lib/notion-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const theses = await getPublishedTheses();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense
          fallback={
            <Container className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ThesisCardSkeleton key={i} />
                ))}
              </div>
            </Container>
          }
        >
          <ThesisListClient initialTheses={theses} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
