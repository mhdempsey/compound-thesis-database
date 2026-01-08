import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ThesisLoading() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <article className="py-12 md:py-20">
            {/* Back link skeleton */}
            <Skeleton className="h-4 w-32 mb-8" />

            {/* Header skeleton */}
            <div className="mb-12">
              {/* Categories */}
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-12 md:h-16 w-3/4 mb-6" />

              {/* One-liner */}
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3 mb-8" />

              {/* Meta */}
              <div className="flex items-center gap-4 pt-8 border-t border-charcoal/10">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4 max-w-3xl">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="h-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="h-4" />
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
