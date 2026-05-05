import { quotes } from "../data/quotes";

interface QuoteSectionProps {
  minutesLeft: number;
}

export default function QuoteSection({ minutesLeft }: QuoteSectionProps) {
  let category: keyof typeof quotes;
  if (minutesLeft <= 0) category = "done";
  else if (minutesLeft <= 60) category = "close";
  else if (minutesLeft <= 180) category = "medium";
  else category = "far";

  const list = quotes[category];
  const quote = list[Math.floor(Date.now() / 30000) % list.length];

  return (
    <section className="quote-section">
      <div className="quote-icon">"</div>
      <div className="quote-text">{quote.text}</div>
      <div className="quote-vibe">{quote.vibe}</div>
    </section>
  );
}
