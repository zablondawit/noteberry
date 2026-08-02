# Data Structure for Storing Pages

- Better if it's possible to store the note contents raw
- Each time a change occurs or a note is loaded the results are computed
- No need to store anything other than the contents of the note and the metadata

## Metadata

1. ID (not included in temporary notes)
2. Title (not included in temporary notes)
3. Updated At
4. Tags, can be used to categorize a note (not included in temporary notes)

## Notes

There are two main aspects of notes in a calculating notepad, one that's ephemeral and one that's persistent. That helps organize calculations without having to have a large backlog of notes whenever the user is doing simple calculations. Both have the same contents, but the temporary one has a small amount of it's data stored

1. Temporary Note: any note that the user creates that's not saved intentionally
2. Persistent Note: note's the user intentionally stores

```ts
type BaseNote = {
  id: number;
  title: string;
  updatedAt: Date;
  tags: string[];
};
type Note = BaseNote; // Persistent note
type TempNote = Pick<BaseNote, "updatedAt">;
```
