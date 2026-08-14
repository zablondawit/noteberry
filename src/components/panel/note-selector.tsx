import clsx from "clsx";
import "./note-selector.css";
import type { PropsWithChildren } from "react";
import type { Note } from "@/store/db";

type NoteSelectPanelProps = {
  notes: Note[];
};
export const NoteSelectPanel = (
  props: PropsWithChildren<NoteSelectPanelProps>,
) => {
  const { notes } = props;
  // toggle the panel
  const handleToggle = () => {
    const panel = document.querySelector(".note-selector");
    if (panel) {
      panel.classList.toggle("note-selector__collapsed");
    }
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
          <NoteItem note={note} />
        ))}
      </ul>
    </div>
  );
};

type NoteItemProps = {
  note: Note;
};
export const NoteItem = (props: NoteItemProps) => {
  return <li>{props.note.title}</li>;
};
