import { z } from "zod";
import { AudioReferenceProps } from "../../../../remotion/components/references/Audio/constants";
import { BaseLayerItem } from "./BaseTrack";

class AudioReferenceItem extends BaseLayerItem<z.infer<typeof AudioReferenceProps>> {
  private _path: string;

  constructor({ path, start, length }: { path: string; start: number; length: number }) {
    super({ _start: start, _length: length });
    this._path = path;
  }

  public toJSON(): z.infer<typeof AudioReferenceProps> {
    return {
      type: "references/audio",
      path: this._path,
      start: this.start,
      length: this.length,
      metadata: {
        volume: 0,
        length: 0,
      },
    };
  }

  public static fromJSON(json: z.infer<typeof AudioReferenceProps>): AudioReferenceItem {
    return new AudioReferenceItem({
      start: json.start,
      length: json.metadata.volume,
      path: json.path,
    });
  }
}

export { AudioReferenceItem };
