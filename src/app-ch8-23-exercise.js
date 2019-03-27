import { compose } from './utils/essential-fn';
import { prop, map } from './utils/point-free';
import { Either, Left } from './utils/Either';

// append :: String -> String
const append = str => str2 => `${str}${str2}`;

const left = x => new Left(x);

// Given the following helper functions:
// showWelcome :: User -> String
const showWelcome = compose(
  append('Welcome '),
  prop('name')
);

// checkActive :: User -> Either String User
const checkActive = user => (user.active ? Either.of(user) : left('Your account is not active'));

// Write a function that uses `checkActive` and `showWelcome` to grant access or return the error.
// eitherWelcome :: User -> Either String String
const eitherWelcome = compose(
  map(showWelcome),
  checkActive
);

const user = { id: 2, name: 'Albert', active: true };
const user2 = { id: 3, name: 'John', active: false };

console.log(eitherWelcome(user).inspect());
console.log(eitherWelcome(user2).inspect());
