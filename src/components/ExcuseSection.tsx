import { useState } from "react";
import { excuses } from "../data/excuses";

/**
 * Displays a button that picks a random excuse from the {@link excuses} pool
 * and renders it below the button.
 *
 * This component is self-contained and accepts no props.
 */
export default function ExcuseSection() {
  const [excuse, setExcuse] = useState<string | null>(null);

  const generate = () => {
    setExcuse(excuses[Math.floor(Math.random() * excuses.length)]);
  };

  return (
    <section className="excuse-section">
      <button className="excuse-btn" onClick={generate}>
        Generate Excuse to Leave Early
      </button>
      {excuse && <div className="excuse-result show">"{excuse}"</div>}
    </section>
  );
}
