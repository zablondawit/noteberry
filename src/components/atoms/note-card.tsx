import type { Note } from "@/store/db";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import * as React from "react";
import styles from "./note-card.module.css";
import { formatNoteDate } from "@/lib/datetime";

export type NoteCardProps = {
  note: Note;
  onClick?: (note: Note) => void;
} & React.ComponentProps<typeof Card>;
export const NoteCard = (props: NoteCardProps) => {
  const { note, onClick, ...rest } = props;
  const { title, content, updatedAt } = note;

  return (
    <Card
      onClick={() => onClick?.(note)}
      className={cn([styles.note_card])}
      {...rest}
    >
      <div className="px-4 py-2 select-none flex flex-col h-100 justify-between">
        <span>
          <h3 className="font-semibold mb-2 cursor-pointer truncate">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {content}
          </p>
        </span>

        <p className="text-xs text-muted-foreground text-right">
          {formatNoteDate(updatedAt)}
        </p>
      </div>
    </Card>
  );
};
