import { EditorView } from "@codemirror/view";

export const syncScroll = (mirrorEditor: EditorView) =>
  EditorView.updateListener.of((refEditorUpdate) => {
    const mainEditor = refEditorUpdate.view;
    const mainEditorScroll = mainEditor.scrollDOM;
    const mirrorEditorScroll = mirrorEditor.scrollDOM;

    mainEditorScroll.addEventListener("scroll", () => {
      mirrorEditorScroll.scrollTop = mainEditorScroll.scrollTop;
      mirrorEditorScroll.scrollLeft = mainEditorScroll.scrollLeft;
    });
  });
