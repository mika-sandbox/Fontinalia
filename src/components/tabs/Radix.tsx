import * as Tabs from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "../../utils";

const TabList = forwardRef<
  ElementRef<typeof Tabs.List>,
  ComponentPropsWithoutRef<typeof Tabs.List>
>(({ className, ...rest }, ref) => {
  return (
    <Tabs.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-start w-full bg-neutral-800",
        className
      )}
      {...rest}
    />
  );
});
TabList.displayName = Tabs.List.displayName;

const TabTrigger = forwardRef<
  ElementRef<typeof Tabs.Trigger>,
  ComponentPropsWithoutRef<typeof Tabs.Trigger>
>(({ className, ...rest }, ref) => {
  return (
    <Tabs.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-lg font-medium bg-neutral-800 border-b-2 border-transparent data-[state=active]:bg-neutral-950 data-[state=active]:border-blue-500",
        className
      )}
      {...rest}
    />
  );
});
TabTrigger.displayName = Tabs.Trigger.displayName;

export { TabList, TabTrigger };
