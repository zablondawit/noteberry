import { MenuIcon, PanelTopClose } from "lucide-react";
import { HeaderBtn } from "../atoms/header-btn";
import styles from "./header-bar.module.css";
import clsx from "clsx";
import { useUIStore } from "@/store/ui";
import { cn } from "@/lib/utils";

export const HeaderBar = () => {
  const { toggleResult, resultOpen } = useUIStore();

  return (
    <header className={clsx([styles.header_bar])}>
      <span></span>

      <span>
        <HeaderBtn onClick={toggleResult}>
          <PanelTopClose
            className={cn([resultOpen ? "rotate-90" : "rotate-270"])}
          />
        </HeaderBtn>
        <HeaderBtn>
          <MenuIcon />
        </HeaderBtn>
      </span>
    </header>
  );
};
