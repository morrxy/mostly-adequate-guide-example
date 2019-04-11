import { log } from './utils/helper';
import { IO } from './utils/IO';
import { compose } from './utils/essential-fn';
import { chain, map, join } from './utils/point-free';

// querySelector :: Selector -> IO DOM
const querySelector = selector => new IO(() => window.document.querySelector(selector));

// chain version use chain
const io1 = querySelector('input.username').chain(({ value: uname }) =>
  querySelector('input.email').chain(({ value: email }) =>
    IO.of(`Welcome ${uname} prepare for spam at ${email}`)
  )
);

log(io1.unsafePerformIO());

// chain version use map
const io2 = querySelector('input.username').chain(({ value: uname }) =>
  querySelector('input.email').map(
    ({ value: email }) => `Welcome ${uname} prepare for spam at ${email}`
  )
);

log(io2.unsafePerformIO());

// compose version use chain
const io3Fn = compose(
  chain(unameEl =>
    querySelector('input.email').map(
      emailEl => `Welcome ${unameEl.value} prepare for spam at ${emailEl.value}`
    )
  ),
  querySelector
);

const io3 = io3Fn('input.username');

log(io3.unsafePerformIO());

// compose version use map
const io4Fn = compose(
  join,
  map(unameEl =>
    querySelector('input.email').map(
      emailEl => `Welcome ${unameEl.value} prepare for spam at ${emailEl.value}`
    )
  ),
  querySelector
);

const io4 = io4Fn('input.username');

log(io4.unsafePerformIO());
