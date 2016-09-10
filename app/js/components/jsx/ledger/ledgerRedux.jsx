var ledgerInitialState = {
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

var minusExpense = function(state, action) {

  var newState = Object.assign({}, state);
  var actionData = (!!action.data.previousState) ? action.data.previousState : action.data;
  var owesWho = (actionData.paidBy == "Me") ? userData.name : actionData.paidByWho[0];
  var peopleSharingExpense = actionData.splitAmount;

  for (var person in peopleSharingExpense) {

    if (person == "Me") {
      person = userData.name;
    }

    if (person != owesWho) { //if you're person who paid, you don't owe yourself
      newState[person][owesWho] = newState[person][owesWho] - parseFloat(peopleSharingExpense[person]);
    }

  }

  return newState;
}

var addExpense = function(state, action) {

  var newState = Object.assign({}, state);
  var actionData = (!!action.data.newState) ? action.data.newState : action.data;
  var owesWho = (actionData.paidBy == "Me") ? userData.name : actionData.paidByWho[0];
  var peopleSharingExpense = actionData.splitAmount;

  for (var person in peopleSharingExpense) {

    if (person == "Me") {
      person = userData.name;
    }

    if (person != owesWho) {
      newState[person][owesWho] = newState[person][owesWho] + parseFloat(peopleSharingExpense[person]);
    }

  }

  return newState;
}

var ledgerReducer = function(state = ledgerInitialState, action) {

  switch (action.type) {

    case "EDIT_EXPENSE":

      var newState = minusExpense(state, action);
      newState = addExpense(newState, action);
      return newState;

    case "NEW_EXPENSE":

      var newState = addExpense(state, action);
      return newState;

    case "DELETE_EXPENSE":

      var newState = minusExpense(state, action);
      return newState;

    default:

      return state;
  }

};

var mapStateToLedgerProps = function(state) {
  return {
    data: state.ledger
  };
};

var LedgerPage = connect(mapStateToLedgerProps)(LedgerPage);
