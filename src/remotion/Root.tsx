import { z } from "zod";
import { Composition } from "remotion";

import { JsonComposition } from "./components/metadata/Composition";
import { CompositionProps } from "./components/metadata/Composition/schema";
import { CompositionContext } from "./context";

const getMetadataFromJson = (): z.infer<typeof CompositionProps> => {
  const data = CompositionProps.safeParse({});
  if (data.success) {
    return data.data;
  }

  throw new Error(`Invalid Project: \n${JSON.stringify(data.error.format(), null, 2)}`);
};

export const RemotionRoot: React.FC = () => {
  const json = getMetadataFromJson();

  return (
    <CompositionContext.Provider value={{ port: 9271 }}>
      <Composition
        id={json.metadata.title}
        component={JsonComposition}
        durationInFrames={json.metadata.length}
        fps={json.metadata.rendering.framerate}
        width={json.metadata.rendering.width}
        height={json.metadata.rendering.height}
        defaultProps={json}
      />
    </CompositionContext.Provider>
  );
};
