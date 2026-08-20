import { EditorView, keymap } from "@uiw/react-codemirror";
import type { Extension } from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import {
  lineNumbers,
  drawSelection,
  highlightActiveLine,
} from "@codemirror/view";
import { closeBrackets } from "@codemirror/autocomplete";
import { bracketMatching } from "@codemirror/language";

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

export const commonExtensions = [highlightActiveLine()] as const as Extension[];
export const extensions = {
  editor: [
    ...commonExtensions,
    vim(),
    lineNumbers(),
    history(),
    closeBrackets(),
    bracketMatching(),
    // syncExtension,
    drawSelection(),
    hideScrollbar(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
  ],
  mirror: [
    ...commonExtensions,
    EditorView.editable.of(false),
    // [syncScroll(leftEditor)],
  ],
} as const as Record<"editor" | "mirror", Extension[]>;
