//@ts-ignore works fine for some reason
import { basicSetup } from "codemirror";
import { vim } from "@replit/codemirror-vim";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
} from "@codemirror/view";
import { EditorState, type Extension } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { closeBrackets } from "@codemirror/autocomplete";
import { bracketMatching } from "@codemirror/language";
import { drawSelection } from "@codemirror/view";

import { headerBar } from "./editor/panels";
import { mathResultsInEditor } from "./extensions/math";
import { syncScroll } from "./extensions/sync-scroll";
import { syncActiveLine } from "./extensions/sync-selection";

const commonExtensions: Extension = [
  // basicSetup,
  highlightActiveLine(),
];

const leftEditorContainer = document.querySelector("#e-left");
const rightEditorContainer = document.querySelector("#e-right");

if (!leftEditorContainer || !rightEditorContainer) {
  throw new Error("Editor containers not found");
}

const rightEditor = new EditorView({
  state: EditorState.create({}),
  parent: rightEditorContainer,
});

const leftEditor = new EditorView({
  state: EditorState.create({
    doc: "",
    extensions: [
      ...commonExtensions,
      vim(),
      lineNumbers(),
      history(),
      closeBrackets(),
      bracketMatching(),
      // syncExtension,
      mathResultsInEditor(rightEditor),
      syncScroll(rightEditor),
      syncActiveLine(rightEditor),
      drawSelection(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      headerBar("Editor"),
    ],
  }),
  parent: leftEditorContainer,
});

// syncScroll from right editor to left editor
rightEditor.setState(
  EditorState.create({
    doc: "",
    extensions: [
      ...commonExtensions,
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
      [syncScroll(leftEditor)],
      headerBar("Results"),
    ],
  }),
);
