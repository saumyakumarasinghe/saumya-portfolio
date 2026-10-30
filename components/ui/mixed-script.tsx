import { Fragment } from "react";

/** A run of Sinhala letters, joined across the spaces and dots between words. */
const SINHALA_RUN = /([඀-෿‌‍]+(?:[ .'’-]+[඀-෿‌‍]+)*)/;

/**
 * Renders a string that may mix English and Sinhala, tagging each Sinhala run
 * with lang="si" so screen readers pick the right voice and the browser picks
 * the right font and line-height (see `:lang(si)` in globals.css).
 */
export function MixedScript({ text }: { text: string }) {
  const parts = text.split(SINHALA_RUN);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} lang="si">
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
