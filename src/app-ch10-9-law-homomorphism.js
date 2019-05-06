import { log } from './utils/helper';
import { Either } from './utils/Either';
import { toUpperCase } from './utils/point-free';

// homomorphism
// A.of(f).ap(A.of(x)) === A.of(f(x))

const a1 = Either.of(toUpperCase).ap(Either.of('oreos'));
const a2 = Either.of(toUpperCase('oreos'));

log(a1.inspect());
log(a2.inspect());
