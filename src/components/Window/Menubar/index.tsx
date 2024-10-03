import * as MB from "@radix-ui/react-menubar";
import { MenubarItem } from "./MenubarItem";
import { MenuItem } from "./MenuItem";
import { Separator } from "./Separator";
import { SubMenu } from "./SubMenu";

const Menubar = () => {
  return (
    <MB.Root className="flex bg-neutral-950 text-neutral-400 px-2 py-1 border-b-2 h-9 border-neutral-800">
      <MenubarItem name="File">
        <MenuItem name="New Project" />
        <MenuItem name="Open Recent Project" />
        <MenuItem name="Close Project" disabled />
        <Separator />
        <MenuItem name="Save Project" />
        <MenuItem name="Save Project As…" />
        <Separator />
        <SubMenu name="Import">
          <MenuItem name="Import Media" />
          <MenuItem name="Import Sequence" />
        </SubMenu>
        <MenuItem name="Import Project" />
        <Separator />
        <SubMenu name="Export">
          <MenuItem name="Export Media" />
          <MenuItem name="Export Sequence" />
        </SubMenu>
        <MenuItem name="Export Project" />
        <Separator />
        <MenuItem name="Preferences" />
        <MenuItem name="Exit" />
      </MenubarItem>
      <MenubarItem name="Edit">
        <MenuItem name="Undo" />
        <MenuItem name="Redo" />
        <Separator />
        <MenuItem name="Cut" />
        <MenuItem name="Cut Head" />
        <MenuItem name="Cut Tail" />
        <MenuItem name="Copy" />
        <MenuItem name="Copy Head" />
        <MenuItem name="Copy Tail" />
        <MenuItem name="Paste" />
        <Separator />
        <MenuItem name="Duplicate" />
        <Separator />
        <MenuItem name="Select All" />
        <MenuItem name="Deselect All" />
        <SubMenu name="Select">
          <MenuItem name="Next" />
          <MenuItem name="Previous" />
          <MenuItem name="Above" />
          <MenuItem name="Below" />
        </SubMenu>
      </MenubarItem>
      <MenubarItem name="Help">
        <MenuItem name="Void Video Editor Manual" />
        <MenuItem name="About Void Video Editor" />
      </MenubarItem>
    </MB.Root>
  );
};

export { Menubar };
