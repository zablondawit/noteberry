import { EditorView } from "@codemirror/view";
import { fail, ok, type Result } from "../../types/result";
import { create, all, type ConfigOptions } from "mathjs";
import { pipe } from "ramda";

const LOG_OUTPUT = false;

const mathConfig = {} as const satisfies ConfigOptions;
const math = create(all, mathConfig);
const parser = math.parser();

type LineCtx = {
  input: string;
};
type LineData = {
  output: string;
} & LineCtx;
type LineResult = Result<LineData, LineCtx>;

type LinePipeFn = (lineDataList: LineData[]) => LineData[];

const evalLine = (input: string): LineResult => {
  try {
    const evaluated: number = parser.evaluate(input);

    switch (typeof evaluated) {
      case "number":
        return ok({
          input: input,
          output: `${evaluated}`,
        });
      default:
        return ok({
          input: input,
          output: ``,
        });
    }
  } catch (err) {
    return fail(
      "not calculable",
      {
        type: "UNEXPECTED",
        message: "not calculable",
        cause: err,
      },
      {
        input: input,
      },
    );
  }
};

/**
 * This extension listens for changes in the source editor and evaluates the content of each line.
 * If all lines are evaluated successfully, it updates the target editor with the evaluated content.
 * If any line fails to evaluate, it logs an error and does not update the target editor.
 *
 * @param targetEditor - The EditorView instance of the target editor where evaluated results will be displayed.
 */
export const mathResultsInEditor = (targetEditor: EditorView) =>
  EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      // Get Lines
      const { doc } = update.state;
      const rawText = doc.toString();
      const lines = rawText.split("\n");

      /**
       * Clears the failed evaluation result and returns a LineData object.
       * Used for mapping over the evaluated line results to ensure that even failed evaluations have a consistent structure.
       */
      function clearFailed(result: LineResult): LineData {
        // try to grab real input value
        return result.success
          ? result.data
          : { input: result.ctx?.input || "input not understood", output: "" };
      }
      const transformEmptyInput: LinePipeFn = (lineDataList) =>
        lineDataList.map((data) =>
          data.input === "" ? { ...data, output: "" } : data,
        );
      const cleanUndefined: LinePipeFn = (lineDataList) => {
        return lineDataList.map((data) => {
          const UNDEFINED_RESULT = "undefined";

          return data.output === UNDEFINED_RESULT
            ? { ...data, output: "" }
            : data;
        });
      };
      function toString(lineDataList: LineData[]): string[] {
        return lineDataList.map((data) => data.output);
      }
      function joinLines(lines: string[]) {
        return lines.join("\n");
      }

      const evaluateLines = pipe(
        (lines: string[]) => lines.map(evalLine),
        (results) => results.map(clearFailed),
      );
      const pipeLineData = pipe(
        transformEmptyInput,
        cleanUndefined,
        toString,
        joinLines,
      );

      const evaluatedResult = evaluateLines(lines);
      const outText = pipeLineData(evaluatedResult);

      LOG_OUTPUT &&
        console.log({
          lines,
          freshText: rawText,
          text: rawText,
          evaluatedText: evaluatedResult,
          outText,
        });

      // updated mirrored editor content with evaluated result
      targetEditor.dispatch({
        changes: {
          from: 0,
          to: targetEditor.state.doc.length,
          insert: outText,
        },
      });
    }
  });
