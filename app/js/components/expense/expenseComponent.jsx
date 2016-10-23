var React = require("react");
var Link = require('react-router').Link;

var Expense = React.createClass({
  render: function() {

    console.log(this.props);
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

module.exports = Expense;