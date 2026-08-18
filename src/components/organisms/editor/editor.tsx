import { editor } from "./editor.css";
// import './App.css'
import type {
  Extension,
  ReactCodeMirrorRef,
  ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import {
  useCallback,
  useState,
  type HTMLProps,
  type PropsWithChildren,
  type Ref,
} from "react";
import { clsx } from "clsx";
import CodeMirror from "@uiw/react-codemirror";

export type EditorProps = HTMLProps<"div"> &
  ReactCodeMirrorProps & {
    extensions: Extension[];
    ref?: Ref<ReactCodeMirrorRef>;
  };
export const Editor = (props: PropsWithChildren<EditorProps>) => {
  const { className, extensions, ...rest } = props;

  return (
    <CodeMirror
      className={clsx(className, editor)}
      extensions={extensions}
      height={"100vh"}
      basicSetup={false}
      {...rest}
    />
  );
};
