import { map, chain } from '../src/utils/point-free';
import { Task } from '../src/utils/Task';
import { Either, Left } from '../src/utils/Either';
import { compose, either } from '../src/utils/essential-fn';

import fs from 'fs';
import path from 'path';
import https from 'https';

const left = x => new Left(x);

// checkFilename :: a -> Either String String
const checkFilename = filename =>
  typeof filename !== 'string' || filename === '' ? left('filename error') : Either.of(filename);

// readFilename :: String -> Task Error String
const readFilename = filename =>
  new Task((reject, resolve) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

// readFile :: Filename -> Either String (Task Error String)
const readFile = compose(
  map(readFilename),
  checkFilename
);

// httpPost :: String -> String -> Task Error JSON
const httpPost = url => postData =>
  new Task((reject, resolve) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    };

    const chunkList = [];

    const req = https.request(url, options, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        chunkList.push(chunk);
      });
      res.on('end', () => {
        resolve(chunkList.join(''));
      });
    });

    req.on('error', e => {
      console.error(`problem with request: ${e.message}`);
      reject(e.message);
    });

    req.write(postData);
    req.end();
  });

// upload :: String -> Either String (Task Error JSON)
const upload = compose(
  map(chain(httpPost('https://jsonplaceholder.typicode.com/posts'))),
  readFile
);

const handleUpload = compose(
  either(console.error, t => t.fork(console.error, console.log)),
  upload
);

handleUpload();
handleUpload('wrongFilePath');
handleUpload(path.join(__dirname, 'postData'));
