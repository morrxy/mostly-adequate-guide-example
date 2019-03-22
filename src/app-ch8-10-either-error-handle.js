import { log } from './utils/helper';
import * as moment from 'moment';
import { curry, compose, identity } from './utils/essential-fn';
import { append, toString, add } from './utils/point-free';
import { Either, Left, Right } from './utils/Either';

const either = curry((f, g, e) => {
  let result;

  switch (e.constructor) {
    case Left:
      result = f(e.$value);
      break;

    case Right:
      result = g(e.$value);
      break;
  }

  return result;
});

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
  console.log,
  either(identity, fortune),
  getAge(moment())
);

log(zoltar({ birthDate: '2005-12-12' }));

log(zoltar({ birthDate: 'ballnoons!' }));
