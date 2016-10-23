var connect = require('react-redux').connect;
var ExpensesList = require('components/expense/expensesListComponent.jsx');

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

    case "RECEIVE_EXPENSES" :
    console.log(action.expenses);

    var newState = Object.assign([],action.expenses);
    return newState;


    case "NEW_EXPENSE":

    console.log(JSON.stringify(action.data));

      var newExpenses = state.concat([action.data]);
      var newState = Object.assign([], state, newExpenses);

      return newState;

    case "EDIT_EXPENSE":

      var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function(obj) {
        if (obj.expenseId === action.data.newState.expenseId) {
          return true;
        }

      });

      newState[indexOfObj] = action.data.newState;

      return newState;

    case "DELETE_EXPENSE":

      var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function(obj) {
        if (obj.expenseId === action.data.expenseId) {
          return true;
        }

      });

      if (indexOfObj > -1) {
        newState.splice(indexOfObj, 1);
      }

      return newState;

      case "UPDATE_EXPENSE_SERVER_ID":

      //to be reformatted, to close to edit expense

       var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function(obj) {
        if (obj.expenseId === action.data.expenseId) {
          return true;
        }

      });

       newState[indexOfObj] = action.data;

      console.log("UPDATE_EXPENSE_SERVER_ID : ");
      console.log(newState);

      return newState;

    default:

      return state;
  }

};

module.exports = expensesListReducer;

