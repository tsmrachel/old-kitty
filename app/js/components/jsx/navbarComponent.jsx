var Navbar = React.createClass({
  render: function() {

    var divStyle = {
      marginLeft: "5px"

    };

    if (this.props.title == "Expenses") {

      var rightMenu = ( <li>
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
});
