import { LayerSchema } from "../../../remotion/components/metadata/Layer/schema";

type UnknownSchema = LayerSchema["items"][0];
type UnknownSchemaTypes = UnknownSchema["type"];
type Registrar = {
  [TKey in UnknownSchemaTypes]?: (parameters: Extract<UnknownSchema, { type: TKey }>) => ILayerItem;
};
type BaseLayerItemArgs<T> = {
  start: number;
  length: number;
  metadata: T;
};

export interface ILayerItem {
  get id(): string;
  get start(): number;
  get length(): number;
  toJsonProject(): UnknownSchema;
}

export abstract class BaseLayerItem<T extends UnknownSchema> implements ILayerItem {
  private _id: string;
  private _start: number;
  private _length: number;
  private _metadata: T["metadata"];
  private static _registrar: Registrar = {};

  public constructor(opts: { id: string } & BaseLayerItemArgs<T["metadata"]>) {
    this._id = opts.id;
    this._start = opts.start;
    this._length = opts.length;
    this._metadata = opts.metadata;
  }

  public get id(): string {
    return this._id;
  }

  public get start(): number {
    return this._start;
  }

  public get length(): number {
    return this._length;
  }

  public get metadata(): T["metadata"] {
    return this._metadata;
  }

  public abstract toJsonProject(): T;

  public static fromJSONProject(json: UnknownSchema): ILayerItem {
    const func = BaseLayerItem._registrar[json.type];
    if (func) {
      return func(json as any);
    }

    console.warn(`Unknown type: ${json.type}`);
    return { id: "", start: 0, length: 0, toJsonProject: () => json } as ILayerItem;
  }

  public static register<T extends keyof Registrar>(type: T, factory: Registrar[T]): void {
    BaseLayerItem._registrar[type] = factory;
  }
}
