export interface jsonObject {
  [key: string]: string | jsonObject | jsonArray | boolean;
}

export type JSON = jsonObject | string | boolean | number | jsonArray | jsonObject[] | number[] | string[] | boolean[];

export type jsonArray =  (string | number | boolean)[];

export interface extendable {
  url: string;
  apply: ModifierInterface;
}

export interface ModifierInterface {
  (body: object): any;
}

export interface applierInterface {
  (path: string, newValue: JSON): ModifierInterface;
}

export interface deleterInterface {
  (path: string): ModifierInterface;
}

export interface arrayModifierInterface {
  (path: string, element: JSON): ModifierInterface;
}

export interface ExtenderInterface {
  set: applierInterface;
  delete: deleterInterface;
  push: arrayModifierInterface;
  unshift: arrayModifierInterface;
}
