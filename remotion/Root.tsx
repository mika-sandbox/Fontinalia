import { Composition } from "remotion";
import { COMP_NAME, DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../types/constants";

import CompositionProps from "./sample.json" assert { type: "json" };
import { JsonComposition } from "./components/metadata/Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={JsonComposition}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={CompositionProps as any}
      />
    </>
  );
};
