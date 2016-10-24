const {
  createStore,
  applyMiddleware,
  combineReducers
} = require('redux');

const {
  Router,
  Route,
  browserHistory
} = require('react-router');

const Provider = require('react-redux').Provider;
const thunk = require('redux-thunk').default
const React = require("react");
const ReactDOM = require("react-dom");

const expensesListReducer = require('components/expense/expensesListRedux.js');
const ledgerReducer = require('components/ledger/ledgerRedux.js');

const ExpensesListPage = require('components/expense/expensesListPageComponent.jsx');
const AddExpensePage = require('components/expense/addExpensePageComponent.jsx');
const LedgerPage = require('components/ledger/ledgerComponent.jsx');

const app = combineReducers({
	// trips : tripsListReducer
  expenses: expensesListReducer,
  ledger: ledgerReducer,

});

global.store = createStore(app,applyMiddleware(thunk));

ReactDOM.render((

  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ ExpensesListPage } />
      <Route path="addExpense" component={ AddExpensePage } />
      <Route path="/expense/:expenseId" component={ AddExpensePage } />
      <Route path="ledger" component={ LedgerPage } />
    </Router>
  </Provider>
  ), document.getElementById("container"));