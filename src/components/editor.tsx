import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { basicSetup, type ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { languages } from "@codemirror/language-data";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import { RangeSetBuilder, StateField, type Extension } from "@codemirror/state"

import { WidgetType, Decoration, EditorView, type DecorationSet } from "@codemirror/view";

const resultWidget = (result: string) => {
  const dom = document.createElement("span")
  dom.textContent = `${result}`
  dom.style.cssText = "color: #888; font-style: italic; margin-left: 4px;";

  const decoration = Decoration.widget({
    //@ts-ignore Ignore the constructor error, this is a hack to get the widget to render
    widget: new (class extends EditorView {
      //@ts-ignore Ignore the constructor error, this is a hack to get the widget to render
      constructor() { super(); this.dom = dom }
    })()
  })

  return decoration;
}

const mathExtension: Extension = StateField.define<DecorationSet>(
  {
    provide(field) {
      return EditorView.decorations.from(field)
    },
    create() {
      return Decoration.none;
    },
    update(decorations, tr) {
      if (!tr.docChanged) return decorations;

      const builder = new RangeSetBuilder<Decoration>()
      const lines = tr.newDoc.toString().split("/n")
      let pos = 0

      lines.forEach((line) => {
        const match = line.match(/(\d+)\s*[\+\-\*\/]\s*(\d+)/)
        if (match) {
          try {
            const result = eval(match[0])
            const endPos = pos + match[0].length + match.index!
            builder.add(endPos, endPos, resultWidget(String(result)))
          } catch (executeErr) {
            // use decoration to show the error in the editor
            console.error("Error executing math expression:", executeErr);
          }
        }

        pos += line.length + 1
      })

      return builder.finish()
    }
  }
)

class InlineExecute extends WidgetType {
  result: string;
  constructor(result: string) {
    super();
    this.result = result;
  }

  eq(other: InlineExecute) {
    return other.result == this.result;
  }

  toDOM(): HTMLElement {
    const wrap = document.createElement(`span`);

    wrap.style.cssText = `
      opacity: 0.6;
      background: #eee;
      border-radius: 4px;
      padding: 0 4px;
      margin-left: 8px;
      font-weight: bold;
    `;
    wrap.textContent = `~ ${this.result}`;

    return wrap;
  }

  ignoreEvent() {
    return false;
  }
}

export const Editor = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback<ReactCodeMirrorProps["onChange"]>(
    (newValue, _) => setValue(newValue),
    [],
  );

  const getWindowHeight = useCallback(() => {
    if (typeof window == "undefined") {
      return 500;
    }
    return window.innerHeight;
  }, []);

  const editorRef = useRef<ReactCodeMirrorRef>(null)

  const height = `${getWindowHeight() - 20}px`;

  const stopEscapeBubbling = useMemo(() => {
    return EditorView.domEventHandlers({
    })
  }, [])

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      height={height}
      width="100%"
      onChange={onChange}
      extensions={[
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        basicSetup(),
        vim(),
        mathExtension,
        stopEscapeBubbling,
      ]}
    />
  );
};
