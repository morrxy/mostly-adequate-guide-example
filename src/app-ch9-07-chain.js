import $ from 'jquery';
import { Task } from '../src/utils/Task';
import { curry, compose } from '../src/utils/essential-fn';
import { chain } from './utils/point-free';

// -- jQuery getJSON example -----------------------------------------

// getJSON :: String -> {} -> Task Error JSON
const getJSON = curry(
  (url, params = {}) =>
    new Task((reject, resolve) => {
      $.getJSON(url, params, resolve).fail(reject);
    })
);

// chain version
const post1UserPosts = getJSON('https://jsonplaceholder.typicode.com/posts/1').chain(post =>
  getJSON('https://jsonplaceholder.typicode.com/posts', { userId: post.userId })
);

post1UserPosts.fork(err => console.error(err), result => console.log(result));

// compose version
const post1UserPosts2Fn = compose(
  chain(post => getJSON('https://jsonplaceholder.typicode.com/posts', { userId: post.userId })),
  getJSON
);

const post1UserPosts2 = post1UserPosts2Fn('https://jsonplaceholder.typicode.com/posts/1');

post1UserPosts2.fork(err => console.error(err), result => console.log(result));

// wrong example
// const wrongPosts = getJSON('https://jsonplaceholder.typicode.com/posts/wrongid').chain(post =>
//   getJSON('https://jsonplaceholder.typicode.com/posts', { userId: post.userId })
// );

// wrongPosts.fork(err => console.error(err), result => console.log(result));
