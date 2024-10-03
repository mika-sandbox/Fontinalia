import * as MB from "@radix-ui/react-menubar";
import { cn } from "../../../utils";

type MenuItemProps = {
  name: string;
  children?: React.ReactNode;
};

const MenubarItem = ({ name, children }: MenuItemProps) => {
  return (
    <MB.Menu>
      <MB.Trigger
        className={cn(
          "px-2 py-0.5 select-none outline-none text-neutral-400 text-sm",
          "data-[state='open']:text-neutral-100",
        )}
      >
        {name}
      </MB.Trigger>
      <MB.Portal>
        <MB.Content
          className={cn(
            "min-w-64 bg-neutral-950 text-neutral-400 text-sm border border-neutral-800 rounded-none px-2 py-2 shadow-sm z-10",
            "data-[highlighted]:bg-neutral-800",
          )}
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          {children}
        </MB.Content>
      </MB.Portal>
    </MB.Menu>
  );
};

export { MenubarItem };
