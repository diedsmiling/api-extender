export interface jsonObject {
  [key: string]: string | jsonObject | jsonArray;
}

export type jsonArray =  [string, number, boolean];

export interface extendable {
  url: string;
  apply: modifierInterface;
}

export interface modifierInterface {
  (body: object): any;
}

export interface applierInterface {
  (path: string, newValue: jsonObject): modifierInterface;
}

export interface ExtenderInterface {
  update: applierInterface;
}
