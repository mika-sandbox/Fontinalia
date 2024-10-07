import { z } from "zod";
import { Audio, Sequence } from "remotion";
import { AudioReferenceProps } from "./schema";
import { memo } from "react";
import { useServe } from "@fontinalia-remotion/hooks/useServe";

const AudioReference = memo((props: z.infer<typeof AudioReferenceProps>) => {
  const { serve } = useServe();

  return (
    <Sequence from={props.start} durationInFrames={props.length}>
      <Audio src={serve(props.path)} />
    </Sequence>
  );
});

export { AudioReference };
