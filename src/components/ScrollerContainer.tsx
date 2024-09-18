import React, { ReactNode } from "react";
import { cn } from "../utils";
import { useScrollContainer } from "react-indiana-drag-scroll";

import "react-indiana-drag-scroll/dist/style.css";

type Props = {
  children: ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

export const ScrollContainer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, ...additionalProps } = { ...props };

  const scrollContainer = useScrollContainer({
    mouseScroll: { rubberBand: false, inertia: false },
  });

  return (
    <div
      className={cn(["indiana-scroll-container", "indiana-scroll-container--hide-scrollbars"])}
      ref={(w) => {
        if (w) {
          scrollContainer.ref(w);
          (ref as any).current = w;
        }
      }}
      {...additionalProps}
    >
      {children}
    </div>
  );
});
