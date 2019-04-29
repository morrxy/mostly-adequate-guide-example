import { Task } from './utils/Task';
import { curry } from './utils/essential-fn';
import { liftA2 } from './utils/point-free';

// Http.get :: String -> Task Error HTML
const Http = {
  get: str => Task.of(`use ${str} get sth...`)
};

const renderPage = curry((destinations, events) => {
  /* render page */
});

Task.of(renderPage)
  .ap(Http.get('/destinations'))
  .ap(Http.get('/events'));
// Task("<div>some page with dest and events</div>")

// lift version
liftA2(renderPage, Http.get('/destinations'), Http.get('/events'));
