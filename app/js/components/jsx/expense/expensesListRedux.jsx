var expensesListInitialState = [{
  expenseId: 0,
  amongst: "All",
  amongstWho: [],
  amount: "100",
  description: "cat toys",
  paidBy: "Me",
  paidByWho: [],
  shared: "Yes",
  split: "Equally",
  splitAmount: {}
}];

var expensesListReducer = function(state = expensesListInitialState, action) {

  switch (action.type) {

    case "NEW_EXPENSE":

      var newExpenses = state.concat([action.data]);
      var newState = Object.assign([], state, newExpenses);

      return newState;
    case "EDIT_EXPENSE":

      var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function(obj) {
        if (obj.expenseId == action.data.newState.expenseId) {
          return true;
        }

      });

      newState[indexOfObj] = action.data.newState;

      return newState;
    case "DELETE_EXPENSE":

      var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function(obj) {
        if (obj.expenseId == action.data.expenseId) {
          return true;
        }

      });

      if (indexOfObj > -1) {
        newState.splice(indexOfObj, 1);
      }

      return newState;
    default:

      return state;
  }

};

var mapStateToExpensesListProps = function(state) {
  return {
    data: state.data
  };
};

var ExpensesList = connect(mapStateToExpensesListProps)(ExpensesList);

