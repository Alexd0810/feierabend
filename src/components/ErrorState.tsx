interface ErrorStateProps {
  onRetry: () => void;
}

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
