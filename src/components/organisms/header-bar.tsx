import { MenuIcon, PanelTopClose } from "lucide-react";
import { HeaderBtn } from "../atoms/header-btn";
import styles from "./header-bar.module.css";
import clsx from "clsx";

export const HeaderBar = () => {
  return (
    <header className={clsx([styles.header_bar])}>
      <span></span>

      <span>
        <HeaderBtn>
          <PanelTopClose className="rotate-90" />
        </HeaderBtn>
        <HeaderBtn>
          <MenuIcon />
        </HeaderBtn>
      </span>
    </header>
  );
};
