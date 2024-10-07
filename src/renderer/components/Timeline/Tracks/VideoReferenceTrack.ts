import { z } from "zod";
import { BaseLayerItem } from "./BaseTrack";
import { VideoReferenceProps } from "../../../../remotion/components/references/Video/schema";

type VideoReferencePropsT = z.infer<typeof VideoReferenceProps>;

type VideoReferenceItemArgs = {
  path: string;
  start: number;
  length: number;
  metadata: VideoReferencePropsT["metadata"];
};

class VideoReferenceItem extends BaseLayerItem<VideoReferencePropsT> {
  private _path: string;

  constructor({ path, start, length, metadata }: VideoReferenceItemArgs) {
    super({ _start: start, _length: length, _metadata: metadata });
    this._path = path;
  }

  public toJSON(): VideoReferencePropsT {
    return {
      type: "references/video",
      path: this._path,
      start: this.start,
      length: this.length,
      metadata: {
        volume: 0,
        length: 0,
      },
    };
  }

  public static fromJSON(json: VideoReferencePropsT): VideoReferenceItem {
    return new VideoReferenceItem({
      start: json.start,
      length: json.metadata.volume,
      path: json.path,
      metadata: json.metadata,
    });
  }
}

export { VideoReferenceItem };
