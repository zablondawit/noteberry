import "fake-indexeddb/auto";
import { log } from "node:console";
import { beforeEach, describe, it } from "vitest";
import { db } from "../src/store/db";

// 10 notes
const dummyNotes = [
  {
    title: "Test Note 1",
    content: "note contents",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 2",
    content: "note contents 2",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 3",
    content: "note contents 3",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 4",
    content: "note contents 4",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 5",
    content: "note contents 5",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 6",
    content: "note contents 6",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 7",
    content: "note contents 7",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 8",
    content: "note contents 8",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 9",
    content: "note contents 9",
    tags: [],
    updatedAt: new Date().getTime(),
  },
  {
    title: "Test Note 10",
    content: "note contents 10",
    tags: [],
    updatedAt: new Date().getTime(),
  },
];

describe("dexie", () => {
  beforeEach(() => {
    return db.notes.clear();
  });

  it("should create a note", async () => {
    await db.notes.add({
      title: "Test Note",
      content: "note contents",
      tags: [],
      updatedAt: new Date().getTime(),
    });

    const note = await db.notes.where("title").equals("Test Note").first();

    log({
      note,
    });
  });

  it("should search notes", async () => {
    await db.notes.bulkAdd(dummyNotes);
    const note3 = await db.notes.where("id").equals(3).first();

    log({
      note3,
    });
  });
});
