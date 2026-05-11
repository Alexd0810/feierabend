import { quotes } from "../data/quotes";
import { QUOTE_ROTATION_INTERVAL_MS } from "../config";

/** Props for {@link QuoteSection}. */
export interface QuoteSectionProps {
  /** Minutes remaining until Feierabend. Used to select the quote bucket. */
  minutesLeft: number;
}

/**
 * Displays a contextually appropriate motivational quote.
 *
 * The quote bucket is determined by `minutesLeft`:
 * - `done`   – Feierabend already reached
 * - `close`  – ≤ 60 min left
 * - `medium` – ≤ 180 min left
 * - `far`    – more than 180 min left
 *
 * Within the bucket the displayed entry rotates every
 * {@link QUOTE_ROTATION_INTERVAL_MS}.
 */
export default function QuoteSection({ minutesLeft }: QuoteSectionProps) {
  let category: keyof typeof quotes;
  if (minutesLeft <= 0) category = "done";
  else if (minutesLeft <= 60) category = "close";
  else if (minutesLeft <= 180) category = "medium";
  else category = "far";

  const list = quotes[category];
  const quote =
    list[Math.floor(Date.now() / QUOTE_ROTATION_INTERVAL_MS) % list.length];

  return (
    <section className="quote-section">
      <div className="quote-icon">"</div>
      <div className="quote-text">{quote.text}</div>
      <div className="quote-vibe">{quote.vibe}</div>
    </section>
  );
}
