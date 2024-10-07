import React from "react";
import { z } from "zod";
import { LayerProps } from "./schema";
import { VideoReference } from "../../references/Video";
import { AudioReference } from "../../references/Audio";
import { ImageReference } from "../../references/Image";

type AnyComponent = z.infer<typeof LayerProps>["items"][0];

const Layer = (props: z.infer<typeof LayerProps>) => {
  const getComponent = (component: AnyComponent) => {
    switch (component.type) {
      case "references/audio":
        return <AudioReference {...component} />;

      case "references/img":
        return <ImageReference {...component} />;

      case "references/video":
        return <VideoReference {...component} />;

      default:
        const exhaustiveCheck: never = component;
        return <div />;
    }
  };

  return (
    <div>
      {props.items.map((w) => (
        <React.Fragment key={`${w.start}`}>{getComponent(w)}</React.Fragment>
      ))}
    </div>
  );
};

export { Layer };
