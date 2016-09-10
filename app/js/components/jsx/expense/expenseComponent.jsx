var MultiSelector = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    selectionMode: React.PropTypes.oneOf(["multiple", "single"]),
    ftestClass: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      selected: this.props.selected
    };
  },
  handleChange: function(event) {

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
  renderOptions: function(item) {

    var itemChecked = false;

    if (!!this.state.selected.includes(item)) {
      itemChecked = true;

    }

    var cssId = this.props.stateKey + "_" + item;
    //id and htmlfor must match for css, must also be unique

    return (

      <p key={ item }>
        <input type="checkbox" className="filled-in" id={ cssId } data-item={ item } checked={ itemChecked } onChange={ this.handleChange } />
        <label htmlFor={ cssId }>
          { item }
        </label>
      </p>);
  },
  render: function() {

    var multiselectorDivStyle = {
      marginBottom: "1rem"
    };

    var classes = "input-field col s6 offset-s2 " + this.props.ftestClass;

    return ( <div className={ classes } style={ multiselectorDivStyle }>
               { this.props.items.map(this.renderOptions) }
             </div>);
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
  getInitialState: function() {
    return {
      selectedLabel: this.props.initialSelected
    };
  },
  onClick: function(e) {

    var ButtonGroupSelectValue = e.target.getAttribute("data-Value");

    this.setState({
      selectedLabel: ButtonGroupSelectValue
    });

    var item = this.props.items.find(function(item) {

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
  renderButtonGroup: function(item) {

    var buttonClasses = "waves-effect waves-light btn-large";

    if (item.label !== this.state.selectedLabel) {
      buttonClasses += " disabled";
    }

    return ( <button data-Value={ item.label } key={ item.label } onClick={ this.onClick } className={ buttonClasses }>
               { item.label }
             </button>);
  },
  render: function() {

    var buttonGroupSelectclasses = "input-field col s12 valign-wrapper " + this.props.ftestClass;

    return ( <div className={ buttonGroupSelectclasses }>
               <span className="col s1 valign">{ this.props.title }</span>
               <span className="col s10 offset-s1">{ this.props.items.map(this.renderButtonGroup) }</span>
             </div>);
  }

});

var Shared = React.createClass({
  yes: function(e) {
    console.log("yay!");

  },
  render: function() {

    return ( <ButtonGroupSelect {...this.props } title="Shared" items={ [{ label: "Yes", onItemClick: this.yes }, { label: "No", onItemClick: null }] } />
      );
  }
});

var Amongst = React.createClass({
  render: function() {
    return ( <ButtonGroupSelect {...this.props } title="Amongst" items={ [{ label: "All", onItemClick: null }, { label: "Some", onItemClick: null }] } />
      );
  }
});

var Split = React.createClass({
  render: function() {
    return ( <ButtonGroupSelect {...this.props } title="Split" items={ [{ label: "Equally", onItemClick: null }, { label: "Differently", onItemClick: null }] } />
      );
  }
});

var PaidBy = React.createClass({
  render: function() {
    return ( <ButtonGroupSelect {...this.props } title="PaidBy" items={ [{ label: "Me", onItemClick: null }, { label: "Someone Else", onItemClick: null }] } />
      );
  }
});

var AmountInput = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,

  },
  getInitialState: function() {
    return {
      value: this.props.initialValue
    };
  },
  handleChange: function(event) {

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
  render: function() {

    return ( <div className="input-field col s12">
               <label htmlFor="amountInput" className="active">
                 Amount
               </label>
               <input type="number" value={ this.state.value } onChange={ this.handleChange } id="amountInput" className="ftest-amountInput" />
             </div>
      );
  }
});

var SplitAmountInput = React.createClass({
  getInitialState: function() {

    var newState = Object.assign({}, this.props.initialValue);

    tripData.people.map(function(person) {

      if (newState[person]) {
        newState[person] = 0;
      }

    });

    return newState;
  },
  handleChange: function(event) {

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
  renderSplitAmountGroup: function(item) {

    var itemValue = item;

    if (item == "Me") {
      itemValue = userData.name;
    }

    var itemHtmlFor = this.props.stateKey + "_" + item;

    return ( <div key={ item } className="input-field">
               <input type="number" data-itemId={ item } value={ this.state[itemValue] } onChange={ this.handleChange } id={ itemHtmlFor } />
               <label htmlFor={ itemHtmlFor } className="active">
                 { item }
               </label>
             </div>);
  },
  render: function() {

    var splitAmountInputDivStyle = {
      marginTop: "2rem",
      marginBottom: "2rem"
    };

    return ( <div className="input-field col s6 offset-s2 ftest-splitAmountInput" style={ splitAmountInputDivStyle }>
               { this.props.items.map(this.renderSplitAmountGroup) }
             </div>
      );
  }

});

var DescriptionInput = React.createClass({
  propTypes: {
    stateKey: React.PropTypes.string.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,

  },
  getInitialState: function() {
    return {
      value: this.props.initialValue
    };
  },
  handleChange: function(event) {

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
  render: function() {
    return ( <div className="input-field col s12">
               <label htmlFor="descriptionInput" className="active">
                 Description
               </label>
               <input type="text" value={ this.state.value } onChange={ this.handleChange } id="descriptionInput" className="ftest-descriptionInput" />
             </div>
      );
  }
});

var Expense = React.createClass({
  render: function() {

    console.log(this.props.data.expenseId);

    return (
      <li className="collection-item avatar">
        <Link to={ "/expense/" + this.props.data.expenseId }>
        <img src="images/Icecream.png" className="circle" />
        <span className="title">${ this.props.data.amount }</span>
        <p>
          { this.props.data.description }
        </p>
        </Link>
      </li>            );
  }
});

var AddExpensePage = React.createClass({
  previousStateIfExists: null,
  getInitialState: function() {

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

    if (!!this.props.params.expenseId) { //if expenseId has been passed in, it is an edits

      var paramExpenseId = this.props.params.expenseId;
      initialState = store.getState().data.filter(function(obj) {

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

      } else { //amongst Some

        numOfPeopleSharing = newState.amongstWho.length;
        peopleArr = newState.amongstWho;
      }

      var eachPersonPaid = roundToTwo(newState.amount / numOfPeopleSharing);

      peopleArr.forEach(function(person) {
        newSplitAmount[person] = eachPersonPaid;

      });
      newState.splitAmount = newSplitAmount;

    }

    if (!!this.props.params.expenseId) { //if edit

      var editExpenseState = {};
      editExpenseState.previousState = this.previousStateIfExists;
      editExpenseState.newState = newState;

      store.dispatch({
        type: "EDIT_EXPENSE",
        data: editExpenseState
      });

    } else { // else new expese

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
  render: function() {

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
      deleteButton = (<button className="input-field waves-effect waves-light btn-large col s12 ftest-deleteButton" onClick={ this.delete } style={ deleteButtonDivStyle }>
                        Delete
                      </button>);
    }

    if (this.state.amongst === "Some") {
      splitAmountInputPeople = this.state.amongstWho;
      amongstFields = (

        <MultiSelector stateKey="amongstWho" selectionMode="multiple" selected={ this.state.amongstWho } items={ tripData.peopleWithMe } onSelectItem={ this.updateAddExpensePage } ftestClass="ftest-amongstWho"
        />
      );
    }

    if (this.state.split == "Differently") {
      splitFields = (
        <SplitAmountInput stateKey="splitAmount" items={ splitAmountInputPeople } initialValue={ this.state.splitAmount } onSelectItem={ this.updateAddExpensePage } />
      );
    }

    if (this.state.shared === "Yes") {
      sharedFields = (

        <div>
          <Amongst stateKey="amongst" initialSelected={ this.state.amongst } onSelectItem={ this.updateAddExpensePage } ftestClass="ftest-amongst" />
          { amongstFields }
          <Split stateKey="split" initialSelected={ this.state.split } onSelectItem={ this.updateAddExpensePage } ftestClass="ftest-split" />
          { splitFields }
        </div>

      );

    }

    if (this.state.paidBy === "Someone Else") {
      paidByFields = (
        <MultiSelector stateKey="paidByWho" selectionMode="single" items={ tripData.otherPeople } selected={ this.state.paidByWho } onSelectItem={ this.updateAddExpensePage } ftestClass="ftest-paidByWho"
        />
      );

    }

    return (
      <div>
        <Navbar title="Expense" />
        <div className="row container" style={ upperMarginDivStyle }>
          <AmountInput stateKey="amount" initialValue={ this.state.amount } onSelectItem={ this.updateAddExpensePage } />
          <DescriptionInput stateKey="description" initialValue={ this.state.description } onSelectItem={ this.updateAddExpensePage } />
          <Shared stateKey="shared" initialSelected={ this.state.shared } onSelectItem={ this.updateAddExpensePage } ftestClass="ftest-shared" />
          { sharedFields }
          <PaidBy stateKey="paidBy" initialSelected={ this.state.paidBy } onSelectItem={ this.updateAddExpensePage } ftestClass="ftest-paidBy" />
          { paidByFields }
          <button className="waves-effect waves-light btn-large col s12 ftest-saveButton" onClick={ this.save } style={ upperMarginDivStyle }>
            Save
          </button>
          { deleteButton }
        </div>
      </div>
      );
  }

});
