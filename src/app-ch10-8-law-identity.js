import { identity } from './utils/essential-fn';
import { log } from './utils/helper';
import { Identity } from './utils/Identity';

// identity
// A.of(identity).ap(v) === v

const v = Identity.of('Pillow Pets');
const a = Identity.of(identity).ap(v);

log(v.inspect());
log(a.inspect());
