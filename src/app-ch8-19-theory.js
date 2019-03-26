import { map, toUpperCase } from './utils/point-free';
import { compose } from './utils/essential-fn';
import { Either, Left } from './utils/Either';
import { Task } from './utils/Task';

const left = x => new Left(x);

const nested = Task.of([Either.of('pillows'), left('no sleep for you')]);

const t = map(map(map(toUpperCase)), nested);

t.fork(
  err => console.log('err: ', err),
  compose(
    console.log,
    x => x.join(', '),
    map(x => x.inspect())
  )
);
