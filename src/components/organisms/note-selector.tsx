import clsx from "clsx";
import "./note-selector.css";
import type { HTMLAttributes, PropsWithChildren } from "react";
import type { Note } from "@/store/db";

type NoteSelectPanelProps = {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
};
export const NoteSelectPanel = (
  props: PropsWithChildren<NoteSelectPanelProps>,
) => {
  const { notes, onNoteSelect } = props;
  // toggle the panel
  const handleToggle = () => {
    const panel = document.querySelector(".note-selector");
    if (panel) {
      panel.classList.toggle("note-selector__collapsed");
    }
  };

  const handleNoteSelect = (note: Note) => {
    onNoteSelect(note);
  };

  // Change the classname to "sidebar", as the sidebar makes more sense for the note selector panel
  return (
    <div className={clsx(["note-selector"])}>
      <span className={clsx(["note-selector__header"])}>
        <input type="text" />
        <button
          onClick={handleToggle}
          className={clsx(["note-selector__btn-toggle"])}
        >
          t
        </button>
      </span>

      <ul className="note-selector__content">
        {notes.map((note) => (
          <NoteItem
            onClick={() => handleNoteSelect(note)}
            key={note.id}
            note={note}
          />
        ))}
      </ul>
    </div>
  );
};

type NoteItemProps = {
  note: Note;
} & HTMLAttributes<HTMLLIElement>;
export const NoteItem = (props: NoteItemProps) => {
  const { note, ...rest } = props;
  return <li {...rest}>{note.title}</li>;
};
