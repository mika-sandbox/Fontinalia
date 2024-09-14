import { forwardRef } from "react";
import { cn } from "../../utils";
import { Layer as LayerT } from "./TimelineController";

type Props = {
  layer: LayerT;
  frames: number;
  fps: number;
  className?: string;
};

const Layer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { layer, frames, fps, className } = props;

  return (
    <div ref={ref} className={cn("h-16", className)}>
      aaaa
    </div>
  );
});
Layer.displayName = "Layer";

export { Layer };
