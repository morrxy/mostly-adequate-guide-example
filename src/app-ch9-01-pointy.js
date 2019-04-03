import { append, add, prop, map } from './utils/point-free';
import { Either } from './utils/Either';
import { IO } from './utils/IO';
import { Maybe } from './utils/Maybe';
import { Task } from './utils/Task';
import { log } from './utils/helper';

const p1 = IO.of('tetris').map(append(' master'));
log(p1.inspect());
log(p1.unsafePerformIO());

const p2 = Maybe.of(1336).map(add(1));
log(p2.inspect());

const p3 = Task.of([{ id: 2 }, { id: 3 }]).map(map(prop('id')));
log(p3.inspect());
p3.fork(console.error, console.log);

const p4 = Either.of('The past, present and future walk into a bar...').map(
  append('it was tense.')
);
log(p4.inspect());
