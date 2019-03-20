import { log } from './utils/helper';

class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}

// (a -> b) -> Container a -> Container b
Container.prototype.map = function(f) {
  return Container.of(f(this.$value));
};

log(Container.of(2).map(two => two + 2));
log(Container.of('flamethrowers').map(s => s.toUpperCase()));
log(
  Container.of('bombs')
    .map(x => `${x} away`)
    .map(x => x.length)
);
