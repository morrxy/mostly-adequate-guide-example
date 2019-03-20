import * as S from 'sanctuary';
import { log } from './utils/helper';

class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  constructor(x) {
    this.$value = x;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  inspect() {
    return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
  }
}

// map :: Functor f => (a -> b) -> f a -> f b
const map = S.curry2((f, anyFunctor) => anyFunctor.map(f));

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = S.curry2((ammount, { balance }) =>
  Maybe.of(
    balance >= ammount
      ? {
          balance: balance - ammount
        }
      : null
  )
);

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is ${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = S.compose(remainingBalance)(updateLedger);

// getTwenty :: Account -> Maybe(String)
const getTwenty = S.compose(map(finishTransaction))(withdraw(20));

log(getTwenty({ balance: 200.0 }));
log(getTwenty({ balance: 10.0 }));
