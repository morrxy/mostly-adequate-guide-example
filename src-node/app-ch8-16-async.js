import { Task } from '../src/utils/Task';
import { IO } from '../src/utils/IO';
import { Either, Left } from '../src/utils/Either';
import { compose, either } from '../src/utils/essential-fn';
import { map } from '../src/utils/point-free';

const fs = require('fs');
const path = require('path');

const left = x => new Left(x);

// readFile :: String -> Task Error String
const readFile = filename =>
  new Task((reject, result) => {
    fs.readFile(filename, 'utf8', (err, data) => (err ? reject(err) : result(data)));
  });

// Postgress.connect :: Url -> IO DbConnection
const Postgress = {
  connect: Url => new IO(() => `DbConnection of ${Url}`)
};

// runQuery :: DbConnection -> ResultSet
const runQuery = DbConnection => {
  const result = `query with ${JSON.stringify(DbConnection)}`;
  console.log(result);
};

// -- Pure application -------------------------------------------------

// dbUrl :: Config -> Either Error Url
const dbUrl = ({ username, pass, host, db }) => {
  if (username && pass && host && db) {
    return Either.of(`db:pg://${username}:${pass}@${host}5432/${db}`);
  }
  return left(Error('Invalid config!'));
};

// connectDb :: Config -> Either Error (IO DbConnection)
const connectDb = compose(
  map(Postgress.connect),
  dbUrl
);

// getConfig :: Filename -> Task Error (Either Error (IO Dbconnection))
const getConfig = compose(
  map(
    compose(
      connectDb,
      JSON.parse
    )
  ),
  readFile
);

// -- Impure calling code ----------------------------------------------
const configFile = path.join(__dirname, 'db.json');

getConfig(configFile).fork(
  () => console.log('could not redad file'),
  either(console.log, runQuery)
);
