import { style, globalStyle } from "@vanilla-extract/css";

export const editor = style({
  flex: 1,
  overflow: "hidden",
});

globalStyle(`${editor} .cm-editor`, {
  height: "100%",
});
