/**
 * @author Zablon Dawit <zablon@qebero.dev>
 * @license Apache-2.0
 *
 * The purpose of this extension is to have one scrollbar
 * visible on the main view, even though it functionally hides
 * one scrollbar when two editors are present the aim to correctly
 * show one scrollbar as it should be.
 */
import type { Extension } from "@codemirror/state";
import { EditorView } from "codemirror";

/**
 * CodeMirror extension to hide scrollbars while maintaining scroll functionality.
 */
export function hideScrollbar(): Extension {
  return EditorView.theme({
    ".cm-scroller": {
      scrollbarWidth: "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
}
