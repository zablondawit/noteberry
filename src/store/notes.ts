import type { AsyncResult, Result } from "@/types/result";
import { fail, wrapAsync } from "@/types/result";
import type { DBInstance, NewNote, Note } from "./db";
import { db, noteSchema } from "./db";
import { useGuard } from "@/types/guard";
import type { z } from "zod";
// don't directly use db
useGuard(db);

const findKeys = noteSchema.pick({ id: true }).keyof();
type FindBy = z.infer<typeof findKeys>;

export interface NoteRepository {
  find<T extends FindBy>(by: T, value: Note[T]): AsyncResult<Note>;
  add(note: NewNote): AsyncResult<Note>;
  update(id: number, note: NewNote): AsyncResult<Note>;
  delete(id: number): AsyncResult<boolean>;
}

type NoteRepositoryContext = {
  db: DBInstance;
};

export class NoteRepositoryLive implements NoteRepository {
  ctx: NoteRepositoryContext;

  constructor(ctx: NoteRepositoryContext) {
    this.ctx = ctx;
  }

  async find<T extends FindBy>(
    by: T,
    value: NonNullable<Note[T]>,
  ): AsyncResult<Note> {
    const { db } = this.ctx;
    const { success } = findKeys.safeParse(by);
    if (!success) {
      return fail("Invalid find key", undefined, { by, value });
    }

    const result = await wrapAsync(
      async () => db.notes.where(by).equals(value).first(),
      "Failed to find note",
    );

    if (result.success && !result.data) {
      return fail("Note not found", {
        type: "RESOURCE_NOT_FOUND",
        resource: "note",
      });
    }

    return result as Result<Note>;
  }
  async add(note: NewNote): AsyncResult<Note> {
    const { db } = this.ctx;

    const result = await wrapAsync(
      () => db.notes.add(note),
      "Failed to add note",
    );

    return result;
  }
  async update(id: number, note: Partial<NewNote>): AsyncResult<Note> {
    const { db } = this.ctx;

    const found = await wrapAsync(
      () => db.notes.where("id").equals(id).first(),
      "Failed to get note before update",
    );

    if (found.success) {
      if (!found.data) {
        return fail("Note not found", {
          type: "RESOURCE_NOT_FOUND",
          resource: "note",
        });
      }

      const result = await wrapAsync(
        () =>
          db.notes.update(found.data as Note, {
            ...note,
            updatedAt: new Date().getTime(),
          }),
        "Failed to update notes",
      );

      if (!result.success) {
        return result;
      }

      const updatedNote = await wrapAsync(
        () => db.notes.where("id").equals(id).first(),
        "Failed to get note after update",
      );

      if (updatedNote.success && !updatedNote.data) {
        return fail("Note not found after update", {
          type: "RESOURCE_NOT_FOUND",
          resource: "note",
        });
      }

      return updatedNote as Result<Note>;
    }

    return found;
  }

  /**
   * Delete a note from the database by its ID.
   * note: currently only deleting one entry at a time
   */
  async delete(id: number): AsyncResult<boolean> {
    const { db } = this.ctx;

    const found = await wrapAsync(
      () => db.notes.where("id").equals(id).first(),
      "Failed to find note",
    );
    if (found.success && !found.data) {
      return fail("Note not found", {
        type: "RESOURCE_NOT_FOUND",
        resource: "note",
      });
    }

    const result = wrapAsync(
      async () => !!(await db.notes.where("id").equals(id).delete()),
      "Failed to delete note",
    );

    return result;
  }
}
