function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}
function validateAmount(input) {
  var amountRegex = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;

  return amountRegex.test(input);
}

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

// function deleteExpense(serverId) {


//   return function(dispatch) {

//     console.log("serverId for deleteExpense : ");
//     console.log(serverId);

//     return fetch("http://localhost:3000/api/deleteExpense", {
//       mode: "cors",
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       },
//       body: '{"serverId" :' + serverId +'}'

//     })
//       .then(function(response) {
//         return response.json();

//         // remember to handle error also

//       }).then(function(json) {

//       console.log(json);
//     // note that expense has been updated?
//     });

//   }
// }

// function editExpense(expense) {
//   var expenseJSON = JSON.stringify(expense);

//   return function(dispatch) {

//     console.log("expense For Body in dispatch : ");
//     console.log(expenseJSON);

//     return fetch("http://localhost:3000/api/editExpense", {
//       mode: "cors",
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       },
//       body: expenseJSON

//     })
//       .then(function(response) {
//         return response.json();

//         // remember to handle error also

//       }).then(function(json) {

//       console.log(json);
//     // note that expense has been updated?
//     });

//   }
// }

// function newExpense(expense) {
//   console.log("expense For Body : ");
//   console.log(expense);

//   var expenseJSON = JSON.stringify(expense);

//   return function(dispatch) {

//     console.log("expense For Body in dispatch : ");
//     console.log(expenseJSON);

//     return fetch("http://localhost:3000/api/newExpense", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       },
//       body: expenseJSON

//     })
//       .then(function(response) {
//         return response.json();

//         // remember to handle error also

//       }).then(function(json) {

//       console.log(json);
//       dispatch(updateExpenseWithServerId(json));
//     });

//   }
// }
// function requestExpenses() {
//   return {
//     type: REQUEST_EXPENSES
//   }
// }
// function fetchExpenses() {
//   return {
//     type: "FETCH_EXPENSES"
//   }
// }
// function receiveExpenses(json) {
//   return {
//     type: "RECEIVE_EXPENSES",
//     expenses: json
//   // receivedAt: Date.now()
//   }
// }
// function updateExpenseWithServerId(json) {
//   return {
//     type: "UPDATE_EXPENSE_SERVER_ID",
//     data: json
//   }
// }

// // Meet our first thunk action creator!
// // Though its insides are different, you would use it just like any other action creator:
// // store.dispatch(fetchPosts('reactjs'))

// function fetchExpenses() {

//   // Thunk middleware knows how to handle functions.
//   // It passes the dispatch method as an argument to the function,
//   // thus making it able to dispatch actions itself.

//   return function(dispatch) {

//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.

//     // dispatch(requestExpenses())

//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.

//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.

//     return fetch("http://localhost:3000/api/getExpenses", {
//       mode: "cors"
//     })
//       .then(function(response) {

//         return response.json();

//         //remember to handle error also

//       }).then(function(json) {

//       console.log(json);
//       dispatch(receiveExpenses(json));
//     });

//     // We can dispatch many times!
//     // Here, we update the app state with the results of the API call.

//     // dispatch(receivePosts(subreddit, json))
//     // )

//     // In a real world app, you also want to
//     // catch any error in the network call.

//   }
// }


module.exports = {
   roundToTwo,
   validateAmount,
   userData,
   tripData
}