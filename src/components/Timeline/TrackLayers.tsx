import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { TimelineController } from "./TimelineController";
import { Layer } from "./Layer";
import { Measure } from "./Measure";

type Props = {
  timeline: TimelineController;
};

export const TrackLayers: React.FC<Props> = ({ timeline }) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(2);

  const onMouseWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.deltaY > 0) {
      setScale((prev) => Math.min(prev * 2, 16));
    } else {
      setScale((prev) => Math.max(prev / 2, 0.125));
    }
  }, []);

  useEffect(() => {}, []);

  const frames = 1800; // 30s
  const fps = 60;

  return (
    <ScrollSync>
      <div className="relative w-full h-full grid grid-rows-[48px_1fr] grid-cols-[160px_1fr] overflow-hidden">
        <div />
        <div onWheel={onMouseWheel} />
        <ScrollSyncPane>
          <div className="relative w-full h-auto overflow-scroll scroll-none">
            {timeline.layers.map((layer) => (
              <div
                key={layer.name}
                className="flex items-center justify-center w-40 h-16 bg-neutral-900 border-b border-r-2 border-neutral-800 select-none"
              >
                {layer.name}
              </div>
            ))}
          </div>
        </ScrollSyncPane>
        <ScrollSyncPane>
          <div className="relative w-full h-auto overflow-scroll bg-neutral-900 border-b border-neutral-800">
            {timeline.layers.map((layer, i) => (
              <Layer layer={layer} frames={frames} fps={fps} key={layer.name} className="h-16" ref={layerRef} />
            ))}
          </div>
        </ScrollSyncPane>
        <div ref={rootRef} className="absolute inset-0 z-10 col-start-2 pointer-events-none">
          {layerRef.current && rootRef.current && (
            <Measure scale={scale} height={rootRef.current.clientHeight} width={layerRef.current.clientWidth} />
          )}
        </div>
      </div>
    </ScrollSync>
  );
};
