import React from "react";
import {
  TIME_BREAK,
  TIME_FOCUS,
  TimerState,
  useTimer,
} from "../hooks/use-timer";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const Button = ({ children, ...props }) => {
  return (
    <span style={{ cursor: "pointer", fontSize: "36px" }} {...props}>
      {children}
    </span>
  );
};

const TimerIcon = ({ mode }) => {
  return (
    <span style={{ cursor: "default" }}>
      {mode === TIME_FOCUS && <span title="Focus time!">👷‍♂️</span>}
      {mode === TIME_BREAK && <span title="Break time!">😎</span>}
    </span>
  );
};

export const Timer = () => {
  const [state, { startTimer, stopTimer }] = useTimer({
    isRunning: false,
    timerMode: TIME_FOCUS,

    focusTime: 7,
    breakTime: 3,
    time: 7,
  });

  const chronometer = formatTime(state.time);

  return (
    <div>
      <h1>
        Timer: {chronometer} <TimerIcon mode={state.timerMode} />
      </h1>

      {!state.isRunning && <Button onClick={startTimer}>▶️</Button>}
      {state.isRunning && <Button onClick={stopTimer}>⏹</Button>}
    </div>
  );
};
