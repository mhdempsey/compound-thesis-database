import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 py-12 mt-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-charcoal-light">
            {new Date().getFullYear()} Compound VC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/compikiund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://compound.vc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
            >
              Website
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
