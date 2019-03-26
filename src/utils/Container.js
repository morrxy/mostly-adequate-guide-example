export class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }

  map(f) {
    return Container.of(f(this.$value));
  }

  inspect() {
    return `Container(${this.$value})`;
  }
}
