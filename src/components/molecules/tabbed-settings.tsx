import * as React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";

// In-case you want to use zod for type checking the tab pages, you can uncomment the following line and use it as needed.
// const tabPages = z.enum(["general", "editor"]);

type TabbedSettingsProps = React.ComponentProps<typeof Tabs>;
export const TabbedSettings = (props: TabbedSettingsProps) => {
  const { className, defaultValue, ...restProps } = props;

  return (
    <Tabs
      defaultValue={"general"}
      className={cn(["px-4", className])}
      {...restProps}
    >
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="editor">Editor</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="p-4">General settings content</div>
      </TabsContent>
      <TabsContent value="editor">
        <div className="p-4">Editor settings content</div>
      </TabsContent>
    </Tabs>
  );
};
