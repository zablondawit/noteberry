import { describe, it } from "vitest";
import { create, all, type ConfigOptions } from "mathjs";
import { Result, tryCatch } from "../src/types/result";
import dedent from "dedent";

describe("parser - playground", () => {
  const config = {
    number: "number",
  } as const satisfies ConfigOptions;
  const math = create(all, config);

  it("main", () => {
    const lines = ["x = 12", "y = 13", "sum(x,y)=x +y"] as const;
    const parser = math.parser();

    const ast = lines.map((line, lineIdx) =>
      tryCatch(() => parser.evaluate(line), `failed to eval line ${lineIdx}`),
    );

    const y = parser.get("y");
    const x = parser.get("x");
    const sum = parser.get("sum");

    console.log({
      lines: lines.join("\n"),
      astResult: ast,
      x,
      y,
      sum: sum(x, y),
    });

    const data = parser.getAllAsMap();
    console.log({ data });

    // Checking type
    const checks = {
      sum: math.isFunction(sum),
      sum_params: sum.signatures,
    } as const;

    console.log(checks);

    parser.clear(); // clearing

    const multiLineFunction = dedent`
      f(x) = x * 2
      g(x, y) = x + y
    `;

    parser.evaluate(multiLineFunction);

    const f = parser.get("f");
    const g = parser.get("g");

    console.log({ f, g, all: parser.getAll() });
  });
});
