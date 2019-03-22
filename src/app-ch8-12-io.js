import { log } from './utils/helper';
import { compose } from './utils/essential-fn';
import { split, map, filter, head, eq, last } from './utils/point-free';
import { Maybe } from './utils/Maybe';
import { IO } from './utils/IO';

// url :: IO String
const url = new IO(() => window.location.href);

// toPairs :: String -> [[String]]
const toPairs = compose(
  map(split('=')),
  split('&')
);

// params :: String -> [[String]]
const params = compose(
  toPairs,
  last,
  split('?')
);

// findParam :: String -> IO Maybe [String]
const findParam = key =>
  map(
    compose(
      Maybe.of,
      filter(
        compose(
          eq(key),
          head
        )
      ),
      params
    ),
    url
  );

// -- Impure calling code ----------------------------------------------
if (window.location.href.indexOf('searchTerm') === -1) {
  window.location.href = `${window.location.href}?searchTerm=wafflehouse`;
}

log(
  findParam('searchTerm')
    .unsafePerformIO()
    .inspect()
);
