const React = require("react");
const Link = require('react-router').Link;

class Expense extends React.Component {

  render() {
    return (
      <li className="collection-item avatar">
        <Link to={ "/expense/" + this.props.data.expenseId }>
        <img src="images/Icecream.png" className="circle" />
        <span className="title">${ this.props.data.amount }</span>
        <p>
          { this.props.data.description }
        </p>
        </Link>
      </li> );
  }
};

//todo propTypes

module.exports = Expense;