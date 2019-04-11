import { Maybe } from './utils/Maybe';
import { add, safeProp, chain } from './utils/point-free';
import { log } from './utils/helper';
import { compose } from './utils/essential-fn';

// chain version
const m1 = Maybe.of(3).chain(three => Maybe.of(2).map(add(three)));

const m2 = Maybe.of(null)
  .chain(safeProp('address'))
  .chain(safeProp('street'));

log(m1.inspect());
log(m2.inspect());

// compose version
const m3Fn = compose(
  chain(n => Maybe.of(2).map(add(n))),
  Maybe.of
);

const m3 = m3Fn(3);
log(m3.inspect());
