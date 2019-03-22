import { log } from './utils/helper';

class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

class Left extends Either {
  map() {
    return this;
  }

  inspect() {
    return `Left(${this.$value})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
  }

  inspect() {
    return `Right(${this.$value})`;
  }
}

const left = x => new Left(x);

log(
  Either.of('rain')
    .map(str => `b${str}`)
    .inspect()
);

log(
  left('rain')
    .map(str => `It's gonna ${str}, better bring your umbrella!`)
    .inspect()
);

log(
  Either.of({ host: 'localhost', port: 80 })
    .map(x => x.host)
    .inspect()
);

log(
  left('rolls eyes...')
    .map(x => x.host)
    .inspect()
);
