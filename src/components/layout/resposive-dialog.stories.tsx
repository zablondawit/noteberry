import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponsiveDialog } from "./responsive-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const meta: Meta<typeof ResponsiveDialog> = {
  title: "Layouts/ResponsiveDialog",
  component: ResponsiveDialog,
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof ResponsiveDialog>;

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export const DefaultDialog: Story = {
  args: {
    trigger: <Button variant="outline">Edit Profile</Button>,
    title: "Edit Profile",
    description:
      "Make changes to your profile here. Click save when you're done.",
  },
  render: (props) => (
    <ResponsiveDialog {...props}>
      <ProfileForm className="px-4" />
    </ResponsiveDialog>
  ),
  play: async () => {},
};
