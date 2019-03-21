import * as S from 'sanctuary';
import { log } from './utils/helper';

// split :: String -> String -> [String]
// const split = S.curry2((sep, str) => str.split(sep));
const split = sep => str => str.split(sep);

// head :: [a] -> a
const head = xs => xs[0];

// last :: [a] -> a
const last = xs => xs[xs.length - 1];

// map :: Functor f => (a -> b) -> f a -> f b
const map = S.curry2((fn, functor) => functor.map(fn));

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = S.curry2((fn, xs) => xs.filter(fn));

// eq :: Eq a => a -> a -> Boolean
const eq = S.curry2((a, b) => a === b);

class IO {
  static of(x) {
    return new IO(() => x);
  }

  constructor(fn) {
    this.$value = fn;
  }

  map(fn) {
    return new IO(S.compose(fn)(this.$value));
  }

  inspect() {
    return `IO(${this.$value})`;
  }
}

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

// url :: IO String
const url = new IO(() => window.location.href);

// toPairs :: String -> [[String]]
const toPairs = S.compose(map(split('=')))(split('&'));

// params :: String -> [[String]]
const params = S.pipe([split('?'), last, toPairs]);

const findParam = key => map(S.pipe([params, filter(S.compose(eq(key))(head)), Maybe.of]))(url);

// -- Impure calling code ----------------------------------------------
if (window.location.href.indexOf('searchTerm') === -1) {
  window.location.href = `${window.location.href}?searchTerm=wafflehouse`;
}

log(
  findParam('searchTerm')
    .$value()
    .inspect()
);
