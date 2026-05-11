/**
 * Renders the decorative animated background layers:
 * - a CSS grid overlay,
 * - three gradient orbs, and
 * - a scanline effect.
 *
 * This component is purely presentational and accepts no props.
 */
export default function Background() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="scanlines" />
    </>
  );
}
