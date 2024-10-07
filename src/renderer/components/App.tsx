import { useCallback, useEffect, useRef } from "react";
import {
  GridviewApi,
  GridviewReact,
  GridviewReadyEvent,
  IGridviewPanelProps,
  LayoutPriority,
  Orientation,
  SerializedGridviewComponent,
} from "dockview";
import { useSetAtom } from "jotai";
import { DEFAULT_PROJECT } from "@fontinalia-constants/project";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { CompositionAtom } from "../state/composition";
import { Player } from "./Player";
import { Timeline } from "./Timeline";

import "dockview/dist/styles/dockview.css";
import { Composition } from "@fontinalia-shared/timeline";

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
export const App = () => {
  const { value: layout, set } = useLocalStorage<SerializedGridviewComponent>("layout");
  const api = useRef<GridviewApi>();
  const setTimeline = useSetAtom(CompositionAtom);

  const onReady = useCallback(
    (e: GridviewReadyEvent) => {
      api.current = e.api;

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

        e.api.addPanel({
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
    const timeline = Composition.fromJSONProject(DEFAULT_PROJECT);
    setTimeline(timeline);
  }, []);

  useEffect(() => {
    const onResize = () => api.current?.layout(window.innerWidth, window.innerHeight - 38, true);

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-full grid grid-rows-[36px_1fr] bg-neutral-950 text-neutral-50" style={{ flexGrow: 1 }}>
      <div className="h-[calc(100vh-30px)] overflow-hidden">
        <GridviewReact
          onReady={onReady}
          orientation={Orientation.VERTICAL}
          className="dockview-theme-abyss"
          components={{
            default: (props: IGridviewPanelProps<{ title: string }>) => {
              return <div style={{ padding: "20px", color: "white" }}>{props.params.title}</div>;
            },
            compositions: (props: IGridviewPanelProps<{ title: string }>) => {
              return <div style={{ padding: "20px", color: "white" }}>{props.params.title}</div>;
            },
            player: Player,
            timeline: Timeline,
          }}
        />
      </div>
    </div>
  );
};
