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

//a lot of repeated loops in ledger reducer, extract out into function

var ledgerReducer = function(state = ledgerInitialState, action) {
console.log(" state : ");
      console.log(state);

      console.log("ledgerInitialState : ");
      console.log(ledgerInitialState);
  switch (action.type) {

    //todo : edit expense

    case "NEW_EXPENSE":

      var newState = Object.assign({}, state);

      console.log("newExpense newState : ");
      console.log(newState);

      var owesWho = action.data.paidBy; //todo

      if (owesWho == "Me") {
        owesWho = userData.name;
      } else { //paid by someone else

        owesWho = action.data.paidByWho[0];

      }

      console.log("owesWho : " + owesWho);

      var peopleSharingExpense = action.data.splitAmount;

      for (var person in peopleSharingExpense) {

        if (person == "Me") {
          person = userData.name;
        }

        console.log("person : " + person);

        if (person == owesWho) {
          continue;
        }
        newState[person][owesWho] = newState[person][owesWho] + parseFloat(peopleSharingExpense[person]);

      }

      console.log(newState);

      return newState;
    case "EDIT_EXPENSE":

      console.log("in ledgerReducer : editExpense");

      var newState = Object.assign({}, state);

      //minus-ing old expense

      var owesWho = action.data.previousState.paidBy; //todo

      if (owesWho == "Me") {
        owesWho = userData.name;
      }else { //paid by someone else

        owesWho = action.data.paidByWho[0];

      }

      console.log("owesWho : " + owesWho);

      var peopleSharingExpense = action.data.previousState.splitAmount;

      for (var person in peopleSharingExpense) {

        if (person == "Me") {
          person = userData.name;
        }

        if (person == owesWho) {
          continue;
        }
        newState[person][owesWho] = newState[person][owesWho] - parseFloat(peopleSharingExpense[person]);

      }

      //adding new expense

      owesWho = action.data.newState.paidBy; //todo

      if (owesWho == "Me") {
        owesWho = userData.name;
      }

      console.log("owesWho : " + owesWho);

      var peopleSharingExpense = action.data.newState.splitAmount;

      for (var person in peopleSharingExpense) {

        if (person == "Me") {
          person = userData.name;
        }

        if (person == owesWho) {
          continue;
        }
        newState[person][owesWho] = newState[person][owesWho] + parseFloat(peopleSharingExpense[person]);

      }

      return newState;
    case "DELETE_EXPENSE":

      var newState = Object.assign({}, state);

      var owesWho = action.data.paidBy; //todo

      if (owesWho == "Me") {
        owesWho = userData.name;
      }

      console.log("owesWho : " + owesWho);

      var peopleSharingExpense = action.data.splitAmount;

      for (var person in peopleSharingExpense) {

        if (person == "Me") {
          person = userData.name;
        }

        if (person == owesWho) {
          continue;
        }
        newState[person][owesWho] = newState[person][owesWho] - parseFloat(peopleSharingExpense[person]);

      }

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
