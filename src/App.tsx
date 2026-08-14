import { closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import { vim } from "@replit/codemirror-vim";
import {
  drawSelection,
  EditorState,
  EditorView,
  highlightActiveLine,
  keymap,
  lineNumbers,
  type Extension,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { useCallback, useEffect, useRef, useState } from "react";
import "./app.css";
import { containerStyle, mainStyle } from "./app.css";
import { Editor } from "./components/editor/editor";
import { headerBar } from "./lib/editor/panels";
import { mathResultsInEditor } from "./lib/extensions/math";
import { syncActiveLine } from "./lib/extensions/sync-selection";
import { syncScroll } from "./lib/extensions/sync-scroll";
import { NoteSelectPanel } from "./components/panel/note-selector";
import type { Note } from "./store/db";
import { faker } from "@faker-js/faker";

const commonExtensions: Extension[] = [
  // basicSetup,
  highlightActiveLine(),
];

// Dummy Notes
const notes: Note[] = Array.from({ length: 10 }).map((_, idx) => {
  return {
    id: idx,
    title: faker.lorem.words({ max: 4, min: 2 }),
    content: faker.lorem.paragraphs({ max: 3, min: 1 }),
    tags: faker.helpers.arrayElements(
      ["tag1", "tag2", "tag3", "tag4", "tag5"],
      {
        min: 0,
        max: 3,
      },
    ),
    updatedAt: faker.date.recent().getTime(),
  };
});

const extensions: { right: Extension[]; left: Extension[] } = {
  left: [
    ...commonExtensions,
    vim(),
    lineNumbers(),
    history(),
    closeBrackets(),
    bracketMatching(),
    // syncExtension,
    drawSelection(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    headerBar("Editor"),
  ],
  right: [
    ...commonExtensions,
    EditorView.editable.of(false),
    // [syncScroll(leftEditor)],
    headerBar("Results"),
  ],
} as const;

function App() {
  const leftEditorRef = useRef<EditorView>(null);
  const rightEditorRef = useRef<EditorView>(null);
  const [editorsReady, setEditorsReady] = useState(false);

  const rightOnCreate = useCallback<
    NonNullable<ReactCodeMirrorProps["onCreateEditor"]>
  >((leftEditor) => {
    rightEditorRef.current = leftEditor;
    // Check if both editors are ready
    if (leftEditorRef.current) {
      setEditorsReady(true);
    }
  }, []);

  const leftOnCreate = useCallback<
    NonNullable<ReactCodeMirrorProps["onCreateEditor"]>
  >((view) => {
    leftEditorRef.current = view;

    // Check if both editors are ready
    if (rightEditorRef.current) {
      setEditorsReady(true);
    }
  }, []);

  // Use this effect to do something when both editors are ready
  useEffect(() => {
    const leftEditor = leftEditorRef.current;
    const rightEditor = rightEditorRef.current;
    if (!(editorsReady && rightEditor && leftEditor)) return;

    leftEditor.setState(
      EditorState.create({
        doc: "",
        extensions: [
          ...extensions.left,
          mathResultsInEditor(rightEditor),
          syncActiveLine(rightEditor),
          syncScroll(rightEditor),
        ],
      }),
    );
  }, [editorsReady]);

  return (
    <main className={mainStyle}>
      <NoteSelectPanel notes={notes} />

      <div className={containerStyle}>
        <Editor
          onCreateEditor={leftOnCreate}
          extensions={extensions.left}
          id="e-left"
        />
      </div>
      <div className={containerStyle}>
        <Editor
          readOnly
          onCreateEditor={rightOnCreate}
          extensions={extensions.right}
          id="e-right"
        />
      </div>
    </main>
  );
}

export default App;
