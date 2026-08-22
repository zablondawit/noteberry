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
import { hideScrollbar } from "@/lib/extensions/hide-scrollbar";
import { detectDeviceSize, type DeviceType } from "@/lib/device";

export const commonExtensions = [highlightActiveLine()] as const as Extension[];
export const deviceExtensions = {
  desktop: [vim()],
  tablet: [vim()],
  mobile: [],
} as const as Record<DeviceType, Extension[]>;
export const extensions = {
  editor: [
    ...commonExtensions,
    lineNumbers(),
    history(),
    closeBrackets(),
    bracketMatching(),
    // syncExtension,
    drawSelection(),
    hideScrollbar(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    ...deviceExtensions[detectDeviceSize(window)],
  ],
  mirror: [
    ...commonExtensions,
    EditorView.editable.of(false),
    // [syncScroll(leftEditor)],
  ],
} as const as Record<"editor" | "mirror", Extension[]>;
