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

// map :: Functor f => (a -> b) -> f a -> f b
const map = S.curry2((f, anyFunctor) => anyFunctor.map(f));

// safeHead :: [a] -> Maybe a
const safeHead = xs => Maybe.of(xs[0]);

// streetName :: Object -> Maybe String
const streetName = S.pipe([x => x.addresses, safeHead, map(x => x.street)]);

log(streetName({ addresses: [] }));
log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }));
