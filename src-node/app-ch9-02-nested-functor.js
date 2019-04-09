import { map, head } from '../src/utils/point-free';
import { IO } from '../src/utils/IO';
import { log } from '../src/utils/helper';
import { compose } from '../src/utils/essential-fn';

const fs = require('fs');

// readFile :: String -> IO String
const readFile = filename => new IO(() => fs.readFileSync(filename, 'utf-8'));

// print :: String -> IO String
const print = x =>
  new IO(() => {
    console.log(x);
    return x;
  });

// cat :: String -> IO (IO String)
const cat = compose(
  map(print),
  readFile
);

const i1 = cat('.git/config');
log(i1.unsafePerformIO());
log(i1.unsafePerformIO().unsafePerformIO());

// catFirstChar :: String -> IO (IO String)
const catFirstChar = compose(
  map(map(head)),
  cat
);

const i2 = catFirstChar('.git/config');
log(i2.unsafePerformIO());
log(i2.unsafePerformIO().unsafePerformIO());
