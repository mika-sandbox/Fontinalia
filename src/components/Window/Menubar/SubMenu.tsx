import * as MB from "@radix-ui/react-menubar";
import { cn } from "../../../utils";

type Props = {
  name: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const SubMenu = ({ name, disabled, children }: Props) => {
  return (
    <MB.Sub>
      <MB.SubTrigger
        disabled={disabled}
        className={cn(
          "px-2 text-neutral-400 text-sm flex items-center h-8 relative outline-none select-none cursor-pointer",
          "data-[highlighted]:bg-neutral-800 data-[highlighted]:text-neutral-100",
          "data-[state='open']:bg-neutral-800 data-[state='open']:text-neutral-100",
        )}
      >
        {name}
      </MB.SubTrigger>
      <MB.Portal>
        <MB.SubContent
          className={cn(
            "min-w-64 bg-neutral-950 text-neutral-400 text-sm border border-neutral-800 rounded-none px-2 shadow-sm z-10",
            "data-[highlighted]:bg-neutral-800",
          )}
          sideOffset={5}
          alignOffset={0}
        >
          {children}
        </MB.SubContent>
      </MB.Portal>
    </MB.Sub>
  );
};

export { SubMenu };
