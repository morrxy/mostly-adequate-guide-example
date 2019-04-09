import { map, safeProp, safeHead } from './utils/point-free';
import { log } from './utils/helper';
import { compose } from './utils/essential-fn';

// firstAddressStreet :: User -> Maybe (Maybe (Maybe Street))
const firstAddressStreet = compose(
  map(map(safeProp('street'))),
  map(safeHead),
  safeProp('addresses')
);

const m1 = firstAddressStreet({
  addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }]
});

log(m1.$value);
log(m1.$value.$value);
log(m1.$value.$value.$value);
