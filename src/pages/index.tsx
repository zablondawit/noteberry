import { NoteCard } from "@/components/atoms/note-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Note } from "@/store/db";
import { faker } from "@faker-js/faker";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import styles from "./index.module.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const mockNotes: Note[] = Array.from({ length: 10 }, (_, idx) => {
  return {
    id: idx + 1,
    title: faker.lorem.words(3),
    content: faker.lorem.paragraphs(2),
    tags: [faker.lorem.word(), faker.lorem.word()],
    updatedAt: Date.now() - idx * 1000 * 60 * 60,
  };
});

const Header = () => {
  return (
    <header className={cn([styles.header])}>
      <span>
        <h1 className={cn(styles.title)}>NoteBerry 🍓</h1>
      </span>
      <span>
        <Link to={"/pad"}>
          <Button className="cursor-pointer" title="Create New Pad" size="sm">
            <PlusIcon />
            New Pad
          </Button>
        </Link>
      </span>
    </header>
  );
};

const NoteListContainer = (props: {
  children?: React.ReactNode;
  notes: Note[];
  title?: string;
}) => {
  const { notes, title } = props;

  return (
    <div>
      <h3 className="px-4">{title}</h3>

      <ScrollArea className="whitespace-nowrap">
        <section className={cn(styles.notes_list_container)}>
          {notes.map((note) => (
            <NoteCard key={note.id} onClick={console.log} note={note} />
          ))}
        </section>

        <ScrollBar orientation="horizontal" hidden />
      </ScrollArea>
    </div>
  );
};

function RouteComponent() {
  return (
    <main className={cn([styles.main])}>
      <Header />
      <NoteListContainer title={"Recent Notes"} notes={mockNotes} />
      <NoteListContainer title={"Starred"} notes={mockNotes} />
    </main>
  );
}
