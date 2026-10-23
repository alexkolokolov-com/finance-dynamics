import { describe, expect, it } from "vitest";
import { hrQuizQuestions, hrQuizResults, hrQuizMaxScore, resultIndexFor, scoreQuiz } from "@/data/hrWebQuiz";

describe("HR quiz", () => {
  it("has 9 questions with 4 options and max 27 points", () => {
    expect(hrQuizQuestions).toHaveLength(9);
    expect(hrQuizQuestions.every((q) => q.options.length === 4)).toBe(true);
    expect(hrQuizMaxScore).toBe(27);
  });
  it("maps score bands 0–6, 7–13, 14–20, 21–27", () => {
    expect(resultIndexFor(0)).toBe(0);
    expect(resultIndexFor(6)).toBe(0);
    expect(resultIndexFor(7)).toBe(1);
    expect(resultIndexFor(13)).toBe(1);
    expect(resultIndexFor(14)).toBe(2);
    expect(resultIndexFor(20)).toBe(2);
    expect(resultIndexFor(21)).toBe(3);
    expect(resultIndexFor(27)).toBe(3);
    expect(hrQuizResults[3].title).toBe("Системная программа");
  });
  it("best answers give 27", () => {
    const best = hrQuizQuestions.map((q) => q.options.findIndex((o) => o.score === 3));
    expect(scoreQuiz(best)).toBe(27);
  });
});
