var createStore = Redux.createStore;
var Provider = ReactRedux.Provider;
var combineReducers = Redux.combineReducers;
var connect = ReactRedux.connect;
var Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  BrowserHistory = ReactRouter.browserHistory;
var Link = ReactRouter.Link;

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function validateAmount(input) {
  var amountRegex = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;

  return amountRegex.test(input);
}

var magicKey = 0;
var getMagicKey = function() {
  magicKey += 1;
  return magicKey;
};
var quotes = "hello";
var expenseId = 1;



userData = {
  id: 1,
  name: "fatpaws",
};

//todo : create ledger initial state from tripData
tripData = {
  people: ["fatpaws", "calico", "browncat"],

  // to be processed after data is pulled
  peopleWithMe: ["Me", "calico", "browncat"],
  otherPeople: ["calico", "browncat"]
}
