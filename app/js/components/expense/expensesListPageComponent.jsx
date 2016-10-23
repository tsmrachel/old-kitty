var React = require("react");
var BrowserHistory = require('react-router').browserHistory
var Navbar = require('components/navbarComponent.jsx');
var ExpensesList = require('components/expense/expensesListComponent.jsx');

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

module.exports = ExpensesListPage;