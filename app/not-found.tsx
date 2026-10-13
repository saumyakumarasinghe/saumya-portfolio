import { PillLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center gap-8 pt-28">
      <p className="eyebrow text-ink-muted">404 · Off the trail</p>
      <h1 className="font-display text-section font-normal">
        This path is <em className="emphasis">overgrown</em>.
      </h1>
      <PillLink href="/" className="self-start">Back to the field notes</PillLink>
    </section>
  );
}
