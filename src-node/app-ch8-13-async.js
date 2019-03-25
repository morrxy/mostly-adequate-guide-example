import { Task } from '../src/utils/Task';
import { split, head } from '../src/utils/point-free';

// -- Node readFile example ------------------------------------------

const fs = require('fs');
const path = require('path');

// readFile :: String -> Task Error String
const readFile = filename =>
  new Task((reject, result) => {
    fs.readFile(filename, 'utf8', (err, data) => (err ? reject(err) : result(data)));
  });

const filePath = path.join(__dirname, 'metamorphosis');

const firstLine = readFile(filePath)
  .map(split('\n'))
  .map(head);

firstLine.fork(err => console.log(String(err)), str => console.log(str));
