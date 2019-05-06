import { Task } from './utils/Task';
import { Maybe } from './utils/Maybe';
import { compose } from './utils/essential-fn';
import { liftA2, concat } from './utils/point-free';
import { log } from './utils/helper';

const tOfM = compose(
  Task.of,
  Maybe.of
);

const t1 = liftA2(liftA2(concat), tOfM('Rainy Days and Mondays'), tOfM(' always get me down'));

log(t1.inspect());

t1.fork(console.error, x => {
  log(x.inspect());
  log(x.$value);
});
