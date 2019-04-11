import * as $ from 'jquery';
import { Task } from '../src/utils/Task';
import { curry } from '../src/utils/essential-fn';

// -- jQuery getJSON example -----------------------------------------

// getJSON :: String -> {} -> Task Error JSON
const getJSON = curry(
  (url, params = {}) =>
    new Task((reject, resolve) => {
      $.getJSON(url, params, resolve).fail(reject);
    })
);

const post1UserPosts = getJSON('https://jsonplaceholder.typicode.com/posts/1').chain(post =>
  getJSON('https://jsonplaceholder.typicode.com/posts', { userId: post.userId })
);

post1UserPosts.fork(err => console.error(err), result => console.log(result));

const wrongPosts = getJSON('https://jsonplaceholder.typicode.com/posts/mypost').chain(post =>
  getJSON('https://jsonplaceholder.typicode.com/posts', { userId: post.userId })
);

wrongPosts.fork(err => console.error(err), result => console.log(result));
