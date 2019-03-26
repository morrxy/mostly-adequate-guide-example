import { map, append } from './utils/point-free';
import { compose } from './utils/essential-fn';
import { Task } from './utils/Task';
import { Maybe } from './utils/Maybe';

class Compose {
  constructor(fgx) {
    this.getCompose = fgx;
  }

  static of(fgx) {
    return new Compose(fgx);
  }

  map(fn) {
    return new Compose(map(map(fn), this.getCompose));
  }
}

const tmd = Task.of(Maybe.of('Rock over London'));

const ctmd = Compose.of(tmd);

const ctmd2 = map(append(', rock on, Chicago'), ctmd);

ctmd2.getCompose.fork(
  console.log,
  compose(
    console.log,
    x => x.inspect()
  )
);
