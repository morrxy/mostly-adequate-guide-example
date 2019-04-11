import { log } from './utils/helper';
import { split, head } from './utils/point-free';
import { IO } from './utils/IO';

// querySelector :: Selector -> IO DOM
const querySelector = selector => new IO(() => window.document.querySelector(selector));

const io1 = querySelector('input.username').chain(({ value: uname }) =>
  querySelector('input.email').chain(({ value: email }) =>
    IO.of(`Welcome ${uname} prepare for spam at ${email}`)
  )
);

log(io1.unsafePerformIO());
