import { Container } from './utils/Container';
import { add, map } from './utils/point-free';
import { log } from './utils/helper';

// We can't do this because the numbers are bottled up.
log(add(Container.of(2), Container.of(3)));

// Let's use our trusty map
const containerOfAdd2 = map(add, Container.of(2));
// Container(add(2))

const addFunctor = Container.of(2).chain(two => Container.of(3).map(add(two)));
log(addFunctor.inspect());

const addFunctor2 = Container.of(2)
  .map(two => Container.of(3).map(add(two)))
  .join();
log(addFunctor2.inspect());
