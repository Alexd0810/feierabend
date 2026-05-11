/**
 * Full-page loading indicator shown while the initial timetable fetch is
 * in flight.
 *
 * This component is purely presentational and accepts no props.
 */
export default function LoadingState() {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      <div className="loading-text">INITIALIZING FEIERABEND SYSTEM...</div>
    </div>
  );
}
