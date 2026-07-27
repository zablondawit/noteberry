import { EditorView } from "@codemirror/view"

export const syncEditors = (editor: EditorView) => EditorView.updateListener.of((refEditorUpdate) => {
  if (refEditorUpdate.docChanged) {
    // This is the text coming in from the editor that was changed, we want to update all other editors with this text
    const text = refEditorUpdate.state.doc.toString()

    editor.dispatch({
      changes: {
        from: 0,
        to: editor.state.doc.length,
        insert: text
      }
    })
  }
})
