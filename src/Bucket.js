import React, { Component } from 'react';
import './App.css';
import bucket from './bucket3.svg';
import close from './close.svg';
import coin from './coin-svgrepo-com.svg';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';


class Bucket extends Component {
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  state = {
    paid: 0
  };
  coins = [];


  handleChange = name => event => {
    console.log(event.target.value);
    console.log(this.state.paid);

    if(isNaN(Number(event.target.value))) {
      console.log('input error');


    } else {
      if(Number(Number(event.target.value).toFixed(2)) > Number(Number(this.state.paid).toFixed(2))) {
        console.log('added');

        let ratio = Number(Number(event.target.value).toFixed(2)) / Number(Number(this.props.debt.amount).toFixed(2));
        if( Number(Number(event.target.value).toFixed(2)) > Number(Number(this.props.debt.amount).toFixed(2)) ) {
          ratio = 1;
        }
        ratio *= 100;

        for(let i = 0; i < 10; i++) {
          if(ratio >= ((i*10) + 10)) {
            this.coins[10 - (1+i)].className += ' coin-transform';


          }
        }

        if(ratio === 100) {
          this.node.getElementsByClassName('bucket-img')[0].classList += ' bucket-img-full';
          for(let i = 0; i < 10; i++) {
            this.coins[i].className = 'coin coin-transform-full';
          }
        } else {
          this.node.getElementsByClassName('bucket-img')[0].classList += ' bounce';
          setTimeout(function() {
            this.node.getElementsByClassName('bucket-img')[0].classList = 'bucket-img';
          }.bind(this), 100);
        }
      }

      if((Number(event.target.value).toFixed(2)) < (Number(this.state.paid).toFixed(2))) {
        console.log('removed');
      }

      this.props.input(this.props.index, event.target.value);
    }
  };


  render() {
    let index = 0;
    return (
      <section className='bucket'>
        <div className='close'>
          <img onClick={this.props.removeBucket} src={close} alt='Close' />
        </div>
        <div>
          <h3>{this.props.debt.name}</h3>
        </div>
        <div ref={ node => this.node = node } className='bucket-animation-container'>
          <img className='bucket-img' src={bucket} alt='Bucket' />
          <div className='money-pile'>
            <div className='wrapper'>
              <div className="row row1">
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
              </div>
              <div className="row row2">
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
              </div>
              <div className="row row3">
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
              </div>
              <div className="row row4">
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
                <img ref={ node => this.coins[index++] = node } className='coin' src={coin} alt='Coin' />
              </div>
            </div>
          </div>
        </div>
        <div className='bucket-amount-container'>
          <div className='bucket-amount'>Amount: {this.formatter.format(this.props.debt.amount)}</div>
        </div>
        <div className='input-container'>
          <Input
            id="standard-name"
            label="Paid"
            value={this.state.paid}
            onChange={this.handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </div>
        <div>
          Amount left to pay: {Number(this.state.paid) > this.props.debt.amount
            ? (this.formatter.format(0))
            : (this.formatter.format((this.props.debt.amount - Number(this.state.paid)).toFixed(2)))
          }
        </div>
      </section>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({paid: nextProps.debt.paid});
  }
}

export default Bucket;
