import { z } from "zod";
import { OffthreadVideo, Sequence } from "remotion";
import { VideoReferenceProps } from "./schema";
import { memo } from "react";
import { useServe } from "@fontinalia-remotion/hooks/useServe";

const VideoReference = memo((props: z.infer<typeof VideoReferenceProps>) => {
  const { serve } = useServe();

  return (
    <Sequence from={props.start}>
      <OffthreadVideo src={serve(props.path)} />;
    </Sequence>
  );
});

export { VideoReference };
