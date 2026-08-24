import { TabbedSettings } from "../molecules/tabbed-settings";
import {
  ResponsiveDialog,
  type ResponsiveDialogProps,
} from "../layout/responsive-dialog";

export type SettingsPanelProps = {} & Pick<ResponsiveDialogProps, "trigger">;
export const SettingsPanel = (props: SettingsPanelProps) => {
  const { trigger } = props;

  return (
    <ResponsiveDialog title="Settings" description="" trigger={trigger}>
      <TabbedSettings />
    </ResponsiveDialog>
  );
};
