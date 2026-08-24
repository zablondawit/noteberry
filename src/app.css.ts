import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html, body, *", {
  // margin: 0,
  // padding: 0,
  boxSizing: "border-box",
});
globalStyle("html", {
  fontSize: "1.4em",
});

export const editorContainerStyles = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
});
export const mainStyle = style({
  fontFamily: '"Helvetica Neue", Helvetica, Arial',

  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
});
export const containerStyle = style({
  flex: 1,
  display: "flex",
  flexDirection: "row",
});

// globalStyle(`${containerStyle}#e-left`, {
//   overflowX: "scroll",
// });
// globalStyle(`${containerStyle}#e-left .cm-scroller`, {
//   scrollbarWidth: "none",
//   msOverflowStyle: "none",
// });
