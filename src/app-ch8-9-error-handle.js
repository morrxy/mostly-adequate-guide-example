import * as S from 'sanctuary';
import { log } from './utils/helper';
import * as moment from 'moment';

// map :: Functor f => (a -> b) -> f a -> f b
const map = S.curry2((f, anyFunctor) => anyFunctor.map(f));

class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

class Left extends Either {
  map() {
    return this;
  }

  inspect() {
    return `Left(${this.$value})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
  }

  inspect() {
    return `Right(${this.$value})`;
  }
}

const left = x => new Left(x);

// getAge :: Date -> User -> Either(String, Number)
const getAge = S.curry2((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed');
});

// fortune :: Number -> String
const fortune = S.pipe([S.add(1), String, x => `If you survive, you will be ${x}`]);

// zoltar :: User -> Either(String, _)
const zoltar = S.pipe([getAge(moment()), map(fortune), map(console.log)]);

log(zoltar({ birthDate: '2005-12-12' }).inspect());

log(zoltar({ birthDate: 'ballnoons!' }).inspect());
