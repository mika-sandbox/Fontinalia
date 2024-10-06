import { z } from "zod";
import { VideoReferenceProps } from "../../../../remotion/components/references/Video/constants";
import { BaseLayerItem } from "./BaseTrack";

class VideoReferenceItem extends BaseLayerItem<z.infer<typeof VideoReferenceProps>> {
  private _path: string;

  constructor({ path, start, length }: { path: string; start: number; length: number }) {
    super({ _start: start, _length: length });
    this._path = path;
  }

  public toJSON(): z.infer<typeof VideoReferenceProps> {
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

  public static fromJSON(json: z.infer<typeof VideoReferenceProps>): VideoReferenceItem {
    return new VideoReferenceItem({
      start: json.start,
      length: json.metadata.volume,
      path: json.path,
    });
  }
}

export { VideoReferenceItem };
