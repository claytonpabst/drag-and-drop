import React, { Component } from 'react';
import pencil from './../../../media/pencil.png';
import './Scoresheet.css';


class Scoresheet extends Component {

  render() {
    return (
      <div className="scoresheet">

          <img className='pencil' src={ pencil } alt='a pencil' />

          <h2>Scoresheet</h2>

          <h3>Upper</h3>
          <table>
            <tbody>
              <tr onClick={() => this.props.selectScore(1) } title='Total of all your ones' >
                <td>1</td>
                <td className='scoresheet_scores'>{ this.props.ones }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(2) } title='Total of all your twos' >
                <td>2</td>
                <td className='scoresheet_scores'>{ this.props.twos }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(3) } title='Total of all your threes' >
                <td>3</td>
                <td className='scoresheet_scores'>{ this.props.threes }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(4) } title='Total of all your fours' >
                <td>4</td>
                <td className='scoresheet_scores'>{ this.props.fours }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(5) } title='Total of all your fives' >
                <td>5</td>
                <td className='scoresheet_scores'>{ this.props.fives }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(6) } title='Total of all your sixes' >
                <td>6</td>
                <td className='scoresheet_scores'>{ this.props.sixes }</td>
              </tr>
              <tr className='totals'>
                <td>Upper Total</td>
                <td className='scoresheet_scores'>{ this.props.upperTotal }</td>
              </tr>
              <tr className='totals' title='35 bonus points if your upper section scores 63 or higher' >
                <td>Bonus</td>
                <td className='scoresheet_scores'>{ this.props.bonus }</td>
              </tr>
            </tbody>
          </table>

          <h3>Lower</h3> 
          <table>
            <tbody>
              <tr onClick={() => this.props.selectScore(7) } title='Total of all five dice IF at least 3 are the same number' >
                <td>3-of-a-kind</td>
                <td className='scoresheet_scores'>{ this.props.threeKind }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(8) } title='Total of all five dice IF at least 4 are the same number' >
                <td>4-of-a-kind</td>
                <td className='scoresheet_scores'>{ this.props.fourKind }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(25) } title='25 pts if you get 3 of one number and 2 of another' >
                <td>Full House</td>
                <td className='scoresheet_scores'>{ this.props.fullhouse }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(30) } title='30 pts if you get four numbers in a row: 1,2,3,4 or 2,3,4,5 or 3,4,5,6' >
                <td>Small Straight</td>
                <td className='scoresheet_scores'>{ this.props.smallStraight }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(40) } title='40 pts if you get five numbers in a row: 1,2,3,4,5 or 2,3,4,5,6' >
                <td>Large Straight</td>
                <td className='scoresheet_scores'>{ this.props.largeStraight }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(50) } title='50 pts if all five dice are the same' >
                <td>Yahtzee</td>
                <td className='scoresheet_scores'>{ this.props.yahtzee }</td>
              </tr>
              <tr onClick={() => this.props.selectScore(51) } title='Total of all five dice' >
                <td>Chance</td>
                <td className='scoresheet_scores'>{ this.props.chance }</td>
              </tr>
              <tr className='totals'>
                <td>Lower Total</td>
                <td className='scoresheet_scores'>{ this.props.lowerTotal }</td>
              </tr>
            </tbody>
          </table>

          <div className='total_div totals'>
            <h3>Grand Total</h3>
            <p className='scoresheet_scores'>{Number(this.props.upperTotal) + Number(this.props.lowerTotal) + Number(this.props.bonus)}</p>
          </div>

      </div>
    );
  }
}


export default Scoresheet;