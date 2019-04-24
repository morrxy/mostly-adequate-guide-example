import { Container } from './utils/Container';
import { add } from './utils/point-free';
import { log } from './utils/helper';

const add1 = Container.of(add(2)).ap(Container.of(3));
log(add1.inspect());

const add2 = Container.of(2)
  .map(add)
  .ap(Container.of(3));
log(add2.inspect());
