var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Navbar = React.createClass({
  render: function () {

    var divStyle = {
      marginLeft: "5px"

    };

    if (this.props.title == "Expenses") {

      var rightMenu = React.createElement(
        "li",
        null,
        React.createElement(
          Link,
          { to: "/ledger" },
          React.createElement("img", { src: "images/Financial.png", className: "icon ftest-ledgerIcon" })
        )
      );
    }

    return React.createElement(
      "nav",
      null,
      React.createElement(
        "div",
        { className: "nav-wrapper" },
        React.createElement(
          "span",
          { className: "brand-logo", style: divStyle },
          this.props.title
        ),
        React.createElement(
          "ul",
          { className: "right hide-on-med-and-down" },
          rightMenu
        )
      )
    );
  }
});

var MultiSelector = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    selectionMode: React.PropTypes.oneOf(["multiple", "single"]),
    ftestClass: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      selected: this.props.selected
    };
  },
  handleChange: function (event) {

    var checkedWillBe = event.target.checked;
    var newSelected = this.state.selected;
    var itemId = event.target.getAttribute("data-item");

    if (checkedWillBe == true) {

      if (this.props.selectionMode == "single") {
        newSelected = [];
      }

      newSelected.push(itemId);
    } else {

      var index = newSelected.indexOf(itemId);
      if (index > -1) {
        newSelected.splice(index, 1);
      }
    }

    this.setState({
      selected: newSelected
    });

    if (!!this.props.onSelectItem) {
      this.props.onSelectItem(this.props.stateKey, newSelected);
    }
  },
  renderOptions: function (item) {

    var itemChecked = false;

    if (!!this.state.selected.includes(item)) {
      itemChecked = true;
    }

    var cssId = this.props.stateKey + "_" + item;
    //id and htmlfor must match for css, must also be unique

    return React.createElement(
      "p",
      { key: item },
      React.createElement("input", { type: "checkbox", className: "filled-in", id: cssId, "data-item": item, checked: itemChecked, onChange: this.handleChange }),
      React.createElement(
        "label",
        { htmlFor: cssId },
        item
      )
    );
  },
  render: function () {

    var multiselectorDivStyle = {
      marginBottom: "1rem"
    };

    var classes = "input-field col s6 offset-s2 " + this.props.ftestClass;

    return React.createElement(
      "div",
      { className: classes, style: multiselectorDivStyle },
      this.props.items.map(this.renderOptions)
    );
  }

});

var ButtonGroupSelect = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    initialSelected: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string.isRequired
    })).isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    ftestClass: React.PropTypes.string.isRequired

  },
  getInitialState: function () {
    return {
      selectedLabel: this.props.initialSelected
    };
  },
  onClick: function (e) {

    var ButtonGroupSelectValue = e.target.getAttribute("data-Value");

    this.setState({
      selectedLabel: ButtonGroupSelectValue
    });

    var item = this.props.items.find(function (item) {

      if (item.label === ButtonGroupSelectValue) {
        return item;
      }
    });

    if (!!item.onItemClick) {
      item.onItemClick();
    }

    if (!!this.props.onSelectItem) {
      this.props.onSelectItem(this.props.stateKey, ButtonGroupSelectValue);
    }
  },
  renderButtonGroup: function (item) {

    var buttonClasses = "waves-effect waves-light btn-large";

    if (item.label !== this.state.selectedLabel) {
      buttonClasses += " disabled";
    }

    return React.createElement(
      "button",
      { "data-Value": item.label, key: item.label, onClick: this.onClick, className: buttonClasses },
      item.label
    );
  },
  render: function () {

    var buttonGroupSelectclasses = "input-field col s12 valign-wrapper " + this.props.ftestClass;

    return React.createElement(
      "div",
      { className: buttonGroupSelectclasses },
      React.createElement(
        "span",
        { className: "col s1 valign" },
        this.props.title
      ),
      React.createElement(
        "span",
        { className: "col s10 offset-s1" },
        this.props.items.map(this.renderButtonGroup)
      )
    );
  }

});

var Shared = React.createClass({
  yes: function (e) {
    console.log("yay!");
  },
  render: function () {

    return React.createElement(ButtonGroupSelect, _extends({}, this.props, { title: "Shared", items: [{ label: "Yes", onItemClick: this.yes }, { label: "No", onItemClick: null }] }));
  }
});

var Amongst = React.createClass({
  render: function () {
    return React.createElement(ButtonGroupSelect, _extends({}, this.props, { title: "Amongst", items: [{ label: "All", onItemClick: null }, { label: "Some", onItemClick: null }] }));
  }
});

var Split = React.createClass({
  render: function () {
    return React.createElement(ButtonGroupSelect, _extends({}, this.props, { title: "Split", items: [{ label: "Equally", onItemClick: null }, { label: "Differently", onItemClick: null }] }));
  }
});

var PaidBy = React.createClass({
  render: function () {
    return React.createElement(ButtonGroupSelect, _extends({}, this.props, { title: "PaidBy", items: [{ label: "Me", onItemClick: null }, { label: "Someone Else", onItemClick: null }] }));
  }
});

var AmountInput = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    onSelectItem: React.PropTypes.func.isRequired

  },
  getInitialState: function () {
    return {
      value: this.props.initialValue
    };
  },
  handleChange: function (event) {

    //to do : input validation
    var newValue = event.target.value;

    if (validateAmount(newValue)) {
      this.setState({
        value: newValue
      });

      if (!!this.props.onSelectItem) {
        this.props.onSelectItem(this.props.stateKey, newValue);
      }
    }
  },
  render: function () {

    return React.createElement(
      "div",
      { className: "input-field col s12" },
      React.createElement(
        "label",
        { htmlFor: "amountInput", className: "active" },
        "Amount"
      ),
      React.createElement("input", { type: "number", value: this.state.value, onChange: this.handleChange, id: "amountInput", className: "ftest-amountInput" })
    );
  }
});

var SplitAmountInput = React.createClass({
  getInitialState: function () {

    var newState = Object.assign({}, this.props.initialValue);

    tripData.people.map(function (person) {

      if (newState[person]) {
        newState[person] = 0;
      }
    });

    return newState;
  },
  handleChange: function (event) {

    //to do : input validation
    var newValue = event.target.value;
    var itemId = event.target.getAttribute("data-itemId");
    var newSplitAmountInputState = {};
    var newInputState = {};

    if (itemId == "Me") {
      itemId = userData.name;
    }

    if (newValue == "") {
      newValue = 0;
    }
    newInputState[itemId] = newValue;
    this.setState(newInputState);
    newSplitAmountInputState = Object.assign({}, this.state, newInputState);

    if (!!this.props.onSelectItem) {

      this.props.onSelectItem(this.props.stateKey, newSplitAmountInputState);
    }
    // }
  },
  renderSplitAmountGroup: function (item) {

    var itemValue = item;

    if (item == "Me") {
      itemValue = userData.name;
    }

    var itemHtmlFor = this.props.stateKey + "_" + item;

    return React.createElement(
      "div",
      { key: item, className: "input-field" },
      React.createElement("input", { type: "number", "data-itemId": item, value: this.state[itemValue], onChange: this.handleChange, id: itemHtmlFor }),
      React.createElement(
        "label",
        { htmlFor: itemHtmlFor, className: "active" },
        item
      )
    );
  },
  render: function () {

    var splitAmountInputDivStyle = {
      marginTop: "2rem",
      marginBottom: "2rem"
    };

    return React.createElement(
      "div",
      { className: "input-field col s6 offset-s2 ftest-splitAmountInput", style: splitAmountInputDivStyle },
      this.props.items.map(this.renderSplitAmountGroup)
    );
  }

});

var DescriptionInput = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    onSelectItem: React.PropTypes.func.isRequired

  },
  getInitialState: function () {
    return {
      value: this.props.initialValue
    };
  },
  handleChange: function (event) {

    //to do : input validation
    var newValue = event.target.value;

    this.setState({
      value: newValue
    });

    if (!!this.props.onSelectItem) {
      this.props.onSelectItem(this.props.stateKey, newValue);
    }
    // }
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "input-field col s12" },
      React.createElement(
        "label",
        { htmlFor: "descriptionInput", className: "active" },
        "Description"
      ),
      React.createElement("input", { type: "text", value: this.state.value, onChange: this.handleChange, id: "descriptionInput", className: "ftest-descriptionInput" })
    );
  }
});

var Expense = React.createClass({
  render: function () {

    console.log(this.props.data.expenseId);

    return React.createElement(
      "li",
      { className: "collection-item avatar" },
      React.createElement(
        Link,
        { to: "/expense/" + this.props.data.expenseId },
        React.createElement("img", { src: "images/Icecream.png", className: "circle" }),
        React.createElement(
          "span",
          { className: "title" },
          "$",
          this.props.data.amount
        ),
        React.createElement(
          "p",
          null,
          this.props.data.description
        )
      )
    );
  }
});

var AddExpensePage = React.createClass({
  previousStateIfExists: null,
  getInitialState: function () {

    var initialState = {
      expenseId: window.expenseId,
      amount: "",
      description: "",
      shared: "Yes",
      amongst: "All",
      amongstWho: [],
      split: "Equally",
      paidBy: "Me",
      paidByWho: [],
      splitAmount: {}
    };

    //todo : clean up

    if (!!this.props.params.expenseId) {
      //if expenseId has been passed in, it is an edits

      var paramExpenseId = this.props.params.expenseId;
      initialState = store.getState().data.filter(function (obj) {

        if (obj.expenseId == paramExpenseId) {
          return obj;
        }
      });
      initialState = initialState[0];
      this.previousStateIfExists = initialState;
    }

    return initialState;
  },
  delete() {

    store.dispatch({
      type: "DELETE_EXPENSE",
      data: this.state
    });

    BrowserHistory.push("/");
  },
  save() {

    var newState = this.state;

    if (this.state.split == "Equally") {

      var numOfPeopleSharing = null;
      var peopleArr = null;
      var newSplitAmount = {};

      if (newState.amongst == "All") {
        numOfPeopleSharing = tripData.people.length;
        peopleArr = tripData.people;
      } else {
        //amongst Some

        numOfPeopleSharing = newState.amongstWho.length;
        peopleArr = newState.amongstWho;
      }

      var eachPersonPaid = roundToTwo(newState.amount / numOfPeopleSharing);

      peopleArr.forEach(function (person) {
        newSplitAmount[person] = eachPersonPaid;
      });
      newState.splitAmount = newSplitAmount;
    }

    if (!!this.props.params.expenseId) {
      //if edit

      var editExpenseState = {};
      editExpenseState.previousState = this.previousStateIfExists;
      editExpenseState.newState = newState;

      store.dispatch({
        type: "EDIT_EXPENSE",
        data: editExpenseState
      });
    } else {
      // else new expese

      expenseId += 1;

      //not supposed to do store.dispatch directly?
      store.dispatch({
        type: "NEW_EXPENSE",
        data: newState
      });
    }

    BrowserHistory.push("/");
  },
  updateAddExpensePage(stateKey, stateValue) {
    //setState is asynchronous

    var newState = {};
    newState[stateKey] = stateValue;

    this.setState(newState);
  },
  render: function () {

    var splitAmountInputPeople = tripData.peopleWithMe;
    var amongstFields = null;
    var deleteButton = null;
    var sharedFields = null;
    var splitFields = null;
    var paidByFields = null;
    var deleteButtonDivStyle = {
      marginTop: "2rem",
      marginBottom: "2rem"
    };
    var upperMarginDivStyle = {
      marginTop: "2rem"
    };

    if (!!this.props.params.expenseId) {
      deleteButton = React.createElement(
        "button",
        { className: "input-field waves-effect waves-light btn-large col s12 ftest-deleteButton", onClick: this.delete, style: deleteButtonDivStyle },
        "Delete"
      );
    }

    if (this.state.amongst === "Some") {
      splitAmountInputPeople = this.state.amongstWho;
      amongstFields = React.createElement(MultiSelector, { stateKey: "amongstWho", selectionMode: "multiple", selected: this.state.amongstWho, items: tripData.peopleWithMe, onSelectItem: this.updateAddExpensePage, ftestClass: "ftest-amongstWho"
      });
    }

    if (this.state.split == "Differently") {
      splitFields = React.createElement(SplitAmountInput, { stateKey: "splitAmount", items: splitAmountInputPeople, initialValue: this.state.splitAmount, onSelectItem: this.updateAddExpensePage });
    }

    if (this.state.shared === "Yes") {
      sharedFields = React.createElement(
        "div",
        null,
        React.createElement(Amongst, { stateKey: "amongst", initialSelected: this.state.amongst, onSelectItem: this.updateAddExpensePage, ftestClass: "ftest-amongst" }),
        amongstFields,
        React.createElement(Split, { stateKey: "split", initialSelected: this.state.split, onSelectItem: this.updateAddExpensePage, ftestClass: "ftest-split" }),
        splitFields
      );
    }

    if (this.state.paidBy === "Someone Else") {
      paidByFields = React.createElement(MultiSelector, { stateKey: "paidByWho", selectionMode: "single", items: tripData.otherPeople, selected: this.state.paidByWho, onSelectItem: this.updateAddExpensePage, ftestClass: "ftest-paidByWho"
      });
    }

    return React.createElement(
      "div",
      null,
      React.createElement(Navbar, { title: "Expense" }),
      React.createElement(
        "div",
        { className: "row container", style: upperMarginDivStyle },
        React.createElement(AmountInput, { stateKey: "amount", initialValue: this.state.amount, onSelectItem: this.updateAddExpensePage }),
        React.createElement(DescriptionInput, { stateKey: "description", initialValue: this.state.description, onSelectItem: this.updateAddExpensePage }),
        React.createElement(Shared, { stateKey: "shared", initialSelected: this.state.shared, onSelectItem: this.updateAddExpensePage, ftestClass: "ftest-shared" }),
        sharedFields,
        React.createElement(PaidBy, { stateKey: "paidBy", initialSelected: this.state.paidBy, onSelectItem: this.updateAddExpensePage, ftestClass: "ftest-paidBy" }),
        paidByFields,
        React.createElement(
          "button",
          { className: "waves-effect waves-light btn-large col s12 ftest-saveButton", onClick: this.save, style: upperMarginDivStyle },
          "Save"
        ),
        deleteButton
      )
    );
  }

});

var ExpensesList = React.createClass({
  renderExpenses: function (expense) {

    return React.createElement(Expense, { key: getMagicKey(), data: expense });
  },
  render: function () {

    return React.createElement(
      "ul",
      { className: "collection ftest-expenseList" },
      this.props.data.map(this.renderExpenses)
    );
  }
});

var ExpensesListPage = React.createClass({
  _onClick: function () {
    BrowserHistory.push("addExpense");
  },
  render: function () {

    var divStyle = {
      bottom: "45px",
      right: "24px"

    };

    return React.createElement(
      "div",
      null,
      React.createElement(Navbar, { title: "Expenses" }),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(ExpensesList, null)
      ),
      React.createElement(
        "div",
        { className: "fixed-action-btn", style: divStyle },
        React.createElement(
          "button",
          { className: "btn-floating btn-large red ftest-plusButton", onClick: this._onClick },
          "+"
        )
      )
    );
  }
});

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

var expensesListReducer = function (state = expensesListInitialState, action) {

  switch (action.type) {

    case "NEW_EXPENSE":

      var newExpenses = state.concat([action.data]);
      var newState = Object.assign([], state, newExpenses);

      return newState;

    case "EDIT_EXPENSE":

      var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function (obj) {
        if (obj.expenseId == action.data.newState.expenseId) {
          return true;
        }
      });

      newState[indexOfObj] = action.data.newState;

      return newState;

    case "DELETE_EXPENSE":

      var newState = Object.assign([], state);

      var indexOfObj = newState.findIndex(function (obj) {
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

var mapStateToExpensesListProps = function (state) {
  return {
    data: state.data
  };
};

var ExpensesList = connect(mapStateToExpensesListProps)(ExpensesList);

var LedgerPage = React.createClass({
  renderEachPerson: function (ledgerObj) {

    var htmlForLedger = [];
    var owedAmounts = [];
    var personObj;
    var pUniqueKey;
    var personDivStyle = {
      marginTop: "2rem"
    };

    for (var person in ledgerObj) {

      personObj = ledgerObj[person];
      owedAmounts = [];

      for (var owedPerson in personObj) {

        pUniqueKey = person + "Owes" + owedPerson;

        owedAmounts.push(React.createElement(
          "p",
          { key: pUniqueKey },
          owedPerson,
          " : $",
          personObj[owedPerson]
        ));
      }

      htmlForLedger.push(React.createElement(
        "div",
        { key: person, className: "row container center-align ftest-person", style: personDivStyle },
        React.createElement(
          "h1",
          null,
          person
        ),
        React.createElement(
          "div",
          { className: "section" },
          React.createElement(
            "h2",
            null,
            "Owes"
          ),
          React.createElement("div", { className: "divider ftest-owes" }),
          owedAmounts
        )
      ));
    }

    return htmlForLedger;
  },
  render: function () {

    var htmlRender = this.renderEachPerson(this.props.data);

    return React.createElement(
      "div",
      null,
      React.createElement(Navbar, { title: "Ledger" }),
      htmlRender
    );
  }

});

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

var minusExpense = function (state, action) {

  var newState = Object.assign({}, state);
  var actionData = !!action.data.previousState ? action.data.previousState : action.data;
  var owesWho = actionData.paidBy == "Me" ? userData.name : actionData.paidByWho[0];
  var peopleSharingExpense = actionData.splitAmount;

  for (var person in peopleSharingExpense) {

    if (person == "Me") {
      person = userData.name;
    }

    if (person != owesWho) {
      //if you're person who paid, you don't owe yourself
      newState[person][owesWho] = newState[person][owesWho] - parseFloat(peopleSharingExpense[person]);
    }
  }

  return newState;
};

var addExpense = function (state, action) {

  var newState = Object.assign({}, state);
  var actionData = !!action.data.newState ? action.data.newState : action.data;
  var owesWho = actionData.paidBy == "Me" ? userData.name : actionData.paidByWho[0];
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
};

var ledgerReducer = function (state = ledgerInitialState, action) {

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

var mapStateToLedgerProps = function (state) {
  return {
    data: state.ledger
  };
};

var LedgerPage = connect(mapStateToLedgerProps)(LedgerPage);

var app = combineReducers({
  data: expensesListReducer,
  ledger: ledgerReducer

});

var store = createStore(app);

ReactDOM.render(React.createElement(
  Provider,
  { store: store },
  React.createElement(
    Router,
    { history: BrowserHistory },
    React.createElement(Route, { path: "/", component: ExpensesListPage }),
    React.createElement(Route, { path: "addExpense", component: AddExpensePage }),
    React.createElement(Route, { path: "/expense/:expenseId", component: AddExpensePage }),
    React.createElement(Route, { path: "ledger", component: LedgerPage })
  )
), document.getElementById("container"));