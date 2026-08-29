import type { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import styles from "./header-btn.module.css";

type HeaderBtnProps = {} & React.ComponentProps<"button">;
export const HeaderBtn = (props: PropsWithChildren<HeaderBtnProps>) => {
  const { children, className: classes, ...rest } = props;

  return (
    <Button
      variant="ghost"
      className={cn([styles.header_btn, classes])}
      {...rest}
    >
      {children}
    </Button>
  );
};
