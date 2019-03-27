import { compose } from './utils/essential-fn';
import { map, head, safeProp } from './utils/point-free';

// Given the following User object:
// Use `safeProp` and `head` to find the first initial of the user.
const user = { id: 2, name: 'Albert', active: true };
const user2 = { id: 22, active: true };

// initial :: User -> Maybe String
const initial = compose(
  map(head),
  safeProp('name')
);

console.log(initial(user).inspect());
console.log(initial(user2).inspect());
