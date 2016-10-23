var React = require("react");
var Expense = require('components/expense/expenseComponent.jsx');
var connect = require('react-redux').connect;

var ExpensesList = React.createClass({

  //   componentDidMount() {
  //   this.props.dispatch(
  //     fetchExpenses()
  //   )
  // },
  renderExpenses: function(expense) {

    return ( <Expense key={ expense.expenseId } data={ expense } /> );
  },
  render: function() {

    return ( <ul className="collection ftest-expenseList">
               { this.props.data.map(this.renderExpenses) }
               </ul>
      );
  }
});

var mapStateToExpensesListProps = function(state) {
  return {
    data: state.expenses
  };
};

var ExpensesList = connect(mapStateToExpensesListProps)(ExpensesList);

module.exports = ExpensesList;