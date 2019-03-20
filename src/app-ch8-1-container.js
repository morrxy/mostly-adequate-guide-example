import { log } from './utils/helper';

class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}

log(Container.of(3));
log(Container.of('hotdogs'));
log(Container.of(Container.of({ name: 'yoda' })));
