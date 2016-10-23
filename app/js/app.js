var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;
var thunk = require('redux-thunk').default
var Router = require('react-router').Router
var Route = require('react-router').Route
var Provider = require('react-redux').Provider
var BrowserHistory = require('react-router').browserHistory
var React = require("react");
var ReactDOM = require("react-dom");

var expensesListReducer = require('components/expense/expensesListRedux.js');
var ledgerReducer = require('components/ledger/ledgerRedux.js');

var ExpensesListPage = require('components/expense/expensesListPageComponent.jsx');
var AddExpensePage = require('components/expense/addExpensePageComponent.jsx');
var LedgerPage = require('components/ledger/ledgerComponent.jsx');

var app = combineReducers({
	// trips : tripsListReducer
  expenses: expensesListReducer,
  ledger: ledgerReducer,

});

global.store = createStore(app,applyMiddleware(thunk));

ReactDOM.render((

  <Provider store={ store }>
    <Router history={ BrowserHistory }>
      <Route path="/" component={ ExpensesListPage } />
      <Route path="addExpense" component={ AddExpensePage } />
      <Route path="/expense/:expenseId" component={ AddExpensePage } />
      <Route path="ledger" component={ LedgerPage } />
    </Router>
  </Provider>
  ), document.getElementById("container"));