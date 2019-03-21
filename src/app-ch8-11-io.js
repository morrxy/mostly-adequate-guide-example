import * as S from 'sanctuary';
import { log } from './utils/helper';

// split :: String -> String -> [String]
const split = S.curry2((sep, str) => str.split(sep));

// head :: [a] -> a
const head = xs => xs[0];

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

// const ioWindow :: IO Window
const ioWindow = new IO(() => window);

const io1 = ioWindow.map(win => win.innerWidth);
log(io1.inspect());
log(io1.$value());

const io2 = ioWindow
  .map(x => x.location)
  .map(x => x.href)
  .map(split('/'));
log(io2.inspect());
log(io2.$value());

// $ :: String -> IO [DOM]
const $ = selector => new IO(() => window.document.querySelectorAll(selector));

const io3 = $('#myDiv')
  .map(head)
  .map(div => div.innerHTML);
log(io3.inspect());
log(io3.$value());
