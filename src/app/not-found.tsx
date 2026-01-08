import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="py-32 text-center">
            <h1 className="font-serif text-6xl font-medium text-charcoal mb-4">
              404
            </h1>
            <p className="text-xl text-charcoal-light mb-8">
              This thesis could not be found.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-full hover:bg-charcoal/90 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all theses
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
