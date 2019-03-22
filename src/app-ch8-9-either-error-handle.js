import { log } from './utils/helper';
import * as moment from 'moment';
import { curry, compose } from './utils/essential-fn';
import { append, toString, add, map } from './utils/point-free';
import { Either, Left } from './utils/Either';

const left = x => new Left(x);

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed');
});

// fortune :: Number -> String
const fortune = compose(
  append('If you survive, you will be '),
  toString,
  add(1)
);

// zoltar :: User -> Either(String, _)
const zoltar = compose(
  map(console.log),
  map(fortune),
  getAge(moment())
);

log(zoltar({ birthDate: '2005-12-12' }).inspect());

log(zoltar({ birthDate: 'ballnoons!' }).inspect());
