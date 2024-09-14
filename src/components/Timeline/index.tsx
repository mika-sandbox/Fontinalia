import {
  IGridviewPanelProps,
  SplitviewReact,
  SplitviewReadyEvent,
} from "dockview";
import { useCallback, useRef } from "react";

import { TimelineController } from "./TimelineController";
import { TrackLayers } from "./TrackLayers";

type Props = {} & IGridviewPanelProps<{}>;

export const Timeline: React.FC<Props> = () => {
  const controller = useRef<TimelineController>(new TimelineController());
  const onReady = useCallback((e: SplitviewReadyEvent) => {
    const left = e.api.addPanel({
      id: "controls",
      component: "controls",
      params: { title: "", controller: controller.current },
      minimumSize: 500,
    });

    const right = e.api.addPanel({
      id: "track_layers",
      component: "track_layers",
      params: { title: "", controller: controller.current },
      minimumSize: 500,
    });

    left.api.setSize({ size: 500 });
  }, []);

  return (
    <div className="h-full">
      <TrackLayers timeline={controller.current} />
    </div>
  );
};
