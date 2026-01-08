import { Container } from "@/components/layout/Container";
import { Skeleton, ThesisCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="py-20 md:py-32">
        <Container>
          <Skeleton className="h-16 md:h-20 w-2/3 mb-6" />
          <Skeleton className="h-6 w-1/2" />
        </Container>
      </section>

      {/* Filter bar skeleton */}
      <div className="sticky top-16 z-40 bg-cream/90 backdrop-blur-sm py-4 border-b border-charcoal/10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex gap-2">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-20 rounded-full" />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-64 rounded-full" />
              <Skeleton className="h-10 w-20 rounded-full" />
            </div>
          </div>
        </Container>
      </div>

      {/* Grid skeleton */}
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ThesisCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </main>
  );
}
