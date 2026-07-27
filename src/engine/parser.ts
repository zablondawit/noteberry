/**
 * This is a line by line parser that categorizes each line as either
 *
 * - a math expression
 * - a function call (e.g. `sin(pi/2)`)
 * - a function definition start (e.g. `function name(...args[]) {`)
 * - a function definition end (e.g. `}`)
 * - a directive (e.g. `:sum`, `:avg`, `:clear`, `:min`, `:max`)
 * - a variable assignment (e.g. `x = 5`), by evaluating the expression on the right-hand side or calling a function
 * - a comment
 * - a blank line (can't be evaluated)
 *
 * NOTE: Function definitions are parsed as regular JavaScript function definitions, so they must be valid JavaScript function definitions.
 *
 * There is one thing to note here
 */
import { parse } from "mathjs";
import {} from "mathjs";

const tokenTypes = [
  "math",
  "functionCall",
  "functionDefinitionStart",
  "functionDefinitionEnd",
  "directive",
  "variableAssignment",
  "blank",
] as const;
export type TokenType = (typeof tokenTypes)[number];
export type Token = {
  type: TokenType;
  raw: string;
};

function isBlank(input: string): boolean {
  const line = input.trim();

  // empty
  if (!line.length) return true;

  const firstLine = line[0];
  if (firstLine === "#") return true;

  return false;
}

function isMath(input: string): boolean {
  try {
    parse(input);
    return true;
  } catch {
    return false;
  }
}

type Matcher = {
  type: TokenType;
  match: (line: string) => boolean;
};

// Define them in order of precedence (most specific first)
const matchers = [
  {
    type: "blank",
    match: isBlank,
  },
  {
    type: "math",
    match: isMath,
  },
] satisfies Matcher[];

// provides categories for each line
export function matchLine(line: string): TokenType {
  for (const matcher of matchers) {
    if (matcher.match(line)) {
      return matcher.type;
    }
  }

  return "blank";
}
