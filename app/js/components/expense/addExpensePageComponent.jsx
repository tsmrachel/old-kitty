const React = require("react");
const browserHistory = require("react-router").browserHistory
const connect = require("react-redux").connect;
const Navbar = require("components/navbarComponent.jsx");

const {roundToTwo, validateAmount, userData, tripData} = require("common/utils.js");

class ButtonGroupSelect extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.renderButtonGroup = this.renderButtonGroup.bind(this);
    this.state = {
      selectedLabel: props.initialSelected
    };
  };

  onClick(e) {

    let buttonGroupSelectValue = e.target.getAttribute("data-Value");

    this.setState({
      selectedLabel: buttonGroupSelectValue
    });

    let item = this.props.items.find(function(item) {

      if (item.label === buttonGroupSelectValue) {
        return item;
      }
    });

    if (!!item.onItemClick) {
      item.onItemClick();
    }

    if (!!this.props.onSelectItem) {
      this.props.onSelectItem(this.props.stateKey, buttonGroupSelectValue);
    }

  };

  renderButtonGroup(item) {

    let buttonClasses = "waves-effect waves-light btn-large";

    if (item.label !== this.state.selectedLabel) {
      buttonClasses += " disabled";
    }

    return ( <button data-Value={ item.label } key={ item.label } onClick={ this.onClick } className={ buttonClasses }>
               { item.label }
             </button>);
  };

  render() {

    let buttonGroupSelectclasses = "input-field col s12 valign-wrapper " + this.props.ftestClass;

    return ( <div className={ buttonGroupSelectclasses }>
               <span className="col s1 valign">{ this.props.title }</span>
               <span className="col s10 offset-s1">{ this.props.items.map(this.renderButtonGroup) }</span>
             </div>);
  };

};

ButtonGroupSelect.propTypes = {
  stateKey: React.PropTypes.string.isRequired,
  initialSelected: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired
  })).isRequired,
  onSelectItem: React.PropTypes.func.isRequired,
  ftestClass: React.PropTypes.string.isRequired

};

class MultiSelector extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.state = {
      selected: props.selected
    };
  };

  handleChange(event) {

    let checkedWillBe = event.target.checked;
    let newSelected = this.state.selected;
    let itemId = event.target.getAttribute("data-item");

    if (checkedWillBe === true) {

      if (this.props.selectionMode === "single") {
        newSelected = [];
      }

      newSelected.push(itemId);

    } else {

      let index = newSelected.indexOf(itemId);
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

  };

  renderOptions(item) {

    let itemChecked = false;

    if (!!this.state.selected.includes(item)) {
      itemChecked = true;

    }

    let cssId = this.props.stateKey + "_" + item;
    //id and htmlfor must match for css, must also be unique

    return (

      <p key={ item }>
        <input type="checkbox" className="filled-in" id={ cssId } data-item={ item } checked={ itemChecked } onChange={ this.handleChange } />
        <label htmlFor={ cssId }>
          { item }
        </label>
      </p>);
  };

  render() {

    let multiselectorDivStyle = {
      marginBottom: "1rem"
    };

    let classes = "input-field col s6 offset-s2 " + this.props.ftestClass;

    return ( <div className={ classes } style={ multiselectorDivStyle }>
               { this.props.items.map(this.renderOptions) }
             </div>);
  };

};

MultiSelector.propTypes = {
  stateKey: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSelectItem: React.PropTypes.func.isRequired,
  selectionMode: React.PropTypes.oneOf(["multiple", "single"]),
  ftestClass: React.PropTypes.string.isRequired
};

class Shared extends React.Component {
  render() {
    return ( <ButtonGroupSelect {...this.props } title="Shared" items={ [{ label: "Yes", onItemClick: null }, { label: "No", onItemClick: null }] } />
      );
  }
};

class Amongst extends React.Component {
  render() {
    return ( <ButtonGroupSelect {...this.props } title="Amongst" items={ [{ label: "All", onItemClick: null }, { label: "Some", onItemClick: null }] } />
      );
  }
};

class Split extends React.Component {
  render() {
    return ( <ButtonGroupSelect {...this.props } title="Split" items={ [{ label: "Equally", onItemClick: null }, { label: "Differently", onItemClick: null }] } />
      );
  }
};

class PaidBy extends React.Component {
  render() {
    return ( <ButtonGroupSelect {...this.props } title="PaidBy" items={ [{ label: "Me", onItemClick: null }, { label: "Someone Else", onItemClick: null }] } />
      );
  }
};

class AmountInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.initialValue
    };
  };

  handleChange(event) {
    //to do : input validation
    let newValue = event.target.value;

    if (validateAmount(newValue)) {
      this.setState({
        value: newValue
      });

      if (!!this.props.onSelectItem) {
        this.props.onSelectItem(this.props.stateKey, newValue);
      }

    }
  };

  render() {

    return ( <div className="input-field col s12">
               <label htmlFor="amountInput" className="active">
                 Amount
               </label>
               <input type="number" value={ this.state.value } onChange={ this.handleChange } id="amountInput" className="ftest-amountInput" />
             </div>
      );
  };
};

AmountInput.propTypes = {
  stateKey: React.PropTypes.string.isRequired,
  onSelectItem: React.PropTypes.func.isRequired,
};

class SplitAmountInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderSplitAmountGroup = this.renderSplitAmountGroup.bind(this);

    let newState = Object.assign({}, this.props.initialValue);

    tripData.people.map(function(person) {

      if (newState[person]) {
        newState[person] = 0;
      }

    });

    this.state = newState;
  };

  handleChange(event) {

    //to do : input validation
    let newValue = event.target.value;
    let itemId = event.target.getAttribute("data-itemId");
    let newSplitAmountInputState = {};
    let newInputState = {};

    if (itemId === "Me") {
      itemId = userData.name;
    }

    if (newValue === "") {
      newValue = 0;
    }
    newInputState[itemId] = newValue;
    this.setState(newInputState);
    newSplitAmountInputState = Object.assign({}, this.state, newInputState);

    if (!!this.props.onSelectItem) {

      this.props.onSelectItem(this.props.stateKey, newSplitAmountInputState);
    }

  };

  renderSplitAmountGroup(item) {

    let itemValue = item;

    if (item === "Me") {
      itemValue = userData.name;
    }

    let itemHtmlFor = this.props.stateKey + "_" + item;

    return ( <div key={ item } className="input-field">
               <input type="number" data-itemId={ item } value={ this.state[itemValue] } onChange={ this.handleChange } id={ itemHtmlFor } />
               <label htmlFor={ itemHtmlFor } className="active">
                 { item }
               </label>
             </div>);
  };

  render() {

    let splitAmountInputDivStyle = {
      marginTop: "2rem",
      marginBottom: "2rem"
    };

    return ( <div className="input-field col s6 offset-s2 ftest-splitAmountInput" style={ splitAmountInputDivStyle }>
               { this.props.items.map(this.renderSplitAmountGroup) }
             </div>
      );
  };
};

class DescriptionInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.initialValue
    };
  };

  handleChange(event) {

    //to do : input validation
    let newValue = event.target.value;

    this.setState({
      value: newValue
    });

    if (!!this.props.onSelectItem) {
      this.props.onSelectItem(this.props.stateKey, newValue);
    }
  };

  render() {
    return ( <div className="input-field col s12">
               <label htmlFor="descriptionInput" className="active">
                 Description
               </label>
               <input type="text" value={ this.state.value } onChange={ this.handleChange } id="descriptionInput" className="ftest-descriptionInput" />
             </div>
      );
  };
};

DescriptionInput.propTypes = {
  stateKey: React.PropTypes.string.isRequired,
  onSelectItem: React.PropTypes.func.isRequired,
};

class AddExpensePage extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.updateAddExpensePage = this.updateAddExpensePage.bind(this);
    this.previousStateIfExists = null;

    let initialState = {
      tripId: 2,
      serverId: null,
      expenseId: Date.now(),
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

    if (!!props.params.expenseId) { //if expenseId has been passed in, it is an edits

      let paramExpenseId = props.params.expenseId;
      //change to action and remove global state for store
      initialState = store.getState().expenses.filter(function(obj) {

        //one side is returning int
        if (obj.expenseId.toString() === paramExpenseId.toString()) {
          return obj;
        }
      });
      initialState = initialState[0];
      this.previousStateIfExists = initialState;

    }
    this.state = initialState;

  };

  onDelete() {

    console.log("this.state.serverId : " + this.state.serverId);

    // this.props.dispatch(

    //        deleteExpense(this.state.serverId)

    //         );

    this.props.dispatch({
      type: "DELETE_EXPENSE",
      data: this.state
    });

    browserHistory.push("/");

  };

  onSave() {

    let newState = this.state;

    if (this.state.split === "Equally") {

      let numOfPeopleSharing = null;
      let peopleArr = null;
      let newSplitAmount = {};

      if (newState.amongst === "All") {
        numOfPeopleSharing = tripData.people.length;
        peopleArr = tripData.people;

      } else { //amongst Some

        numOfPeopleSharing = newState.amongstWho.length;
        peopleArr = newState.amongstWho;
      }

      let eachPersonPaid = roundToTwo(newState.amount / numOfPeopleSharing);

      peopleArr.forEach(function(person) {
        newSplitAmount[person] = eachPersonPaid;

      });
      newState.splitAmount = newSplitAmount;

    }

    if (!!this.props.params.expenseId) { //if edit

      let editExpenseState = {};
      editExpenseState.previousState = this.previousStateIfExists;
      editExpenseState.newState = newState;

      this.props.dispatch({
        type: "EDIT_EXPENSE",
        data: editExpenseState
      });

      // this.props.dispatch(

      //  editExpense(newState)

      //  );

    } else { // else new expese

      this.props.dispatch({
        type: "NEW_EXPENSE",
        data: newState
      });

      console.log("newState in add Expense");
      console.log(newState);

      // this.props.dispatch(

      //   newExpense(newState)

      //   );

      console.log("this.props.dispatch : " + this.props.dispatch);

    }

    browserHistory.push("/");

  };

  updateAddExpensePage(stateKey, stateValue) {
    //setState is asynchronous

    let newState = {};
    newState[stateKey] = stateValue;

    this.setState(newState);

  };

  render() {

    let splitAmountInputPeople = tripData.peopleWithMe;
    let amongstFields = null;
    let deleteButton = null;
    let sharedFields = null;
    let splitFields = null;
    let paidByFields = null;
    let deleteButtonDivStyle = {
      marginTop: "2rem",
      marginBottom: "2rem"
    };
    let upperMarginDivStyle = {
      marginTop: "2rem"
    };

    if (!!this.props.params.expenseId) {
      deleteButton = (<button className="input-field waves-effect waves-light btn-large col s12 ftest-deleteButton" onClick={ this.onDelete } style={ deleteButtonDivStyle }>
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

    if (this.state.split === "Differently") {
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
          <button className="waves-effect waves-light btn-large col s12 ftest-saveButton" onClick={ this.onSave } style={ upperMarginDivStyle }>
            Save
          </button>
          { deleteButton }
        </div>
      </div>
      );
  };
};

AddExpensePage = connect()(AddExpensePage);
module.exports = AddExpensePage;