export interface ExtenderInterface {
  update(): boolean;
}

export class Extender implements ExtenderInterface {
  update() {
    console.log('adad');
    return true;
  }
}
