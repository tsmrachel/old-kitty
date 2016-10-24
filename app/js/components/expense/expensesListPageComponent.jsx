const React = require("react");
const browserHistory = require("react-router").browserHistory
const Navbar = require("components/navbarComponent.jsx");
const ExpensesList = require("components/expense/expensesListComponent.jsx");

class ExpensesListPage extends React.Component {

  onClick() {
    browserHistory.push("addExpense");
  };

  render() {

    let divStyle = {
      bottom: "45px",
      right: "24px"
    };

    return (<div>
              <Navbar title="Expenses" />
              <div className="container">
                <ExpensesList/>
              </div>
              <div className="fixed-action-btn" style={ divStyle }>
                <button className="btn-floating btn-large red ftest-plusButton" onClick={ this.onClick }>
                  +
                </button>
              </div>
            </div>
      );
  };
};

module.exports = ExpensesListPage;