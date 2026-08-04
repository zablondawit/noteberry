import type { AsyncResult, Result } from "@/types/result";
import type { DBInstance, NewNote, Note } from "./db";

type FindBy = keyof Pick<Note, "id">;

export interface NoteRepository {
  find<T extends FindBy>(by: T, value: Note[T]): AsyncResult<Note>;
  add(note: NewNote): AsyncResult<Note>;
  update(id: number, note: NewNote): AsyncResult<Note>;
  delete(id: number): AsyncResult<Note["id"]>;
}

type NoteRepositoryContext = {
  db: DBInstance;
};

export class NoteRepositoryLive implements NoteRepository {
  ctx: NoteRepositoryContext;

  constructor(ctx: NoteRepositoryContext) {
    this.ctx = ctx;
  }

  find<T extends FindBy>(by: T, value: Note[T]): AsyncResult<Note> {
    throw new Error("Method not implemented.");
  }
  add(note: NewNote): AsyncResult<Note> {
    throw new Error("Method not implemented.");
  }
  update(id: number, note: Partial<NewNote>): AsyncResult<Note> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): AsyncResult<NonNullable<Note["id"]>> {
    throw new Error("Method not implemented.");
  }
}
