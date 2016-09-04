var LedgerPage = React.createClass({
  renderEachPerson: function(ledgerObj) {

    var htmlForLedger = [];
    var owedAmounts = [];

    var divStyle = {
      marginTop: "2rem"
    };

    for (var person in ledgerObj) {

      var personObj = ledgerObj[person];
      owedAmounts = [];

      for (var owedPerson in personObj) {

        // todo: change getMagicKey to something else
        owedAmounts.push(<p key={ getMagicKey() }>
                           { owedPerson } : $
                           { personObj[owedPerson] }
                         </p>);
      }

      htmlForLedger.push(<div key={ person } className="row container center-align ftest-person" style={ divStyle }>
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

