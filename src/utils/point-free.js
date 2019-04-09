import { curry, compose } from './essential-fn';
import { Maybe } from './Maybe';

// flip :: (a -> b -> c) -> b -> a -> c
export const flip = curry((fn, a, b) => fn(b, a));

// concat :: String -> String -> String
export const concat = curry((a, b) => a.concat(b));

// add :: Number -> Number -> Number
export const add = curry((a, b) => a + b);

// append :: String -> String -> String
export const append = flip(concat);

// append :: String -> String
// export const append = curry((str, str2) => `${str}${str2}`);

// eq :: Eq a => a -> a -> Boolean
export const eq = curry((a, b) => a === b);

// filter :: (a -> Boolean) -> [a] -> [a]
export const filter = curry((fn, xs) => xs.filter(fn));

// head :: [a] -> a
export const head = xs => xs[0];

// join :: Monad m => m (m a) -> m a
export const join = m => m.join();

// last :: [a] -> a
export const last = xs => xs[xs.length - 1];

// map :: Functor f => (a -> b) -> f a -> f b
export const map = curry((fn, f) => f.map(fn));

// match :: RegExp -> String -> Boolean
export const match = curry((re, str) => re.test(str));

// prop :: String -> Object -> a
export const prop = curry((p, obj) => obj[p]);

// safeHead :: [a] -> Maybe a
export const safeHead = compose(
  Maybe.of,
  head
);

// safeProp :: String -> Object -> Maybe a
export const safeProp = curry((p, obj) =>
  compose(
    Maybe.of,
    prop(p)
  )(obj)
);

// split :: String -> String -> [String]
export const split = curry((sep, str) => str.split(sep));

// toString :: a -> String
export const toString = String;

// toUpperCase :: String -> String
export const toUpperCase = s => s.toUpperCase();
