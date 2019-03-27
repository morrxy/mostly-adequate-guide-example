import { map, add } from './utils/point-free';
import { Container } from './utils/Container';

// Use `add` and `map` to make a function that increments a value inside a functor.
// incrF :: Functor f => f Int -> f Int
const incrF = map(add(1));
console.log(incrF(Container.of(1)).inspect());
