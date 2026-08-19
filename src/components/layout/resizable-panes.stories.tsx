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

const DummyContent = ({ text }: { text: string }) => (
  <span className="w-full h-full flex items-center justify-center">{text}</span>
);

export const DefaultLayout: Story = {
  args: {
    leftPane: <DummyContent text="Left Pane" />,
    rightPane: <DummyContent text="Right Pane" />,
  },
  render: (props) => (
    <div className="h-screen w-screen">
      <ResizableContainer {...props} />
    </div>
  ),
  play: async () => {},
};
