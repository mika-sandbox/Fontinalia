type KeyframeArgs = {
  time: number;
  value: number;
};

class Keyframe {
  private _time: number;
  private _value: number;

  public constructor(opts: KeyframeArgs) {
    this._time = opts.time;
    this._value = opts.value;
  }

  public static fromJSON(json: any): Keyframe {
    return new Keyframe({
      time: json.time,
      value: json.value,
    });
  }
}

type LayerArgs = {
  name: string;
  keyframes?: Keyframe[];
};

class Layer {
  private _name: string;
  private readonly _keyframes: Keyframe[] = [];

  public constructor(opts: LayerArgs) {
    this._name = opts.name;
    if (opts.keyframes) {
      this._keyframes.push(...opts.keyframes);
    }
  }

  public static fromJSON(json: any): Layer {
    return new Layer({
      name: json.name,
      keyframes: json.keyframes.map((keyframe: any) => Keyframe.fromJSON(keyframe)),
    });
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public get keyframes(): Keyframe[] {
    return this._keyframes;
  }
}

type TimelineControllerArgs = {
  layers?: Layer[];
};

class TimelineController {
  private readonly _layers: Layer[];

  public constructor(opts?: TimelineControllerArgs) {
    this._layers = opts?.layers || Array.from({ length: 10 }, (_, i) => new Layer({ name: `Layer ${i + 1}` }));
  }

  public get totalFrames(): number {
    return 400;
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

  public static fromJSON(json: any): TimelineController {
    return new TimelineController({
      layers: json.layers.map((layer: any) => Layer.fromJSON(layer)),
    });
  }
}

export { Keyframe, Layer, TimelineController };
