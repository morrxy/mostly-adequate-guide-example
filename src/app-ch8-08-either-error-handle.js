import { log } from './utils/helper';
import moment from 'moment';
import { curry } from './utils/essential-fn';
import { Either, Left } from './utils/Either';

const left = x => new Left(x);

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed');
});

log(getAge(moment())({ birthDate: '2005-12-12' }).inspect());

log(getAge(moment())({ birthDate: 'July 4, 2001' }).inspect());
