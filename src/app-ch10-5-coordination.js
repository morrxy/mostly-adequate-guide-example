import { IO } from './utils/IO';
import { curry, compose } from './utils/essential-fn';
import { map, prop } from './utils/point-free';

// $ :: String -> IO DOM
const $ = selector => new IO(() => window.document.querySelector(selector));

// getVal :: String -> IO String
const getVal = compose(
  map(prop('value')),
  $
);

// signIn :: String -> String -> Boolean -> User
const signIn = curry((username, password, rememberMe) => {
  console.log(`start signIn with ${username} ${password} ${rememberMe}`);
  return 'the User';
});

const signInAp = IO.of(signIn)
  .ap(getVal('#email'))
  .ap(getVal('#password'))
  .ap(IO.of(false));

console.log(signInAp.inspect());
console.log(signInAp.unsafePerformIO());
