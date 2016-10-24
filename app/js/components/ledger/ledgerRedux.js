let ledgerInitialState = {
  fatpaws: {
    browncat: 0,
    calico: 0
  },
  calico: {
    browncat: 0,
    fatpaws: 0
  },
  browncat: {
    fatpaws: 0,
    calico: 0
  }

};

let minusExpense = function(state, action) {

  let newState = Object.assign({}, state);
  let actionData = (!!action.data.previousState) ? action.data.previousState : action.data;
  let owesWho = (actionData.paidBy === "Me") ? userData.name : actionData.paidByWho[0];
  let peopleSharingExpense = actionData.splitAmount;

  for (let person in peopleSharingExpense) {

    if (person === "Me") {
      person = userData.name;
    }

    if (person != owesWho) { //if you're person who paid, you don't owe yourself
      newState[person][owesWho] = newState[person][owesWho] - parseFloat(peopleSharingExpense[person]);
    }

  }

  return newState;
}

let addExpense = function(state, action) {

  let newState = Object.assign({}, state);
  let actionData = (!!action.data.newState) ? action.data.newState : action.data;
  let owesWho = (actionData.paidBy === "Me") ? userData.name : actionData.paidByWho[0];
  let peopleSharingExpense = actionData.splitAmount;

  for (let person in peopleSharingExpense) {

    if (person === "Me") {
      person = userData.name;
    }

    if (person != owesWho) {
      newState[person][owesWho] = newState[person][owesWho] + parseFloat(peopleSharingExpense[person]);
    }

  }

  return newState;
}

let ledgerReducer = function(state = ledgerInitialState, action) {

  let newState;

  switch (action.type) {

    case "EDIT_EXPENSE":

      newState = minusExpense(state, action);
      newState = addExpense(newState, action);
      return newState;

    case "NEW_EXPENSE":

      newState = addExpense(state, action);
      return newState;

    case "DELETE_EXPENSE":

      newState = minusExpense(state, action);
      return newState;

    default:

      return state;
  }

};

module.exports = ledgerReducer;