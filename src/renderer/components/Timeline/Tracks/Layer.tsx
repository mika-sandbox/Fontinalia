import { forwardRef } from "react";
import { classnames } from "../../../lib/classnames";
import { Layer as LayerT } from "..";

type Props = {
  layer: LayerT;
  frames: number;
  fps: number;
  className?: string;
};

const Layer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { layer, frames, fps, className } = props;

  return (
    <div ref={ref} className={classnames("h-16", className)}>
      aaaa
    </div>
  );
});
Layer.displayName = "Layer";

export { Layer };
