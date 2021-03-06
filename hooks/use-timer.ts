import { useEffect, useState } from "react";

export const TIME_FOCUS = "TIME_FOCUS";
export const TIME_BREAK = "TIME_BREAK";

export type TimerMode = "TIME_FOCUS" | "TIME_BREAK";

export type TimerState = {
  isRunning: boolean;
  timerMode: TimerMode;

  focusTime: number;
  breakTime: number;
  time: number;

  _i?: NodeJS.Timeout;
};

const DEFAULT_INITIAL_STATE: TimerState = {
  isRunning: false,
  timerMode: TIME_FOCUS,

  focusTime: 1500,
  breakTime: 300,
  time: 1500,
};

export const useTimer = (initialState: TimerState = DEFAULT_INITIAL_STATE) => {
  const [state, setState]: [TimerState, Function] = useState(initialState);

  // Utils
  const updateState = (newState: Partial<TimerState>) => {
    setState({ ...state, ...newState });
  };
  const tick = () => {
    updateState({ time: state.time - 1 });
  };

  const startTimer = () => {
    if (state.isRunning) return;

    const time = updateState({
      isRunning: true,
      timerMode: TIME_FOCUS,
      time: state.focusTime,
    } as TimerState);
  };
  const stopTimer = () => {
    if (!state.isRunning && !state.timerMode) return;

    updateState({
      isRunning: false,
      timerMode: TIME_FOCUS,
      time: state.focusTime,
    } as TimerState);
  };

  useEffect(() => {
    if (state.isRunning) {
      tick();
    } else {
      clearTimeout(state._i);
    }

    return () => clearTimeout(state._i);
  }, [state.isRunning]);

  useEffect(() => {
    if (!state.isRunning) return;

    if (state.time >= 0) {
      const _i = setTimeout(tick, 1000);
      updateState({ _i });
    } else {
      const newTimerMode =
        state.timerMode === "TIME_FOCUS" ? "TIME_BREAK" : "TIME_FOCUS";
      updateState({
        timerMode: newTimerMode,
        time: newTimerMode === "TIME_FOCUS" ? state.focusTime : state.breakTime,
      });
    }
  }, [state.time]);

  return [
    state,
    {
      startTimer,
      stopTimer,
    },
  ] as [TimerState, any];
};
