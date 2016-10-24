const React = require("react");
const Expense = require('components/expense/expenseComponent.jsx');
const connect = require('react-redux').connect;

class ExpensesList extends React.Component {

  //   componentDidMount() {
  //   this.props.dispatch(
  //     fetchExpenses()
  //   )
  // },

  renderExpenses(expense) {

    return ( <Expense key={ expense.expenseId } data={ expense } /> );
  };
  
  render() {

    return ( <ul className="collection ftest-expenseList">
               { this.props.data.map(this.renderExpenses) }
               </ul>
      );
  }
};

let mapStateToExpensesListProps = function(state) {
  return {
    data: state.expenses
  };
};

ExpensesList = connect(mapStateToExpensesListProps)(ExpensesList);

module.exports = ExpensesList;