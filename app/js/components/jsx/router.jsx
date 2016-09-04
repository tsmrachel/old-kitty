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