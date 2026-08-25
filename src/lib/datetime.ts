import type { Note } from "@/store/db";
import { formatDate } from "date-fns";

export const formatNoteDate = (date: Note["updatedAt"]) => {
  return formatDate(new Date(date), "PP");
};
