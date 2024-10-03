"use client";

import {
  GridviewReact,
  GridviewReadyEvent,
  IGridviewPanelProps,
  LayoutPriority,
  Orientation,
  SerializedGridviewComponent,
} from "dockview";
import "dockview/dist/styles/dockview.css";
import { useCallback, useEffect } from "react";
import { Player } from "./Player";
import { Compositions } from "./Composition";
import { Timeline } from "./Timeline";
import { useSetAtom } from "jotai";
import { TimelineAtom } from "../states/timeline";
import { TimelineController } from "./Timeline/TimelineController";
import { useLocalStorage } from "../hooks/useLocalStorage";

// +-------------+-------------------------------+------------+
// |             |                               |            |
// |             |                               |            |
// | Composition |            Player             | Properties |
// |             |                               |            |
// |             |                               |            |
// +-------------+-------------------------------+------------+
// |                                                          |
// |                         Timeline                         |
// |                                                          |
// +---------------------------------------------+------------+
const App = () => {
  const { value: layout, set } = useLocalStorage<SerializedGridviewComponent>("layout");
  const setTimeline = useSetAtom(TimelineAtom);

  const onReady = useCallback(
    (e: GridviewReadyEvent) => {
      e.api.onDidLayoutChange(() => {
        console.log("layout changed");
        set(e.api.toJSON());
      });

      if (layout) {
        e.api.fromJSON(JSON.parse(layout));
      } else {
        const timeline = e.api.addPanel({
          id: "timeline",
          component: "timeline",
          params: {},
          minimumHeight: 200,
          minimumWidth: 200,
          priority: LayoutPriority.High,
        });

        const compositions = e.api.addPanel({
          id: "compositions",
          component: "compositions",
          params: {},
          minimumHeight: 200,
          minimumWidth: 200,
          priority: LayoutPriority.Low,
        });

        const player = e.api.addPanel({
          id: "player",
          component: "player",
          params: {
            title: "Panel 3",
          },
          position: { referencePanel: "compositions", direction: "right" },
          minimumHeight: 200,
          minimumWidth: 600,
          priority: LayoutPriority.High,
        });

        const properties = e.api.addPanel({
          id: "properties",
          component: "default",
          params: {
            title: "Properties",
          },
          position: { referencePanel: "player", direction: "right" },
          minimumHeight: 200,
          minimumWidth: 200,
          priority: LayoutPriority.Low,
        });

        timeline.api.setSize({ height: 500 });
        compositions.api.setSize({ width: 400 });
        properties.api.setSize({ width: 400 });
      }
    },
    [layout],
  );

  useEffect(() => {
    setTimeline(new TimelineController());
  }, []);

  return (
    <div className="h-screen w-full bg-neutral-950 text-white" style={{ flexGrow: 1 }}>
      {
        <GridviewReact
          onReady={onReady}
          proportionalLayout
          orientation={Orientation.VERTICAL}
          className="dockview-theme-abyss"
          components={{
            default: (props: IGridviewPanelProps<{ title: string }>) => {
              return <div style={{ padding: "20px", color: "white" }}>{props.params.title}</div>;
            },
            compositions: Compositions,
            player: Player,
            timeline: Timeline,
          }}
        />
      }
    </div>
  );
};

export default App;
