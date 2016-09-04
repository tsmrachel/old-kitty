var ExpensesList = React.createClass({
  renderExpenses: function(expense) {

    return ( <Expense key={ getMagicKey() } data={ expense } /> );
  },
  render: function() {

    return ( <ul className="collection ftest-expenseList">
               { this.props.data.map(this.renderExpenses) }
               </ul>
      );
  }
});

var ExpensesListPage = React.createClass({
  _onClick: function() {
    BrowserHistory.push("addExpense");
  },
  render: function() {

    var divStyle = {
      bottom: "45px",
      right: "24px"

    };

    return (<div>
              <Navbar title="Expenses" />
              <div className="container">
                <ExpensesList/>
              </div>
              <div className="fixed-action-btn" style={ divStyle }>
                <button className="btn-floating btn-large red ftest-plusButton" onClick={ this._onClick }>
                  +
                </button>
              </div>
            </div>
      );
  }
});
