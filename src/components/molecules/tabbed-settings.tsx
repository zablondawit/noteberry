import * as React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

// In-case you want to use zod for type checking the tab pages, you can uncomment the following line and use it as needed.
// const tabPages = z.enum(["general", "editor"]);

type TabbedSettingsProps = React.ComponentProps<typeof Tabs>;
export const TabbedSettings = (props: TabbedSettingsProps) => {
  const { className, defaultValue, ...restProps } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Tabs
      defaultValue={"general"}
      className={cn([!isDesktop && "px-4", className])}
      {...restProps}
    >
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="editor">Editor</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div>General settings content</div>
      </TabsContent>
      <TabsContent value="editor">
        <div>Editor settings content</div>
      </TabsContent>
    </Tabs>
  );
};
