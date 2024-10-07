import { z } from "zod";
import { OffthreadVideo, Sequence, staticFile } from "remotion";
import { VideoReferenceProps } from "./schema";
import { memo } from "react";

const VideoReference = memo((props: z.infer<typeof VideoReferenceProps>) => {
  return (
    <Sequence from={props.start}>
      <OffthreadVideo src={staticFile(props.path)} />;
    </Sequence>
  );
});

export { VideoReference };
