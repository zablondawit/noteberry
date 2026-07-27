import { describe, it, expect } from "vitest";
import { type TokenType, matchLine } from "../parser";

describe("engine/parser", () => {
  describe("categorizeLine", () => {
    type TestCase = {
      input: string;
      expected: TokenType;
      testcase: string;
    };
    const testCases: TestCase[] = [
      {
        input: "1 + 1",
        expected: "math",
        testcase: "a math line",
      },
      {
        input: "",
        expected: "blank",
        testcase: "an empty line as blank",
      },
      {
        input: "# 1 + 1",
        expected: "blank",
        testcase: "a comment as blank",
      },
    ];

    it.each<TestCase>(testCases)(
      "should categorize $testcase",
      ({ input, expected }) => {
        expect(matchLine(input)).toBe(expected);
      },
    );
  });
});
