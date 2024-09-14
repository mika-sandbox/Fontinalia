import { PlayerRef, Player as RemotionPlayer } from "@remotion/player";
import { useSetAtom } from "jotai";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Main } from "../../../remotion/MyComp/Main";
import { Controller } from "./Controller";
import { RemotionAtom } from "../../states/remotion";

const Player: React.FC = () => {
  const ref = useRef<PlayerRef>(null);
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

  return (
    <div className="h-full flex flex-col">
      <div className="h-full w-full">
        <RemotionPlayer
          ref={ref}
          component={Main}
          inputProps={{ title: "Hello, World!" }}
          durationInFrames={400}
          fps={60}
          compositionHeight={1080}
          compositionWidth={1920}
          style={{ width: "100%", height: "100%" }}
          doubleClickToFullscreen
          clickToPlay
          loop={isRepeating}
        />
      </div>
      <Controller onToggleRepeat={onToggleRepeat} />
    </div>
  );
};

export { Player };
