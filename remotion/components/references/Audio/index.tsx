import { z } from "zod";
import { staticFile, Audio, Sequence } from "remotion";
import { AudioReferenceProps } from "./constants";
import { memo } from "react";

const AudioReference = memo((props: z.infer<typeof AudioReferenceProps>) => {
  return (
    <Sequence from={props.start}>
      <Audio src={staticFile(props.path)} />
    </Sequence>
  );
});

export { AudioReference };
