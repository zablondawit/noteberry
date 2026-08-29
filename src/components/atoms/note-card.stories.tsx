import type { Meta, StoryObj } from "@storybook/react-vite";
import { NoteCard } from "./note-card";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof NoteCard> = {
  title: "atoms/note-card",
  component: NoteCard,
};
export default meta;

type Story = StoryObj<typeof meta>;
type MultipleCardsStory = StoryObj<typeof meta> & {
  args: {
    notes: Array<{
      id: number;
      title: string;
      content: string;
      tags: string[];
      updatedAt: number;
    }>;
  };
};

export const Default: Story = {
  args: {
    note: {
      id: 1,
      title: "Sample Note",
      content: "This is a sample note content.",
      tags: ["sample", "note"],
      updatedAt: new Date().getTime(),
    },
  },
  render: NoteCard,
  play: () => {},
};

const fakeNotes = Array.from({ length: 5 }, (_, i) => {
  return {
    id: i + 1,
    title: faker.lorem.words({ min: 1, max: 3 }),
    content: faker.lorem.paragraph(),
    tags: faker.helpers.arrayElements(["tag1", "tag2", "tag3", "tag4"], 2),
    updatedAt: faker.date.recent().getTime(),
  };
});

export const MultipleCards: MultipleCardsStory = {
  args: {
    notes: fakeNotes,
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {/*@ts-ignore*/}
      {args.notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  ),
};
