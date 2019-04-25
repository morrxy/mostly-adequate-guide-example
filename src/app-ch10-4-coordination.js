import { Task } from './utils/Task';
import { curry } from './utils/essential-fn';

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
