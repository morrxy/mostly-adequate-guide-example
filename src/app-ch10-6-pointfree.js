import { IO } from './utils/IO';
import { curry } from './utils/essential-fn';
import { liftA2 } from './utils/point-free';
import { Either, Left } from './utils/Either';
import { log } from './utils/helper';

const left = x => new Left(x);

// checkEmail :: User -> Either String Email
const checkEmail = ({ email }) =>
  email.indexOf('@') !== -1 ? Either.of(email) : left('invalid email');

// checkName :: User -> Either String String
const checkName = ({ name }) => (name.length > 0 ? Either.of(name) : left('invalid name'));

const user = {
  name: 'John Doe',
  email: 'blurp_blurp'
};

const user2 = {
  name: 'John Doe',
  email: 'blurp@blurp.com'
};

// createUser :: Email -> String -> IO User
const createUser = curry((email, name) => IO.of({ email, name }));

const create1 = Either.of(createUser)
  .ap(checkEmail(user))
  .ap(checkName(user));
log(create1.inspect());
// Left('invalid email)

const create2 = liftA2(createUser, checkEmail(user), checkName(user));
log(create2.inspect());
// Left('invalid email)

const create11 = Either.of(createUser)
  .ap(checkEmail(user2))
  .ap(checkName(user2));
log(create11.$value.unsafePerformIO());
// {email: "blurp@blurp.com", name: "John Doe"}

const create22 = liftA2(createUser, checkEmail(user2), checkName(user2));
log(create22.$value.unsafePerformIO());
// {email: "blurp@blurp.com", name: "John Doe"}
