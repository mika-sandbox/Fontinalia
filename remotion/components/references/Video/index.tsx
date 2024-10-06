import { z } from "zod";
import { OffthreadVideo, Sequence, staticFile, Video } from "remotion";
import { VideoReferenceProps } from "./constants";
import { memo } from "react";

const VideoReference = memo((props: z.infer<typeof VideoReferenceProps>) => {
  return (
    <Sequence from={props.start}>
      <OffthreadVideo src={staticFile(props.path)} />;
    </Sequence>
  );
});

export { VideoReference };
