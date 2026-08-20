//@ts-nocheck
import type { TempNote, NewTempNote, DBInstance } from "./db";

export interface TempNoteRepository {
  find(id: TempNote["id"]): TempNote;
  add(note: NewTempNote): TempNote;
  update(id: number, note: NewTempNote): TempNote;
  delete(id: number): void;
}
export type TempNoteRepoContext = {
  db: DBInstance;
};

export class TempNoteRepositoryLive implements TempNoteRepository {
  ctx: TempNoteRepoContext;

  constructor(ctx: TempNoteRepoContext) {
    this.ctx = ctx;
  }

  find(id: TempNote["id"]): TempNote {
    throw new Error("Method not implemented.");
  }
  add(note: NewTempNote): TempNote {
    throw new Error("Method not implemented.");
  }
  update(id: number, note: NewTempNote): TempNote {
    throw new Error("Method not implemented.");
  }
  delete(id: number): void {
    throw new Error("Method not implemented.");
  }
}
