import { z } from "zod";
import { staticFile, Sequence } from "remotion";
import { ImageReferenceProps } from "./constants";
import { memo } from "react";

const ImageReference = memo((props: z.infer<typeof ImageReferenceProps>) => {
  return (
    <Sequence from={props.start}>
      <img src={staticFile(props.path)} />
    </Sequence>
  );
});

export { ImageReference };
