import { LayerSchema } from "../../../remotion/components/metadata/Layer/schema";
import { ILayerItem, BaseLayerItem } from "../tracks/base";

type LayerArgs = {
  name: string;
  items?: ILayerItem[];
};

export class Layer {
  private _name: string;
  private readonly _items: ILayerItem[] = [];

  private constructor(opts: LayerArgs) {
    this._name = opts.name;
    if (opts.items) {
      this._items.push(...opts.items);
    }
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get items(): ILayerItem[] {
    return this._items;
  }

  public addLayerItem(item: ILayerItem): void {
    this._items.push(item);
  }

  public removeLayerItem(id: string): void {
    const index = this._items.findIndex((item) => item.id === id);
    this._items.splice(index, 1);
  }

  public static fromName(name: string): Layer {
    return new Layer({ name });
  }

  public static fromJSONProject(json: LayerSchema): Layer {
    return new Layer({
      name: json.name,
      items: json.items.map((item) => BaseLayerItem.fromJSONProject(item)),
    });
  }

  public toJSONProject(): LayerSchema {
    return {
      name: this._name,
      items: this._items.map((item) => item.toJsonProject()),
    };
  }
}
