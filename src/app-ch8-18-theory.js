import { compose } from './utils/essential-fn';
import { map, split } from './utils/point-free';
import { Maybe } from './utils/Maybe';
import { log } from './utils/helper';

const reverse = compose(
  x => x.join(''),
  x => x.reverse(),
  split('')
);

// topRoute :: String -> Maybe String
const topRoute = compose(
  Maybe.of,
  reverse
);

// bottomRoute :: String -> Maybe String
const bottomRoute = compose(
  map(reverse),
  Maybe.of
);

log(topRoute('hi').inspect());
log(bottomRoute('hi').inspect());
