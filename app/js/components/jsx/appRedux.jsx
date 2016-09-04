var app = combineReducers({
  data: expensesListReducer,
  ledger: ledgerReducer,

});

var store = createStore(app);

