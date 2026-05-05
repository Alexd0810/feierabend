import { useState } from "react";
import type { VideoType } from "../types";
import { videoOptions, videoLabels } from "../data/videos";

export default function ParkourSection() {
  const [activeVideo, setActiveVideo] = useState<VideoType>("minecraft");

  const videoId = videoOptions[activeVideo];
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`;

  return (
    <section className="parkour-section">
      <div className="parkour-header">
        <div className="parkour-title">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Background Entertainment
          <span className="parkour-badge">ADHD Mode</span>
        </div>
        <div className="parkour-subtitle">
          Brain rot content to keep you sane while waiting
        </div>
      </div>

      <div className="video-container">
        <iframe
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-overlay" />
        <div className="adhd-text">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <span>Satisfying content to keep your brain occupied</span>
        </div>
      </div>

      <div className="video-switcher">
        {(Object.keys(videoOptions) as VideoType[]).map((type) => (
          <button
            key={type}
            className={`video-btn${activeVideo === type ? " active" : ""}`}
            onClick={() => setActiveVideo(type)}
          >
            {videoLabels[type]}
          </button>
        ))}
      </div>
    </section>
  );
}
