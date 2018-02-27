export interface jsonObject {
  [key: string]: string | jsonObject | jsonArray;
}

export type jsonArray =  [string, number, boolean];

export interface extendable {
  url: string;
}
