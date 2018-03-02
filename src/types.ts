export interface jsonObject {
  [key: string]: string | jsonObject | jsonArray | boolean;
}

export type JSON = jsonObject | string | boolean | number | jsonArray | jsonObject[] | number[] | string[] | boolean[];

export type jsonArray =  (string | number | boolean)[];

export interface extendable {
  url: string;
  apply: modifierInterface;
}

export interface modifierInterface {
  (body: object): any;
}

export interface applierInterface {
  (path: string, newValue: JSON): modifierInterface;
}

export interface ExtenderInterface {
  update: applierInterface;
}
