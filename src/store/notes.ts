import { Dexie, type EntityTable } from "dexie";
import { z } from "zod";

const baseNoteSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  // convert to number
  updatedAt: z.date().transform((date) => date.getTime()),
});
const noteSchema = baseNoteSchema.extend({});
const tempNoteSchema = baseNoteSchema
  .pick({
    id: true,
    updatedAt: true,
    content: true,
  })
  .extend({});

export type Note = z.infer<typeof noteSchema>;
export type TempNote = z.infer<typeof tempNoteSchema>;

export const db = new Dexie("noteberry_notes") as Dexie & {
  notes: EntityTable<Note>;
  tempNotes: EntityTable<TempNote>;
};

db.version(1).stores({
  notes: "++id,title,content,tags,updatedAt",
  tempNotes: "++id,content,updatedAt",
});
