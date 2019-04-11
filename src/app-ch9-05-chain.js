import { map, safeProp, safeHead, join, chain } from './utils/point-free';
import { log } from './utils/helper';
import { compose } from './utils/essential-fn';

// firstAddressStreet :: User -> Maybe Street
// map/join version
const firstAddressStreet = compose(
  join,
  map(safeProp('street')),
  join,
  map(safeHead),
  safeProp('addresses')
);

// chain version
const firstAddressStreet2 = compose(
  chain(safeProp('street')),
  chain(safeHead),
  safeProp('addresses')
);

// test data
const d1 = {
  addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }]
};

const d2 = {
  addr: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }]
};

log(firstAddressStreet(d1).inspect());
log(firstAddressStreet(d1).$value);

log(firstAddressStreet(d2).inspect());
log(firstAddressStreet(d2).$value);

log(firstAddressStreet2(d1).inspect());
log(firstAddressStreet2(d1).$value);

log(firstAddressStreet2(d2).inspect());
log(firstAddressStreet2(d2).$value);
