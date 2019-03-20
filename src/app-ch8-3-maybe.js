import * as S from 'sanctuary';
import { log } from './utils/helper';

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
    .map(S.test(/a/gi))
    .inspect()
);

log(
  Maybe.of(null)
    .map(S.test(/a/gi))
    .inspect()
);

log(
  Maybe.of({ name: 'Boris' })
    .map(x => x.age)
    .map(S.add(10))
    .inspect()
);

log(
  Maybe.of({ name: 'Dinah', age: 14 })
    .map(x => x.age)
    .map(S.add(10))
    .inspect()
);
