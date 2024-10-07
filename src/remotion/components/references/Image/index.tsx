import { z } from "zod";
import { Sequence, Img } from "remotion";
import { ImageReferenceProps } from "./schema";
import { memo } from "react";
import { classnames } from "../../../../renderer/lib/classnames";
import { useServe } from "@fontinalia-remotion/hooks/useServe";

type Props = z.infer<typeof ImageReferenceProps>;

const getXPosition = (opts: Props["metadata"]["position"]["x"]): { [x: string]: string } => {
  switch (opts.base) {
    case "left":
      return { left: opts.offset + opts.unit };
    case "center":
      return { left: opts.offset + opts.unit, transform: "translateX(-50%)" };
    case "right":
      return { right: opts.offset + opts.unit };
  }
};

const getYPosition = (opts: Props["metadata"]["position"]["y"]): { [x: string]: string } => {
  switch (opts.base) {
    case "top":
      return { top: opts.offset + opts.unit };
    case "center":
      return { top: opts.offset + opts.unit, transform: "translateY(-50%)" };
    case "bottom":
      return { bottom: opts.offset + opts.unit };
  }
};

const ImageReference = memo((props: Props) => {
  const { serve } = useServe();
  const position = props.metadata.position;
  const scale = props.metadata.scale;
  return (
    <Sequence from={props.start} durationInFrames={props.length}>
      <div>
        <Img
          src={serve(props.path)}
          style={{
            ...getXPosition(position.x),
            ...getYPosition(position.y),
            transform: `scaleX(${scale * (props.metadata.flip ? -1 : 1)}) scaleY(${scale})`,
          }}
          className={classnames("absolute select-none")}
        />
      </div>
    </Sequence>
  );
});

export { ImageReference };
