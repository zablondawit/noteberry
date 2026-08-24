import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabbedSettings } from "./tabbed-settings";

const meta: Meta<typeof TabbedSettings> = {
  title: "Molecules/TabbedSettings",
  component: TabbedSettings,
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof TabbedSettings>;

export const Default: Story = {
  args: {},
  render: TabbedSettings,
  play: async () => {},
};
