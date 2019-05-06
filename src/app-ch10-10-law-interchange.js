import { Task } from './utils/Task';
import { reverse } from './utils/point-free';

// interchange
// v.ap(A.of(x)) === A.of(f => f(x)).ap(v)

const v = Task.of(reverse);
const x = 'Sparklehorse';

const a1 = v.ap(Task.of(x));
const a2 = Task.of(f => f(x)).ap(v);

a1.fork(console.error, console.log);
a2.fork(console.error, console.log);
