import { cn } from "@/lib/utils";
import clsx from "clsx";
import {
  ArrowLeftIcon,
  MenuIcon,
  PanelTopClose,
  Settings2Icon,
} from "lucide-react";
import { HeaderBtn } from "../atoms/header-btn";
import styles from "./header-bar.module.css";
import { SettingsPanel } from "../organisms/settings-panel";

type HeaderBarProps = {
  onSettingsBtnClick?: () => void;
  onResultBtnClick?: () => void;
  resultOpen: boolean;
  onBack?: () => void;
};
export const HeaderBar = (props: HeaderBarProps) => {
  const { onResultBtnClick, onSettingsBtnClick, onBack, resultOpen } = props;

  return (
    <header className={clsx([styles.header_bar])}>
      <span>
        <HeaderBtn title="Go Back" onClick={onBack}>
          <ArrowLeftIcon />
        </HeaderBtn>
      </span>

      <span>
        <SettingsPanel
          trigger={
            <HeaderBtn title="Settings" onClick={onSettingsBtnClick}>
              <Settings2Icon />
            </HeaderBtn>
          }
        />
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
