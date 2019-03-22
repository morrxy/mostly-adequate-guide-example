import { log } from './utils/helper';
import { map, prop, safeHead } from './utils/point-free';
import { compose } from './utils/essential-fn';

// streetName :: Object -> Maybe String
const streetName = compose(
  map(prop('street')),
  safeHead,
  prop('addresses')
);

log(streetName({ addresses: [] }).inspect());
log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }).inspect());
