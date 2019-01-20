import React, { Component } from 'react';
import './App.css';
import Bucket from './Bucket.js';



class App extends Component {
  state = {
    totalMoney: 1000.11,
    paid: 0.00,
    debts: [
      { name: 'Sock Loan', amount: 100.01, paid: 0.00 },
      { name: 'Rent', amount: 620.95, paid: 0.00 },
      { name: 'Christmas Presents', amount: 500.79, paid: 0.00 }
    ]
  };

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Budget Bucket</h1>
        </header>
        <main>
          <div>
            <h2 className='remaining-money'>
              Remaining Money: {this.formatter.format(this.state.totalMoney - this.state.paid)}
            </h2>
            <h3 className='total-money'>
              Total Money: {this.formatter.format(this.state.totalMoney)}
            </h3>
          </div>
          <div className='bucket-container'>
            {
              this.state.debts.length > 0
                ? (this.state.debts.map((debt, index) =>
                    <Bucket input={this.input} removeBucket={() => this.removeBucket(debt, index)} debt={debt} index={index} key={index} />
                  ))
                : (<div className='no-buckets'>
                    No buckets add one
                  </div>)
            }
          </div>
        </main>
      </div>
    );
  }

  input = (index, value) => {
    const items = this.state.debts;
    items[index].paid = value;

    this.setState({
      debts: items
    });
    this.updateAmounts();
  }

  updateAmounts = () => {
    //Amount left to pay: {(this.props.debt.amount - Number(this.state.amount)).toFixed(2)}
    let paid = 0;
    for(let i = 0; i < this.state.debts.length; i++) {
      if(!isNaN(Number(this.state.debts[i].paid).toFixed(2))) {
        if(Number(Number(this.state.debts[i].paid).toFixed(2)) > this.state.debts[i].amount) {
          paid += this.state.debts[i].amount;
        } else {
          paid += Number(Number(this.state.debts[i].paid).toFixed(2));
        }
      }
    }
    this.setState({paid: paid});
  }

  removeBucket = (debt, index) => {
    this.state.debts.splice(index, 1);
    this.setState({ debts: this.state.debts });
  }
}

export default App;
