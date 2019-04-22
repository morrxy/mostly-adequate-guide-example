import { chain, map, split, last } from './utils/point-free';
import { compose } from './utils/essential-fn';
import { IO } from './utils/IO';

// consider the following functions

// getFile :: () -> IO String
const getFile = () => IO.of('/home/mostly-adequate/ch09.md');

// pureLog :: String -> IO ()
const pureLog = str => new IO(() => console.log(str));

// Use getFile to get the filepath, remove the directory and keep only the basename, then purely log it. Hint: you may want to use `split` and `last` to obtain the basename from a filepath.

const basename = compose(
  last,
  split('/')
);

// logFilename :: IO ()
const logFilename = compose(
  chain(pureLog),
  map(basename),
  getFile
);

logFilename().unsafePerformIO();
