import { useAtomValue } from "jotai";
import { memo, useEffect, useRef } from "react";
import { drawFrameLine } from "./service";
import { RemotionAtom } from "../../../states/remotion";
import { CallbackListener } from "@remotion/player";
import { TimelineAtom } from "../../../states/timeline";

type RulerProps = {
  scale: number;
  height: number;
  width: number;
};

const MeasureRuler = memo(({ scale, width, height }: RulerProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFrameLineFn = useRef(drawFrameLine(scale));
  const timeline = useAtomValue(TimelineAtom);
  const controller = useAtomValue(RemotionAtom);

  useEffect(() => {
    drawFrameLineFn.current = drawFrameLine(scale);
  }, [scale]);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx && controller && timeline) {
      drawFrameLineFn.current(ctx, timeline.totalFrames, controller.getCurrentFrame());
    }
  }, [
    scale,
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
