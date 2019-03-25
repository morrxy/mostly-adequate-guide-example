import { Task } from '../src/utils/Task';

// We can put normal, non futuristic values inside as well
const threeAdd1 = Task.of(3).map(three => three + 1);

threeAdd1.fork(err => console.log(err), result => console.log(result));
