const React = require("react");
const Navbar = require("components/navbarComponent.jsx");
const connect = require("react-redux").connect;

class LedgerPage extends React.Component {

  renderEachPerson(ledgerObj) {

    let htmlForLedger = [];
    let owedAmounts = [];
    let personObj;
    let pUniqueKey;
    let personDivStyle = {
      marginTop: "2rem"
    };

    for (let person in ledgerObj) {

      personObj = ledgerObj[person];
      owedAmounts = [];

      for (let owedPerson in personObj) {

        pUniqueKey = person + "Owes" + owedPerson;

        owedAmounts.push(<p key={ pUniqueKey }>
                           { owedPerson } : $
                           { personObj[owedPerson] }
                         </p>);
      }

      htmlForLedger.push(<div key={ person } className="row container center-align ftest-person" style={ personDivStyle }>
                           <h1>{ person }</h1>
                           <div className="section">
                             <h2>Owes</h2>
                             <div className="divider ftest-owes"></div>
                             { owedAmounts }
                           </div>
                         </div>);

    }

    return htmlForLedger;
  };

  render() {

    let htmlRender = this.renderEachPerson(this.props.data);

    return (<div>
              <Navbar title="Ledger" />
              { htmlRender }
            </div>);
  };
};

let mapStateToLedgerProps = function(state) {
  return {
    data: state.ledger
  };
};

LedgerPage = connect(mapStateToLedgerProps)(LedgerPage);

module.exports = LedgerPage;