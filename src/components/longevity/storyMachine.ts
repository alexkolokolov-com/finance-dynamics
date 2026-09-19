export type StoryPhase = "idle" | "exit" | "swap-hidden" | "enter" | "hold";

export type StoryState = {
  index: number;
  targetIndex: number;
  direction: -1 | 1;
  phase: StoryPhase;
  started: boolean;
};

export type StoryAction =
  | { type: "BEGIN_INITIAL" }
  | { type: "GO_TO"; index: number; maxIndex: number }
  | { type: "EXIT_DONE" }
  | { type: "FRAME_READY" }
  | { type: "ENTER_DONE" }
  | { type: "HOLD_DONE" };

export const initialStoryState: StoryState = {
  index: 0,
  targetIndex: 0,
  direction: 1,
  phase: "idle",
  started: false,
};

export const storyReducer = (state: StoryState, action: StoryAction): StoryState => {
  if (action.type === "BEGIN_INITIAL") {
    if (state.started) return state;
    return { ...state, phase: "swap-hidden", started: true };
  }

  if (action.type === "GO_TO") {
    if (!state.started || state.phase !== "idle") return state;
    const targetIndex = Math.min(Math.max(action.index, 0), action.maxIndex);
    if (targetIndex === state.index) return state;
    return {
      ...state,
      targetIndex,
      direction: targetIndex > state.index ? 1 : -1,
      phase: "exit",
    };
  }

  if (action.type === "EXIT_DONE" && state.phase === "exit") {
    return { ...state, index: state.targetIndex, phase: "swap-hidden" };
  }
  if (action.type === "FRAME_READY" && state.phase === "swap-hidden") {
    return { ...state, phase: "enter" };
  }
  if (action.type === "ENTER_DONE" && state.phase === "enter") {
    return { ...state, phase: "hold" };
  }
  if (action.type === "HOLD_DONE" && state.phase === "hold") {
    return { ...state, phase: "idle" };
  }
  return state;
};