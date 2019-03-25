import * as $ from 'jquery';
import { Task } from '../src/utils/Task';
import { curry } from '../src/utils/essential-fn';
import { prop } from '../src/utils/point-free';

// getJSON :: String -> {} -> Task Error JSON
const getJSON = curry(
  (url, params = {}) =>
    new Task((reject, result) => {
      $.getJSON(url, params, result).fail(reject);
    })
);

const title10 = getJSON('https://jsonplaceholder.typicode.com/todos/10').map(prop('title'));

title10.fork(err => console.log('reject: ' + err), result => console.log('result: ' + result));
