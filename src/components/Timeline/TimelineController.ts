import { z } from "zod";
import { CompositionProps } from "../../../remotion/components/metadata/Composition/constants";
import { LayerProps } from "../../../remotion/components/metadata/Layer/constants";
import { BaseLayerItem, ILayerItem } from "./Tracks/BaseTrack";
import { VideoReferenceItem } from "./Tracks/VideoTrack";
import { AudioReferenceItem } from "./Tracks/AudioTrack";
import { DEFAULT_PROJECT } from "../../constants";

type LayerArgs = {
  name: string;
  items?: ILayerItem[];
};

class Layer {
  private _name: string;
  private static _id = 0;
  private readonly _items: ILayerItem[] = [];

  public constructor(opts: LayerArgs) {
    this._name = opts.name;
    if (opts.items) {
      this._items.push(...opts.items);
    }
  }

  public static fromJSON(json: z.infer<typeof LayerProps>): Layer {
    return new Layer({
      name: `Layer ${++Layer._id}`,
      items: json.items.map((item) => BaseLayerItem.fromJSON(item)),
    });
  }

  public toJSON(): z.infer<typeof LayerProps> {
    return {
      items: this._items.map((item) => item.toJSON()),
    };
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public get items(): ILayerItem[] {
    return this._items;
  }
}

type TimelineControllerArgs = {
  metadata?: z.infer<typeof CompositionProps>["metadata"];
  layers?: Layer[];
};

class TimelineController {
  private readonly _layers: Layer[];
  private readonly _metadata: z.infer<typeof CompositionProps>["metadata"];

  public constructor(opts?: TimelineControllerArgs) {
    this._layers = opts?.layers || Array.from({ length: 10 }, (_, i) => new Layer({ name: `Layer ${i + 1}` }));
    this._metadata = opts?.metadata ?? DEFAULT_PROJECT.metadata;
  }

  public get totalFrames(): number {
    return this._metadata.length;
  }

  public get layers(): Layer[] {
    return this._layers;
  }

  public addLayer(): void {
    const count = this._layers.length;
    this._layers.push(new Layer({ name: `Layer ${count + 1}` }));
  }

  public removeLayer(index: number): void {
    this._layers.splice(index, 1);
  }

  public static fromJSON(json: z.infer<typeof CompositionProps>): TimelineController {
    return new TimelineController({
      metadata: json.metadata,
      layers: json.composition.layers.map((layer) => Layer.fromJSON(layer)),
    });
  }

  public toJSON(): z.infer<typeof CompositionProps> {
    return {
      metadata: this._metadata,
      composition: {
        layers: this._layers.map((layer) => layer.toJSON()),
      },
    };
  }
}

BaseLayerItem.register("references/video", VideoReferenceItem.fromJSON);
BaseLayerItem.register("references/audio", AudioReferenceItem.fromJSON);

export { Layer, TimelineController };
