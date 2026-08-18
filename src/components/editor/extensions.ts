import { EditorView, keymap } from "@uiw/react-codemirror";
import type { Extension } from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { lineNumbers, drawSelection } from "@codemirror/view";
import { closeBrackets } from "@codemirror/autocomplete";
import { bracketMatching } from "@codemirror/language";

export const commonExtensions = [] as const as Extension[];
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
    keymap.of([...defaultKeymap, ...historyKeymap]),
  ],
  mirror: [
    ...commonExtensions,
    EditorView.editable.of(false),
    // [syncScroll(leftEditor)],
  ],
} as const as Record<"editor" | "mirror", Extension[]>;
