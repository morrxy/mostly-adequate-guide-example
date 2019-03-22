import { log } from './utils/helper';
import { curry, compose } from './utils/essential-fn';
import { Maybe } from './utils/Maybe';

// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }
  return f(m.$value);
});

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((ammount, { balance }) =>
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
const finishTransaction = compose(
  remainingBalance,
  updateLedger
);

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(
  maybe("Your're broke!", finishTransaction),
  withdraw(20)
);

log(getTwenty({ balance: 200.0 }));
log(getTwenty({ balance: 10.0 }));
