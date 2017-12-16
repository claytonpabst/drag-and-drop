import React, { Component } from 'react';
import './Board.css';


class Board extends Component {

  render() {

    let savedDice = this.props.savedDice.sort();
    let background;

    switch(this.props.theme){
      case 'Classic':
        background = '#277714'
        break;
      case 'Metal':
        background = '#444'
        break;
      case 'Flames':
        background = '#e65e00'
        break;
      default:
        background = '#277714'
        break;
    }

    return (
      <div className='playing_area'>

        <div className='dice_holding_area'>
          {
            savedDice.map( (die, i) => {
              if (die === 1){
                return <div className='saved_die one' key={i}
                onClick={ () => this.props.returnDiceToTable(i) }></div>
              }else if (die === 2){
                return <div className='saved_die two' key={i}
                onClick={ () => this.props.returnDiceToTable(i) }></div>
              }else if (die === 3){
                return <div className='saved_die three' key={i}
                onClick={ () => this.props.returnDiceToTable(i) }></div>
              }else if (die === 4){
                return <div className='saved_die four' key={i}
                onClick={ () => this.props.returnDiceToTable(i) }></div>
              }else if (die === 5){
                return <div className='saved_die five' key={i}
                onClick={ () => this.props.returnDiceToTable(i) }></div>
              }else if (die === 6){
                return <div className='saved_die six' key={i}
                onClick={ () => this.props.returnDiceToTable(i) }></div>
              }else {
                return <div className='one' key={i}></div>
              }
            })
          }
        </div>

        <div className="board" style={{background: background}}>
          {
            this.props.diceOnTable.map( (die, i) => {
              if (die === 1){
                return <div className='single_die one' key={i}
                onClick={ () => this.props.setDiceAside(i) } ></div>
              }else if (die === 2){
                return <div className='single_die two' key={i}
                onClick={ () => this.props.setDiceAside(i) } ></div>
              }else if (die === 3){
                return <div className='single_die three' key={i}
                onClick={ () => this.props.setDiceAside(i) } ></div>
              }else if (die === 4){
                return <div className='single_die four' key={i}
                onClick={ () => this.props.setDiceAside(i) } ></div>
              }else if (die === 5){
                return <div className='single_die five' key={i}
                onClick={ () => this.props.setDiceAside(i) } ></div>
              }else if (die === 6){
                return <div className='single_die six' key={i}
                onClick={ () => this.props.setDiceAside(i) } ></div>
              }else{
                return <div className='one' key={i}></div>
              }
            })
          }
        </div>

      </div>
    );
  }
}


export default Board;