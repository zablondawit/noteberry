import { EditorContainer } from "@/components/organisms/editor/editor-container";
import { HeaderBar } from "@/components/organisms/header-bar";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useMemo, useState } from "react";
import { mainStyle } from "./app.css";
import { db, type Note } from "./store/db";
import { NoteRepositoryLive } from "./store/notes";
import { useUIStore } from "./store/ui";

// The active note ID is used to determine which note to display in the editor
// Currently just use one note, so we hardcode the ID to 1
const ACTIVE_NOTE_ID = 1;

const App = () => {
  const [editorContent] = useState<Note["content"]>("");
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
  const { resultOpen, toggleResult, editorLayout, setEditorLayout } =
    useUIStore();

  return (
    <main className={mainStyle}>
      {/*<NoteSelectPanel onNoteSelect={onNoteSelect} notes={notes} />*/}
      <HeaderBar
        resultOpen={resultOpen}
        onResultBtnClick={toggleResult}
        onSettingsBtnClick={console.log}
      />
      <EditorContainer
        expandSidebar={resultOpen}
        activeNote={activeNote}
        onChange={handleOnChange}
        value={editorContent}
        onLayoutChange={setEditorLayout}
        defaultLayout={editorLayout}
      />
    </main>
  );
};

export default App;
