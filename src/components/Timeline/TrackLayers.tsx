import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { TimelineController } from "./TimelineController";
import { Layer } from "./Layer";
import { frame2pixel, position2frame } from "./Measure/service";
import { Measure } from "./Measure";
import { ScrollContainer } from "../ScrollerContainer";
import { useAtomValue } from "jotai";
import { RemotionAtom } from "../../states/remotion";

type Props = {
  timeline: TimelineController;
};

export const TrackLayers: React.FC<Props> = ({ timeline }) => {
  const ref = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const translate = useRef(0);
  const [scale, setScale] = useState(2);
  const player = useAtomValue(RemotionAtom);

  const onMouseWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.deltaY > 0) {
      setScale((prev) => Math.min(prev * 2, 16));
    } else {
      setScale((prev) => Math.max(prev / 2, 0.125));
    }
  }, []);

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const scrollX = target.scrollLeft;

      if (ref.current) {
        translate.current = scrollX;
        ref.current.style.transform = `translateX(-${scrollX}px)`;
      }
    },
    [timeline],
  );

  useEffect(() => {
    if (header.current) {
      const elem = header.current;
      let isDragging = false;

      const onMouseDown = (e: MouseEvent) => (isDragging = true) && onClickRuler(e);
      const onMouseUp = () => (isDragging = false);
      const onClickRuler = (e: MouseEvent) => {
        if (!isDragging) return;

        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - Math.floor(rect.left) + translate.current;
        const frame = position2frame(x, scale);

        player?.seekTo(frame);
      };

      elem.addEventListener("mousedown", onMouseDown);
      elem.addEventListener("mousemove", onClickRuler);
      elem.addEventListener("mouseup", onMouseUp);

      return () => {
        elem.removeEventListener("mousedown", onMouseDown);
        elem.removeEventListener("mousemove", onClickRuler);
        elem.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [player, scale]);

  const frames = 1800; // 30s
  const fps = 60;
  const pixel = useMemo(() => frame2pixel(timeline.totalFrames, scale) + 100, [scale, timeline.totalFrames]);

  return (
    <ScrollSync>
      <div className="relative w-full h-full grid grid-rows-[48px_1fr] grid-cols-[160px_1fr] overflow-hidden">
        <div className="z-10 bg-neutral-900 border-r-2 border-neutral-700" />
        <div ref={header} onWheel={onMouseWheel} />
        <ScrollSyncPane>
          <div className="relative z-10 w-full h-auto bg-neutral-900 overflow-auto scroll-none">
            {timeline.layers.map((layer) => (
              <div
                key={layer.name}
                className="flex items-center justify-center w-40 h-16 border-b border-r-2 border-neutral-700 select-none"
              >
                {layer.name}
              </div>
            ))}
          </div>
        </ScrollSyncPane>
        <ScrollSyncPane>
          <ScrollContainer onScroll={onScroll}>
            <div
              className="relative w-full h-auto overflow-x-scroll bg-neutral-900 scroll-none"
              style={{ minWidth: `${pixel}px` }}
            >
              {timeline.layers.map((layer, i) => (
                <div key={layer.name} className="h-16 border-b border-neutral-700 select-none">
                  <Layer layer={layer} frames={frames} fps={fps} key={layer.name} className="h-16" />
                </div>
              ))}
            </div>
          </ScrollContainer>
        </ScrollSyncPane>
        <div
          ref={ref}
          className="absolute top-0 bottom-0 col-start-2 pointer-events-none"
          style={{ width: `${pixel}px`, transform: `translateX(-)` }}
        >
          {ref.current && <Measure scale={scale} height={ref.current.clientHeight} width={pixel} />}
        </div>
      </div>
    </ScrollSync>
  );
};
