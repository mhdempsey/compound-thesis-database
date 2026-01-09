import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 py-12 mt-24">
      <Container>
        <div className="flex justify-center">
          <p className="text-sm text-charcoal-light">
            {new Date().getFullYear()} Compound
          </p>
        </div>
      </Container>
    </footer>
  );
}
