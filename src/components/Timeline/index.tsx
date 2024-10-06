import { IGridviewPanelProps } from "dockview";
import { useRef } from "react";

import { TimelineController } from "./TimelineController";
import { TrackLayers } from "./TrackLayers";

type Props = {} & IGridviewPanelProps<{}>;

export const Timeline: React.FC<Props> = () => {
  const controller = useRef<TimelineController>(new TimelineController());

  return (
    <div className="h-full">
      <TrackLayers timeline={controller.current} />
    </div>
  );
};
