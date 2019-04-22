import { safeProp, chain, map, join } from './utils/point-free';
import { log } from './utils/helper';
import { compose } from './utils/essential-fn';

// Considering a User object as follow:
const user = {
  id: 1,
  name: 'Albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St'
    }
  }
};

const user2 = {};

// Use `safeProp` and `map/join` or `chain` to safely get the street name when given a user
// getStreetName :: User -> Maybe String
const getStreetName = compose(
  join,
  map(safeProp('name')),
  join,
  map(safeProp('street')),
  safeProp('address')
);

const getStreetName2 = compose(
  chain(safeProp('name')),
  chain(safeProp('street')),
  safeProp('address')
);

log(getStreetName(user).inspect());
log(getStreetName(user2).inspect());
log(getStreetName2(user).inspect());
log(getStreetName2(user2).inspect());
