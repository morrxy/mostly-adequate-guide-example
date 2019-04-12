import { join, map, chain } from './utils/point-free';
import { compose, curry } from './utils/essential-fn';
import { IO } from './utils/IO';
import jQuery from 'jquery';

// log :: a -> IO a
// const log = x => IO.of(() => {
//   console.log(x)
//   return x
// })

// log :: a -> IO a
const log = x => {
  console.log(x);
  return IO.of(x);
};

// setStyle :: Selector -> CSSProps -> IO DOM
const setStyle = curry((sel, props) => new IO(() => jQuery(sel).css(props)));

// getItem :: String -> IO String
const getItem = key => new IO(() => window.localStorage.getItem(key));

// applyPreferences :: String -> IO DOM
const applyPreferences = compose(
  join,
  map(setStyle('#main')),
  join,
  map(log),
  map(JSON.parse),
  getItem
);

applyPreferences('preferences').unsafePerformIO();

// chain version
const applyPreferences2 = compose(
  chain(setStyle('#main2')),
  chain(log),
  map(JSON.parse),
  getItem
);

applyPreferences2('preferences').unsafePerformIO();
