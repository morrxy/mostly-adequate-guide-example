import * as S from 'sanctuary';
import { log } from './utils/helper';
import * as moment from 'moment';

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

log(getAge(moment())({ birthDate: '2005-12-12' }).inspect());

log(getAge(moment())({ birthDate: 'July 4, 2001' }).inspect());
