import { curry, compose, either } from './utils/essential-fn';
import { prop, map } from './utils/point-free';
import { Either, Left } from './utils/Either';
import { IO } from './utils/IO';

const left = x => new Left(x);

// append :: String -> String
const append = str => str2 => `${str}${str2}`;

// showWelcome :: User -> String
const showWelcome = compose(
  append('Welcome '),
  prop('name')
);

// We now consider the following functions:
// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map(() => user));

// save :: User -> IO User
const save = user => new IO(() => ({ ...user, saved: true }));

// Write a function `validateName` which checks whether a user has a name longer than 3 characters or return an error message. Then use `either`, `showWelcome` and `save` to write a `register` function to signup and welcome a user when the validation is ok. Remember either's two arguments must return the same type.

// validateName :: User -> Either String ()
// const validateName = undefined;
const validateName = user =>
  user.name.length > 3 ? Either.of(user) : left('user name must longer than 3 characters');

// register :: User -> IO String
// const register = compose(undefined, validateUser(validateName));
const saveAndWelcome = compose(
  map(showWelcome),
  save
);
const register = compose(
  either(IO.of, saveAndWelcome),
  validateUser(validateName)
);

const user = { id: 2, name: 'Albert', active: true };
const user2 = { id: 3, name: 'Jo', active: false };

console.log(register(user).unsafePerformIO());
console.log(register(user2).unsafePerformIO());
