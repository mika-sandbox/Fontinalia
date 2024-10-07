import { useAtomValue } from "jotai";
import { memo, useEffect, useRef } from "react";
import { drawFrameLine } from "./service";
import { CallbackListener } from "@remotion/player";
import { TimelineAtom } from "../../../state/timeline";
import { RemotionAtom } from "../../../state/remotion";

type RulerProps = {
  scale: number;
  height: number;
  width: number;
  offset: number;
};

const MeasureRuler = memo(({ scale, width, height, offset }: RulerProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFrameLineFn = useRef(drawFrameLine(scale, offset));
  const timeline = useAtomValue(TimelineAtom);
  const controller = useAtomValue(RemotionAtom);

  useEffect(() => {
    drawFrameLineFn.current = drawFrameLine(scale, offset);
  }, [scale, offset]);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx && controller && timeline) {
      drawFrameLineFn.current(ctx, timeline.totalFrames, controller.getCurrentFrame());
    }
  }, [
    scale,
    offset,
    // no directly dependent but should re-rendering
    width,
    height,
  ]);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");

    if (ctx && controller && timeline) {
      const onFrameUpdate: CallbackListener<"frameupdate"> = (e) => {
        const { frame } = e.detail;
        drawFrameLineFn.current(ctx, timeline.totalFrames, frame);
      };

      controller.addEventListener("frameupdate", onFrameUpdate);

      return () => {
        controller.removeEventListener("frameupdate", onFrameUpdate);
      };
    }
  }, [controller]);

  return <canvas ref={ref} width={width} height={height} className="w-full h-full" />;
});
MeasureRuler.displayName = "MeasureRuler";

type Props = {} & RulerProps;

const Measure: React.FC<Props> = ({ ...rest }) => {
  return (
    <div className="relative w-full h-full">
      <MeasureRuler {...rest} />
    </div>
  );
};

export { Measure };
