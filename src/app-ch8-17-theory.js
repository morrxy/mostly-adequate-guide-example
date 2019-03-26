import { identity, compose } from './utils/essential-fn';
import { map, append } from './utils/point-free';
import { Container } from './utils/Container';
import { log } from './utils/helper';

const idLaw1 = map(identity);
const idLaw2 = identity;

log(idLaw1(Container.of(2)).inspect());
log(idLaw2(Container.of(2)).inspect());

const compLaw1 = compose(
  map(append(' world')),
  map(append(' cruel'))
);
const compLaw2 = map(
  compose(
    append(' world'),
    append(' cruel')
  )
);

log(compLaw1(Container.of('Goodbye')).inspect());
log(compLaw2(Container.of('Goodbye')).inspect());
