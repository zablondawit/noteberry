import { showPanel } from "@codemirror/view";
import type { Panel, PanelConstructor } from "@codemirror/view";

type RenderOutputOptions = {
  label: string;
};
const renderOutput = (element: HTMLElement, opts: RenderOutputOptions) => {
  element.textContent = opts.label;
  // element.textContent = dedent`
  //   Lines: ${opts.lineCount} | Words: ${opts.wordCount}
  // `;
};

export const createHeaderPanel = (label: string): PanelConstructor => {
  return (/** view: EditorView */): Panel => {
    const dom = document.createElement("div");
    dom.style.padding = `4px 10px`;
    dom.style.fontFamily = `sans-serif`;
    dom.style.fontSize = `.6rem`;

    // const textContent = view.state.doc.toString();

    renderOutput(dom, {
      label,
    });

    return {
      dom,
      update: (/** update */) => {
        // const textContent = update.state.doc.toString();
        // renderOutput(dom, { label: "new label" });
      },
      top: true,
    };
  };
};

export const headerBar = (label: string) =>
  showPanel.of(createHeaderPanel(label));
