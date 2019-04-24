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

  join() {
    return this.$value;
  }

  chain(f) {
    return this.map(f).join();
  }

  ap(otherContainer) {
    return otherContainer.map(this.$value);
  }

  inspect() {
    return `Container(${this.$value})`;
  }
}
