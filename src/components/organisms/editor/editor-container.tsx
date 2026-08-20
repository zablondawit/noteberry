import { mathResultsInEditor } from "@/lib/extensions/math";
import { syncScroll } from "@/lib/extensions/sync-scroll";
import { syncActiveLine } from "@/lib/extensions/sync-selection";
import { cn } from "@/lib/utils";
import type { Note } from "@/store/db";
import type {
  EditorView,
  Extension,
  ReactCodeMirrorRef,
} from "@uiw/react-codemirror";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ResizableContainer,
  type ResizableContainerProps,
} from "../../layout/resizable-panes";
import { Editor } from "./editor";
import styles from "./editor-container.module.css";
import { extensions } from "./extensions";
import { useUIStore } from "@/store/ui";
import { setScrollbarHide } from "@/lib/extensions/hide-scrollbar";

type EditorContainerProps = {
  value: Note["content"];
  onChange: (data: string) => Promise<void>;
  activeNote?: Note;
} & Pick<
  ResizableContainerProps,
  "expandSidebar" | "defaultLayout" | "onLayoutChange"
>;
export const EditorContainer = (props: EditorContainerProps) => {
  const {
    value,
    activeNote,
    onChange,
    expandSidebar,
    onLayoutChange,
    defaultLayout,
  } = props;
  const [content, setEditorContent] = useState<Note["content"]>(value);

  const mainEditorRef = useRef<EditorView>(null);
  const mirrorEditorRef = useRef<EditorView>(null);
  const [editorsReady, setEditorsReady] = useState(false);
  const [editorExtensions, setEditorExtensions] = useState<Extension[]>(
    extensions.editor,
  );
  const [mirroredExtensions, _setMirroredExtensions] = useState<Extension[]>(
    extensions.mirror,
  );

  useEffect(() => {
    const leftEditor = mainEditorRef.current;
    const rightEditor = mirrorEditorRef.current;
    if (!(editorsReady && rightEditor && leftEditor)) return;

    setEditorExtensions((exts) => [
      ...exts,
      mathResultsInEditor(rightEditor),
      syncActiveLine(rightEditor),
      syncScroll(rightEditor),
    ]);
  }, [editorsReady]);

  // Load the active note's content into the editor on load
  useEffect(() => {
    if (!editorsReady) return;
    if (!activeNote) return;

    setEditorContent(activeNote.content);
  }, [activeNote]);

  // Use this effect to do something when both editors are ready
  useEffect(() => {
    const mainEditor = mainEditorRef.current;
    const mirrorEditor = mirrorEditorRef.current;
    if (!(editorsReady && mirrorEditor && mainEditor)) return;

    setEditorExtensions((exts) => [
      ...exts,
      mathResultsInEditor(mirrorEditor),
      syncActiveLine(mirrorEditor),
      syncScroll(mirrorEditor),
    ]);

    return useUIStore.subscribe(({ resultOpen }) => {
      setScrollbarHide(mainEditor, resultOpen);
    });
  }, [editorsReady]);

  const editorRef = useCallback((instance: ReactCodeMirrorRef) => {
    if (instance === null || !instance.view) return;

    instance.view.focus();
  }, []);
  const handleCollapseChange = useCallback((collapsed: boolean) => {
    useUIStore.setState({ resultOpen: !collapsed });
  }, []);

  return (
    <ResizableContainer
      defaultLayout={defaultLayout}
      expandSidebar={expandSidebar}
      onLayoutChange={onLayoutChange}
      onCollapsedChange={handleCollapseChange}
      leftPane={
        <Editor
          //@ts-ignore should work fine
          ref={editorRef}
          //@ts-ignore It's fine, just async which can possibly cause issues like race conditions and stale state
          // FIXME: ^
          onChange={onChange}
          value={content}
          extensions={editorExtensions}
          id="e-left"
          onCreateEditor={(editor) => {
            mainEditorRef.current = editor;
            // Check if both editors are ready
            if (mirrorEditorRef.current) setEditorsReady(true);
          }}
          className={cn([styles.editor])}
        />
      }
      rightPane={
        <Editor
          readOnly
          className={cn([styles.editor])}
          onCreateEditor={(editor) => {
            mirrorEditorRef.current = editor;
            if (mainEditorRef.current) setEditorsReady(true);
          }}
          extensions={mirroredExtensions}
          id="e-right"
        />
      }
    />
  );
};
