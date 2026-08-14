import { Dexie, type EntityTable } from "dexie";
import { z } from "zod";

export const baseNoteSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  // convert to number
  updatedAt: z.date().transform((date) => date.getTime()),
});
export const noteSchema = baseNoteSchema.extend({});
export const tempNoteSchema = baseNoteSchema
  .pick({
    id: true,
    updatedAt: true,
    content: true,
  })
  .extend({});
export const newNoteSchema = noteSchema.omit({});
export const newTempNoteSchema = tempNoteSchema.omit({
  id: true,
});

export type Note = z.infer<typeof noteSchema>;
export type NewNote = z.infer<typeof newNoteSchema>;
export type TempNote = z.infer<typeof tempNoteSchema>;
export type NewTempNote = z.infer<typeof newTempNoteSchema>;

export type DBInstance = Dexie & {
  notes: EntityTable<Note>;
  tempNotes: EntityTable<TempNote>;
};
export const db = new Dexie("noteberry_notes") as DBInstance;

db.version(1).stores({
  notes: "++id,title,content,tags,updatedAt",
  tempNotes: "++id,content,updatedAt",
});
