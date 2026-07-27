import { EditorSelection } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

// Lock the update loop to prevent recursive<[fim-middle]> selection updates
let isSyncing = false;
export const syncActiveLine = (editor: EditorView) =>
  EditorView.updateListener.of((update) => {
    // Guard clause: Exit if the update loop was initiated by this listener
    if (isSyncing) return;

    // Process only when the selection parameters change (clicks, keyboard navigation, dragging)
    if (update.selectionSet) {
      isSyncing = true;

      const leftSelection = update.state.selection;

      // Get the line number from the left editor's selection
      const leftLineNumber = update.state.doc.lineAt(
        leftSelection.main.head,
      ).number;

      // Get the total number of lines in both documents
      const rightDocLines = editor.state.doc.lines;

      // Clamp the line number to ensure it exists in the right editor
      const clampedLineNumber = Math.max(
        1,
        Math.min(leftLineNumber, rightDocLines),
      );

      // Get the character position at the start of that line in the right editor
      const rightLine = editor.state.doc.line(clampedLineNumber);
      const rightPosition = rightLine.from;

      editor.dispatch({
        selection: EditorSelection.single(rightPosition),
      });

      isSyncing = false;
    }
  });
