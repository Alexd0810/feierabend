/** Props for {@link ErrorState}. */
export interface ErrorStateProps {
  /** Called when the user clicks the "RETRY" button. */
  onRetry: () => void;
}

/**
 * Full-page error state shown when the timetable fetch fails.
 *
 * Displays a brief error message and a retry button.
 */
export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="error">
      <div className="error-icon">!</div>
      <div className="error-message">Connection failed</div>
      <button className="retry-btn" onClick={onRetry}>
        RETRY
      </button>
    </div>
  );
}
