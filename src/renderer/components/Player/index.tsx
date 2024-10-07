import { PlayerRef, Player as RemotionPlayer } from "@remotion/player";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Controller } from "./Controller";
import { RemotionAtom } from "../../state/remotion";
import { TimelineAtom } from "../../state/timeline";
import { DEFAULT_PROJECT } from "../../../constants/project";
import { JsonComposition } from "../../../remotion/components/metadata/Composition";
import { CompositionContext } from "@fontinalia-remotion/context";

const Player: React.FC = () => {
  const ref = useRef<PlayerRef>(null);
  const timeline = useAtomValue(TimelineAtom);
  const setRemotion = useSetAtom(RemotionAtom);
  const [isRepeating, setIsRepeating] = useState(false);
  const onToggleRepeat = useCallback((isRepeating: boolean) => {
    setIsRepeating(isRepeating);
  }, []);

  useEffect(() => {
    if (ref.current) {
      setRemotion(ref.current);
    }
  }, [setRemotion]);

  const project = timeline?.toJSON() ?? DEFAULT_PROJECT;

  return (
    <div className="h-full flex flex-col">
      <div className="h-full w-full">
          <CompositionContext.Provider value={{ port: 9271 }}>
        <RemotionPlayer
          ref={ref}
          component={JsonComposition}
          inputProps={project}
          durationInFrames={project.metadata.length}
          fps={project.metadata.rendering.framerate}
          compositionHeight={project.metadata.rendering.height}
          compositionWidth={project.metadata.rendering.width}
          style={{ width: "100%", height: "100%" }}
          doubleClickToFullscreen
          clickToPlay
          loop={isRepeating}
        />
          </CompositionContext.Provider>
      </div>
      <Controller onToggleRepeat={onToggleRepeat} />
    </div>
  );
};

export { Player };
