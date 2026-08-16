import { closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import { faker } from "@faker-js/faker";
import { vim } from "@replit/codemirror-vim";
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  keymap,
  lineNumbers,
  type Extension,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./app.css";
import { containerStyle, editorContainerStyles, mainStyle } from "./app.css";
import { Editor } from "./components/editor/editor";
import { NoteSelectPanel } from "./components/panel/note-selector";
import { mathResultsInEditor } from "./lib/extensions/math";
import { syncScroll } from "./lib/extensions/sync-scroll";
import { syncActiveLine } from "./lib/extensions/sync-selection";
import { db, type Note } from "./store/db";
import { NoteRepositoryLive } from "./store/notes";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

const commonExtensions: Extension[] = [
  // basicSetup,
  highlightActiveLine(),
];

// Dummy Notes
const notes: Note[] = Array.from({ length: 10 }).map((_, idx) => {
  return {
    id: idx,
    title: faker.lorem.words({ max: 4, min: 2 }),
    content: faker.number.int({ min: 1, max: 1000 }).toString(),
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

const extensions = {
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
  ],
  right: [
    ...commonExtensions,
    EditorView.editable.of(false),
    // [syncScroll(leftEditor)],
  ],
} as const as Record<"right" | "left", Extension[]>;

// The active note ID is used to determine which note to display in the editor
// Currently just use one note, so we hardcode the ID to 1
const ACTIVE_NOTE_ID = 1;

function App() {
  const leftEditorRef = useRef<EditorView>(null);
  const rightEditorRef = useRef<EditorView>(null);
  const [editorsReady, setEditorsReady] = useState(false);
  const [editorExtensions, setEditorExtensions] = useState<Extension[]>(
    extensions.left,
  );
  const [mirroredExtensions, _setMirroredExtensions] = useState<Extension[]>(
    extensions.right,
  );
  const [editorContent, setEditorContent] = useState<Note["content"]>("");
  const noteRepo = useMemo(
    () =>
      new NoteRepositoryLive({
        db,
      }),
    [db],
  );
  const activeNote = useLiveQuery(() =>
    noteRepo.find("id", ACTIVE_NOTE_ID).then((n) => {
      if (!n.success || !n.data) {
        return undefined;
      }

      return n.data;
    }),
  );

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
  const handleOnChange = useCallback(async (data: string) => {
    const activeNote = await noteRepo.find("id", ACTIVE_NOTE_ID);
    if (!activeNote.success) {
      if (activeNote.error?.type == "RESOURCE_NOT_FOUND") {
        await noteRepo.add({
          content: data,
          id: ACTIVE_NOTE_ID,
          tags: [],
          title: "Active Note",
          updatedAt: new Date().getTime(),
        });
      }
      return;
    }

    await noteRepo.update(ACTIVE_NOTE_ID, {
      ...activeNote.data,
      content: data,
    });
  }, []);

  // Use this effect to do something when both editors are ready
  useEffect(() => {
    const leftEditor = leftEditorRef.current;
    const rightEditor = rightEditorRef.current;
    if (!(editorsReady && rightEditor && leftEditor)) return;

    setEditorExtensions((exts) => [
      ...exts,
      mathResultsInEditor(rightEditor),
      syncActiveLine(rightEditor),
      syncScroll(rightEditor),
    ]);
  }, [editorsReady]);

  const onNoteSelect = (note: Note) => {
    console.info(note);
    if (!editorsReady) return;

    setEditorContent(note.content);
  };

  // Load the active note's content into the editor on load
  useEffect(() => {
    if (!editorsReady) return;
    if (!activeNote) return;

    setEditorContent(activeNote.content);
  }, [activeNote]);

  return (
    <main className={mainStyle}>
      {/*<NoteSelectPanel onNoteSelect={onNoteSelect} notes={notes} />*/}

      <header className={"border-b border-b-mist-500"}>
        <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer">
          <MenuIcon />
        </Button>
      </header>

      <section className={editorContainerStyles}>
        <div className={containerStyle}>
          <Editor
            //@ts-ignore It's fine, just async which can possibly cause issues like race conditions and stale state
            // FIXME: ^
            onChange={handleOnChange}
            value={editorContent}
            onCreateEditor={leftOnCreate}
            extensions={editorExtensions}
            id="e-left"
          />
        </div>
        <div className={containerStyle}>
          <Editor
            readOnly
            onCreateEditor={rightOnCreate}
            extensions={mirroredExtensions}
            id="e-right"
          />
        </div>
      </section>
    </main>
  );
}

export default App;
