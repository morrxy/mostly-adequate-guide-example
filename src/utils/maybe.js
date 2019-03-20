import * as S from 'sanctuary';

export class Maybe {
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

// map :: Functor f => (a -> b) -> f a -> f b
export const map = S.curry2((f, anyFunctor) => anyFunctor.map(f));
