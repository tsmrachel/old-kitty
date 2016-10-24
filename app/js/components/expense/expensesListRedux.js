let expensesListInitialState = [{
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

let expensesListReducer = function(state = expensesListInitialState, action) {

  let newState;
  let indexOfObj;

  switch (action.type) {

    case "RECEIVE_EXPENSES":
      console.log(action.expenses);

      newState = Object.assign([], action.expenses);
      return newState;

    case "NEW_EXPENSE":

      console.log(JSON.stringify(action.data));

      let newExpenses = state.concat([action.data]);
      newState = Object.assign([], state, newExpenses);

      return newState;

    case "EDIT_EXPENSE":

      newState = Object.assign([], state);

      indexOfObj = newState.findIndex(function(obj) {
        if (obj.expenseId === action.data.newState.expenseId) {
          return true;
        }

      });

      newState[indexOfObj] = action.data.newState;

      return newState;

    case "DELETE_EXPENSE":

      newState = Object.assign([], state);

      indexOfObj = newState.findIndex(function(obj) {
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

      newState = Object.assign([], state);

      indexOfObj = newState.findIndex(function(obj) {
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

