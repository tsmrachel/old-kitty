var LedgerPage = React.createClass({
  renderEachPerson: function(ledgerObj) {

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
  },
  render: function() {

    var htmlRender = this.renderEachPerson(this.props.data);

    return (<div>
              <Navbar title="Ledger" />
              { htmlRender }
            </div>);
  }

});

