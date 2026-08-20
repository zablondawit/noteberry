import { isFailure, isOk, type ApplicationErrorType } from "@/types/result";
import { faker } from "@faker-js/faker";
import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { db, type NewNote, type Note } from "../db";
import { NoteRepositoryLive } from "../notes";

describe("store/note", () => {
  afterEach(() => db.notes.clear());
  const repo = new NoteRepositoryLive({ db });

  describe("add", () => {
    it("should add note", async () => {
      const newNote: NewNote = {
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(),
        tags: [],
        updatedAt: new Date().getTime(),
      };

      const result = await repo.add(newNote);
      expect(isOk(result)).toBeTruthy();

      const got = await db.notes.where("title").equals(newNote.title).first();
      expect(got).toBeDefined();
      expect(got?.content).toBe(newNote.content);
    });
  });
  describe("find", () => {
    const dummyNotes: Note[] = [
      {
        id: 1,
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(),
        tags: [faker.lorem.words(1)],
        updatedAt: new Date().getTime(),
      },
      {
        id: 2,
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(),
        tags: [faker.lorem.words(1), faker.lorem.words(1)],
        updatedAt: new Date().getTime(),
      },
    ];

    beforeEach(async () => db.notes.bulkAdd(dummyNotes));

    it("should find an existing note", async () => {
      const result = await repo.find("id", 1);

      if (!isOk(result)) {
        throw new Error(
          "Expected to find a note, but got an error: " + result.message,
        );
      }
      const got = result.data;

      expect(got).toBeDefined();
      expect(got.id).toBe(1);
      expect(got.content).toBe(dummyNotes[0].content);
      expect(got.title).toBe(dummyNotes[0].title);
      expect(got.tags).toEqual(dummyNotes[0].tags);
      expect(got.updatedAt).toBe(dummyNotes[0].updatedAt);
    });
    it("should result in an error if note doesn't exist", async () => {
      const result = await repo.find("id", 134);
      expect(isFailure(result)).to.be.true;
    });
  });
  describe("update", () => {
    const dummyNotes: Note[] = [
      {
        id: 1,
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(),
        tags: [faker.lorem.words(1)],
        updatedAt: new Date().getTime(),
      },
      {
        id: 2,
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(),
        tags: [faker.lorem.words(1), faker.lorem.words(1)],
        updatedAt: new Date().getTime(),
      },
    ];
    beforeEach(() => db.notes.bulkAdd(dummyNotes));

    it("should update existing note", async () => {
      const updatedNoteContent = {
        title: "updated-" + faker.lorem.words(3),
      };
      const result = await repo.update(1, updatedNoteContent);

      if (!isOk(result)) {
        throw new Error(
          "Expected to update a note, but got an error: " + result.message,
        );
      }

      // returns updated note contents
      const { data: resultNote } = result;
      expect(resultNote.id).toBe(1);
      expect(resultNote.title).toBe(updatedNoteContent.title);
      expect(resultNote.content).toBe(dummyNotes[0].content);
      expect(resultNote.updatedAt).toBeGreaterThan(dummyNotes[0].updatedAt);

      const dbNote = await db.notes.where("id").equals(1).first();
      if (!dbNote) {
        throw new Error(`Expected note [id ${1}] not found`);
      }

      expect(dbNote).toEqual(resultNote);
    });
    it("should result in error if note doesn't exist", async () => {
      const result = await repo.update(213, {
        title: "new title",
      });

      isOk(result);
      if (isOk(result)) {
        throw new Error("expected failure to get note, got success");
      }

      expect(result.error?.type).toBe<ApplicationErrorType>(
        "RESOURCE_NOT_FOUND",
      );
    });
  });
  describe("delete", () => {
    const dummyNotes: Note[] = [
      {
        id: 1,
        title: "dummy",
        content: "",
        updatedAt: new Date().getTime(),
        tags: [],
      },
      {
        id: 2,
        title: "dummy2",
        content: "",
        updatedAt: new Date().getTime(),
        tags: [],
      },
      {
        id: 3,
        title: "dummy3",
        content: "",
        updatedAt: new Date().getTime(),
        tags: [],
      },
      {
        id: 4,
        title: "dummy4",
        content: "",
        updatedAt: new Date().getTime(),
        tags: [],
      },
    ];
    beforeEach(() => db.notes.bulkAdd(dummyNotes));

    it("should delete existing note", async () => {
      const result = await repo.delete(1);

      if (isFailure(result)) {
        throw new Error("expected success, got failure");
      }

      const got = result.data;
      expect(got).toBe(true);
    });
    it("should result in error for deleting non-existent note", async () => {
      const result = await repo.delete(12);

      if (isOk(result)) {
        throw new Error("expected failure, got success");
      }

      const got = result.error;

      if (!got) {
        throw new Error("expected error, got undefined");
      }
      expect(got.type).toBe<ApplicationErrorType>("RESOURCE_NOT_FOUND");
    });
  });
});
