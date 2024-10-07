import type { CompositionSchema } from "../../../remotion/components/metadata/Composition/schema";
import { DEFAULT_PROJECT } from "@fontinalia-constants/project";
import { Layer } from "./layer";

type CompositionArgs = {
  layers: Layer[];
  metadata: CompositionSchema["metadata"];
  resources: CompositionSchema["resources"];
};

export class Composition {
  private readonly _layers: Layer[];
  private readonly _metadata: CompositionSchema["metadata"];
  private readonly _resources: CompositionSchema["resources"];

  private constructor(opts?: CompositionArgs) {
    this._layers = opts?.layers ?? [];
    this._metadata = opts?.metadata ?? DEFAULT_PROJECT["metadata"];
    this._resources = opts?.resources ?? [];
  }

  public get title(): string {
    return this._metadata.title;
  }

  public get totalFrames(): number {
    return this._metadata.length;
  }

  public get framerate(): number {
    return this._metadata.rendering.framerate;
  }

  public get width(): number {
    return this._metadata.rendering.width;
  }

  public get height(): number {
    return this._metadata.rendering.height;
  }

  public get layers(): Layer[] {
    return this._layers;
  }

  public addLayer(name: string): void {
    this._layers.push(Layer.fromName(name));
  }

  public removeLayer(name: string): void {
    const index = this._layers.findIndex((layer) => layer.name === name);
    this._layers.splice(index, 1);
  }

  public static fromJSONProject(json: CompositionSchema): Composition {
    return new Composition({
      metadata: json.metadata,
      layers: json.composition.layers.map((layer) => Layer.fromJSONProject(layer)),
      resources: json.resources,
    });
  }

  public toJSONProject(): CompositionSchema {
    return {
      metadata: this._metadata,
      composition: {
        layers: this._layers.map((layer) => layer.toJSONProject()),
      },
      resources: this._resources,
    };
  }
}
