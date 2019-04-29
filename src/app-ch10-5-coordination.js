import { IO } from './utils/IO';
import { curry, compose } from './utils/essential-fn';
import { map, prop, liftA3 } from './utils/point-free';

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

// lift version
const signInLift = liftA3(signIn, getVal('#email'), getVal('#password'), IO.of(false));
console.log(signInLift.inspect());
console.log(signInLift.unsafePerformIO());
