import * as MB from "@radix-ui/react-menubar";
import { cn } from "../../../utils";

type MenuItemProps = {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
};

const MenuItem = ({ name, disabled, onClick }: MenuItemProps) => {
  return (
    <MB.Item
      className={cn(
        "px-2 text-neutral-400 text-sm flex items-center h-8 relative outline-none select-none cursor-pointer",
        "data-[highlighted]:bg-neutral-800 data-[highlighted]:text-neutral-100",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </MB.Item>
  );
};

export { MenuItem };
