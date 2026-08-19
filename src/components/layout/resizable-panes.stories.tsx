import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizableContainer } from "./resizable-panes";

const meta: Meta<typeof ResizableContainer> = {
  title: "Layouts/ResizableContainer",
  component: ResizableContainer,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ResizableContainer>;

export const DefaultLayout: Story = {
  args: {
    leftPane: <span>Left</span>,
    rightPane: <span>Right</span>,
  },
  render: (props) => (
    <div className="h-screen w-screen">
      <ResizableContainer {...props} />
    </div>
  ),
  play: async () => {},
};
