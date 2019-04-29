import { add, liftA2 } from './utils/point-free';
import { log } from './utils/helper';
import { Maybe } from './utils/Maybe';
import { Task } from './utils/Task';

// F.of(x).map(f) === F.of(f).ap(F.of(x))

const m = Maybe.of(add)
  .ap(Maybe.of(2))
  .ap(Maybe.of(3));

log(m.inspect());

// lift version
log(liftA2(add, Maybe.of(2), Maybe.of(3)).inspect());

const t = Task.of(add)
  .ap(Task.of(2))
  .ap(Task.of(3));

log(t.inspect());

t.fork(console.error, console.log);
