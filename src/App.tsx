// import './App.css'
import { closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import { vim } from "@replit/codemirror-vim";
import CodeMirror, {
  drawSelection,
  highlightActiveLine,
  keymap,
  lineNumbers,
} from "@uiw/react-codemirror";
import type { Extension, ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";

const commonExtensions: Extension[] = [
  // basicSetup,
  highlightActiveLine(),
];

function App() {
  const [state, setState] = useState("");
  const handleViewUpdate = useCallback<
    NonNullable<ReactCodeMirrorProps["onChange"]>
  >((value, vUpdate) => {
    // setState(value);
  }, []);

  return (
    <CodeMirror
      extensions={[
        ...commonExtensions,
        vim(),
        lineNumbers(),
        history(),
        closeBrackets(),
        bracketMatching(),
        // syncExtension,
        // mathResultsInEditor(rightEditor),
        // syncScroll(rightEditor),
        // syncActiveLine(rightEditor),
        drawSelection(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        // headerBar("Editor"),
      ]}
      value={state}
      height={"100vh"}
      // width="50%"
      onChange={handleViewUpdate}
    />
  );
}

export default App;
