import * as Tabs from "@radix-ui/react-tabs";
import { IGridviewPanelProps } from "dockview";
import { TabList, TabTrigger } from "../tabs/Radix";

type Props = {} & IGridviewPanelProps<{}>;

export const Compositions: React.FC<Props> = () => {
  return (
    <div className="h-full text-white">
      <Tabs.Root defaultValue="composition" orientation="horizontal">
        <TabList aria-label="compositions">
          <TabTrigger value="composition">Composition</TabTrigger>
          <TabTrigger value="resources">Resources</TabTrigger>
        </TabList>
        <Tabs.Content value="composition">bbb</Tabs.Content>
        <Tabs.Content value="resources">aaa</Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
