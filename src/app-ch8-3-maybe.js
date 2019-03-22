import { log } from './utils/helper';
import { match, add } from './utils/point-free';

class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  constructor(x) {
    this.$value = x;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  inspect() {
    return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
  }
}

log(
  Maybe.of('Malkovich Malkovich')
    .map(match(/a/gi))
    .inspect()
);

log(
  Maybe.of(null)
    .map(match(/a/gi))
    .inspect()
);

log(
  Maybe.of({ name: 'Boris' })
    .map(x => x.age)
    .map(add(10))
    .inspect()
);

log(
  Maybe.of({ name: 'Dinah', age: 14 })
    .map(x => x.age)
    .map(add(10))
    .inspect()
);
