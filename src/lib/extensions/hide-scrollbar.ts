/**
 * @author Zablon Dawit <zablon@qebero.dev>
 * @license Apache-2.0
 *
 * The purpose of this extension is to have one scrollbar
 * visible on the main view, even though it functionally hides
 * one scrollbar when two editors are present the aim to correctly
 * show one scrollbar as it should be.
 */
import { Compartment, type Extension } from "@codemirror/state";
import { EditorView } from "codemirror";
import { useUIStore } from "@/store/ui";

const resultOpen = useUIStore.getState().resultOpen;

export const scrollbarCompartment = new Compartment();
const hiddenScrollbarTheme = EditorView.theme({
  ".cm-scroller": {
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export function setScrollbarHide(view: EditorView, hide: boolean): void {
  view.dispatch({
    effects: scrollbarCompartment.reconfigure(hide ? hiddenScrollbarTheme : []),
  });
}

export function hideScrollbar(): Extension {
  return scrollbarCompartment.of(resultOpen ? hiddenScrollbarTheme : []);
}
