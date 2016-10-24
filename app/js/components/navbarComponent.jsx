const React = require("react");
const Link = require("react-router").Link;

class Navbar extends React.Component {
  render() {

    let divStyle = {
      marginLeft: "5px"
    };

    let rightMenu;

    if (this.props.title === "Expenses") {
      rightMenu = (<li>
                      <Link to="/ledger">
                        <img src="images/Financial.png" className="icon ftest-ledgerIcon" />
                      </Link>
                    </li>);

    }

    return (
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo" style={ divStyle }>{ this.props.title }</span>
          <ul className="right hide-on-med-and-down">
            { rightMenu }
          </ul>
        </div>
      </nav>            );
  }
}
;

module.exports = Navbar;