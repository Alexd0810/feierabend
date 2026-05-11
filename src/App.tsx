import { useState, useEffect, useRef } from "react";
import type { Lesson, DayInfo } from "./types";
import { useDayInfo } from "./hooks/useDayInfo";
import { useTimetable } from "./hooks/useTimetable";
import { useTimer } from "./hooks/useTimer";
import { useSound } from "./hooks/useSound";
import { useMilestones } from "./hooks/useMilestones";
import { getCurrentMinutes, getSecondsUntil } from "./utils/time";
import {
  getCurrentLesson,
  getNextLesson,
  getCancelledLessons,
  findReplacementLessons,
} from "./utils/lessons";
import { DAY_START_MIN, WORK_DAY_END_MIN } from "./config";
import Background from "./components/Background";
import DebugBanner from "./components/DebugBanner";
import SoundToggle from "./components/SoundToggle";
import Mascot from "./components/Mascot";
import MilestoneToast from "./components/MilestoneToast";
import CelebrationOverlay from "./components/CelebrationOverlay";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import Header from "./components/Header";
import TimerSection from "./components/TimerSection";
import StatsGrid from "./components/StatsGrid";
import QuoteSection from "./components/QuoteSection";
import DayTypeCard from "./components/DayTypeCard";
import LessonCards from "./components/LessonCards";
import CancelledSection from "./components/CancelledSection";
import ExcuseSection from "./components/ExcuseSection";
import ParkourSection from "./components/ParkourSection";
import ScheduleTimeline from "./components/ScheduleTimeline";

/**
 * Determines the Feierabend time for the current day in minutes since midnight.
 *
 * - **Weekend**: returns `currentMin` so the countdown is always at zero.
 * - **Work day**: returns {@link WORK_DAY_END_MIN} (16:00).
 * - **School day with lessons**: returns the end time of the last non-cancelled
 *   lesson.
 * - **School day without lessons**: falls back to {@link WORK_DAY_END_MIN}.
 *
 * @param lessons    - Today's lesson list (may be empty).
 * @param dayInfo    - Derived day-type information.
 * @param currentMin - Current time as minutes since midnight.
 */
function getFeierabendTime(
  lessons: Lesson[],
  dayInfo: DayInfo,
  currentMin: number,
): number {
  if (dayInfo.isWeekend) return currentMin;
  if (dayInfo.isWorkDay) return WORK_DAY_END_MIN;
  if (!lessons || lessons.length === 0) return WORK_DAY_END_MIN;
  const nonCancelled = lessons.filter((l) => !l.cancelled);
  if (nonCancelled.length === 0) return WORK_DAY_END_MIN;
  return Math.max(...nonCancelled.map((l) => l.endMin));
}

/**
 * Root application component.
 *
 * Orchestrates all hooks and passes derived state down to the individual
 * section components. The component tree is intentionally flat at this level
 * to make it easy to rearrange, add, or remove sections.
 *
 * **Adding a new section:**
 * 1. Create the component in `src/components/`.
 * 2. Import it here.
 * 3. Add it inside the `{!loading && !error && (...)}` block.
 */
function App() {
  const dayInfo = useDayInfo();
  const { data: timetableData, loading, error, refetch } = useTimetable();
  const now = useTimer();
  const { soundEnabled, toggleSound } = useSound();
  const [isCelebrating, setIsCelebrating] = useState(false);
  const celebrationTriggeredRef = useRef(false);

  const lessons = timetableData?.lessons ?? [];
  const hasLessons = lessons.filter((l) => !l.cancelled).length > 0;
  const currentMin = getCurrentMinutes(now);
  const feierabendMin = getFeierabendTime(lessons, dayInfo, currentMin);
  const secondsLeft = getSecondsUntil(feierabendMin, now);
  const minutesLeft = feierabendMin - currentMin;
  const totalMinutes = feierabendMin - DAY_START_MIN;

  const { activeMilestone, dismissMilestone } = useMilestones(
    minutesLeft,
    soundEnabled,
  );

  useEffect(() => {
    if (
      !loading &&
      !error &&
      secondsLeft <= 0 &&
      !celebrationTriggeredRef.current
    ) {
      celebrationTriggeredRef.current = true;
      setIsCelebrating(true);
    }
  }, [secondsLeft, loading, error]);

  useEffect(() => {
    if (dayInfo.debugMode) {
      document.body.classList.add("debug-mode");
    }
    return () => document.body.classList.remove("debug-mode");
  }, [dayInfo.debugMode]);

  const currentLesson = getCurrentLesson(lessons, currentMin);
  const nextLesson = getNextLesson(lessons, currentMin);
  const cancelledLessons = getCancelledLessons(lessons);
  const { replacements, cancelledWithReplacement } =
    findReplacementLessons(lessons);

  return (
    <>
      <DebugBanner
        mode={dayInfo.debugParams.mode}
        week={dayInfo.debugParams.week}
      />
      <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
      {!loading && !error && (
        <Mascot minutesLeft={minutesLeft} totalMinutes={totalMinutes} />
      )}
      <MilestoneToast
        milestone={activeMilestone}
        onDismiss={dismissMilestone}
      />
      <Background />
      <CelebrationOverlay active={isCelebrating} soundEnabled={soundEnabled} />

      <div className="container">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState onRetry={refetch} />}
        {!loading && !error && (
          <>
            <Header now={now} />
            <TimerSection
              secondsLeft={secondsLeft}
              feierabendMin={feierabendMin}
              dayInfo={dayInfo}
              hasLessons={hasLessons}
              now={now}
            />
            <StatsGrid
              lessons={lessons}
              currentMin={currentMin}
              feierabendMin={feierabendMin}
            />
            <QuoteSection minutesLeft={minutesLeft} />
            <DayTypeCard dayInfo={dayInfo} />
            <LessonCards
              currentLesson={currentLesson}
              nextLesson={nextLesson}
              currentMin={currentMin}
            />
            <CancelledSection
              cancelled={cancelledLessons}
              cancelledWithReplacement={cancelledWithReplacement}
            />
            <ExcuseSection />
            <ParkourSection />
            <ScheduleTimeline
              lessons={lessons}
              currentMin={currentMin}
              dayInfo={dayInfo}
              replacements={replacements}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
