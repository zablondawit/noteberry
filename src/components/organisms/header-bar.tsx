import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import clsx from "clsx";
import { MenuIcon, PanelTopClose, Settings2Icon } from "lucide-react";
import { HeaderBtn } from "../atoms/header-btn";
import styles from "./header-bar.module.css";

type HeaderBarProps = {
  onSettingsBtnClick?: () => void;
  onResultBtnClick?: () => void;
  resultOpen: boolean;
};
export const HeaderBar = (props: HeaderBarProps) => {
  const { onResultBtnClick, onSettingsBtnClick, resultOpen } = props;

  return (
    <header className={clsx([styles.header_bar])}>
      <span></span>

      <span>
        <HeaderBtn title="Settings" onClick={onSettingsBtnClick}>
          <Settings2Icon />
        </HeaderBtn>
        <HeaderBtn title="toggle sidebar" onClick={onResultBtnClick}>
          <PanelTopClose
            className={cn([resultOpen ? "rotate-90" : "rotate-270"])}
          />
        </HeaderBtn>
        <HeaderBtn hidden>
          <MenuIcon />
        </HeaderBtn>
      </span>
    </header>
  );
};
