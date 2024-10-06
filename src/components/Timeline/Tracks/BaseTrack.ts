import { z } from "zod";
import { LayerProps } from "../../../../remotion/components/metadata/Layer/constants";

type BaseLayerItemArgs = {
  _start: number;
  _length: number;
};

type UnknownProps = z.infer<typeof LayerProps>["items"][0];
type TrackTypes = UnknownProps["type"];

type Registrar = { [TKey in TrackTypes]?: (parameters: Extract<UnknownProps, { type: TKey }>) => ILayerItem };

export interface ILayerItem {
  get start(): number;
  get length(): number;
  toJSON(): UnknownProps;
}

abstract class BaseLayerItem<T extends UnknownProps> implements ILayerItem {
  private _start: number;
  private _length: number;
  private static _registrar: Registrar = {};

  public constructor(opts: BaseLayerItemArgs) {
    this._start = opts._start;
    this._length = opts._length;
  }

  public get start(): number {
    return this._start;
  }

  public get length(): number {
    return this._length;
  }

  public abstract toJSON(): T;

  public static fromJSON(json: z.infer<typeof LayerProps>["items"][0]): ILayerItem {
    const func = BaseLayerItem._registrar[json.type];
    if (func) {
      return func(json as any);
    }

    console.warn(`Unknown type: ${json.type}`);
    return { start: 0, length: 0, toJSON: () => json } as ILayerItem;
    // throw new Error(`Unknown type: ${json.type}`);
  }

  public static register<T extends keyof Registrar>(type: T, factory: Registrar[T]): void {
    BaseLayerItem._registrar[type] = factory;
  }
}

export { BaseLayerItem };
