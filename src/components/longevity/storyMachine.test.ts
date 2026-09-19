import { describe, expect, it } from "vitest";
import { initialStoryState, storyReducer, type StoryState } from "./storyMachine";

const started = (): StoryState => ({ ...initialStoryState, started: true });

describe("storyReducer", () => {
  it("runs one chapter through every animation phase", () => {
    let state = storyReducer(started(), { type: "GO_TO", index: 1, maxIndex: 3 });
    expect(state).toMatchObject({ index: 0, targetIndex: 1, phase: "exit" });
    state = storyReducer(state, { type: "EXIT_DONE" });
    expect(state).toMatchObject({ index: 1, phase: "swap-hidden" });
    state = storyReducer(state, { type: "FRAME_READY" });
    expect(state.phase).toBe("enter");
    state = storyReducer(state, { type: "ENTER_DONE" });
    expect(state.phase).toBe("hold");
    state = storyReducer(state, { type: "HOLD_DONE" });
    expect(state.phase).toBe("idle");
  });

  it("ignores repeated input until the hold phase ends", () => {
    const exiting = storyReducer(started(), { type: "GO_TO", index: 1, maxIndex: 3 });
    expect(storyReducer(exiting, { type: "GO_TO", index: 2, maxIndex: 3 })).toEqual(exiting);
    const holding = { ...exiting, index: 1, targetIndex: 1, phase: "hold" as const };
    expect(storyReducer(holding, { type: "GO_TO", index: 2, maxIndex: 3 })).toEqual(holding);
  });

  it("clamps boundaries and supports a direct slider target", () => {
    expect(storyReducer(started(), { type: "GO_TO", index: -1, maxIndex: 3 }).phase).toBe("idle");
    const direct = storyReducer(started(), { type: "GO_TO", index: 3, maxIndex: 3 });
    expect(direct).toMatchObject({ targetIndex: 3, direction: 1, phase: "exit" });
    const last = { ...started(), index: 3, targetIndex: 3 };
    expect(storyReducer(last, { type: "GO_TO", index: 4, maxIndex: 3 }).phase).toBe("idle");
  });

  it("starts the first card only once", () => {
    const first = storyReducer(initialStoryState, { type: "BEGIN_INITIAL" });
    expect(first).toMatchObject({ started: true, phase: "swap-hidden", index: 0 });
    expect(storyReducer(first, { type: "BEGIN_INITIAL" })).toEqual(first);
  });
});