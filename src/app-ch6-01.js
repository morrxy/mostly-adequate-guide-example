import { compose, curry, map, prop } from 'ramda';
import * as $ from 'jquery';

// -- Utils ----------------------------------------------------------
const Impure = {
  getJSON: curry((callback, url) => $.getJSON(url, callback)),
  setHtml: curry((sel, html) => $(sel).html(html)),
  trace: curry((tag, x) => {
    console.log(tag, x);
    return x;
  })
};

// -- Pure -----------------------------------------------------------
const host = 'api.flickr.com';
const path = '/services/feeds/photos_public.gne';
const query = t => `?tags=${t}&format=json&jsoncallback=?`;
const url = t => `https://${host}${path}${query(t)}`;

const img = src => $('<img />', { src });
const mediaUrl = compose(
  prop('m'),
  prop('media')
);
const mediaUrls = compose(
  map(mediaUrl),
  prop('items')
);
const images = compose(
  map(img),
  mediaUrls
);

// -- Impure ---------------------------------------------------------
const render = compose(
  Impure.setHtml('#js-main'),
  images
);
const app = compose(
  Impure.getJSON(render),
  url
);

app('cats');
