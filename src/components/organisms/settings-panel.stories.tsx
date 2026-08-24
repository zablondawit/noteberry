import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsPanel } from "./settings-panel";
import { Button } from "../ui/button";

const meta: Meta<typeof SettingsPanel> = {
  title: "organisms/settings-panel",
  component: SettingsPanel,
};
export default meta;

type Story = StoryObj<typeof SettingsPanel>;
export const Default: Story = {
  args: {},
  render: () => {
    return <SettingsPanel trigger={<Button>Open Panel</Button>} />;
  },
  play: async () => {},
};
