import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RulesSection.css';


class RulesSection extends Component {

  render() {

    let content = null;
    if (this.props.content === 'object'){
      content = `The object of Yahtzee is to obtain the highest score from throwing 5 dice. The game consists of 13 rounds. In each round, you roll the dice and then score the roll in one of 13 categories. You must score once in each category. The score is determined by a different rule for each category. The game ends once all 13 categories have been scored.`
    }else if (this.props.content === 'start'){
      content = `To start with, roll all the dice. After rolling you can either score the current roll (see below), or re-roll any or all of the dice. You may only roll the dice a total of 3 times per turn. After rolling 3 times you MUST choose a category to score. You may score the dice at any point in the round, i.e. it doesn't have to be after the 3rd roll.`
    }else if (this.props.content === 'scoring'){
      content = `To score your combination of 5 dice, you click one of the 13 boxes, or write it on the scorecard (scoresheet). There are two sections to the score table - the Upper Section and the Lower Section. Once a box has been scored, it cannot be scored again for the rest of the game (except the Yahtzee category), so choose wisely.`
    }else if (this.props.content === 'upper'){
      content = `If you score in the upper section of the table, your score is the total of the specified die face. So if you roll: 
      5 - 2 - 5 - 6 - 5 and score in the Fives category, your total for the category would be 15, because there are three fives, which are added together. If the One, Three or Four Categories were selected for scoring with this roll, you would score a zero. If placed in the Two or Six category, you would score 2 and 6 respectively. At the end of the game, if the total of Upper scores is 63 or more, you earn a bonus of 35 points. Note that 63 is the total of three each of 1s, 2s, 3s, 4s, 5s and 6s.`
    }else if (this.props.content === 'lower'){
      content = `In the lower scores, you score either a set amount (except 3/4 of a kind and Chance; see below), or zero if you don't satisfy the category requirements.

      3 and 4 of a kind - for 3 of a kind you must have at least 3 of the same die faces. You score the total of ALL the dice (all 5). For 4 of a kind you would need 4 die faces the same, and you score the total of ALL 5 dice.

      A Straight is a sequence of consecutive die faces, where a small straight is 4 consecutive faces, and a large straight 5 consecutive faces.
      Small straights score 30 and large straights score 40 points.
      So if you rolled:
      2 - 3 - 2 - 5 - 4
      you could score 30 in small straight or 0 in large straight. 
      
      A Full House is where you have 3 of a kind and 2 of a kind. Full houses score 25 points.
      i.e.:
      3 - 3 - 2 - 3 - 2
      would score 25 in the Full House category. 

      A Yahtzee is 5 of a kind and scores 50 points, although you may elect NOT to score it as a yahtzee if you wish, instead choosing to take it as a top row score and safegaurd you bonus.

      Chance - You can roll anything and be able to put it in the Chance category. You score the total of all 5 dice.`
    }else if (this.props.content === 'yahtzee'){
      content = `Additional Yahtzees: If you roll any additional Yahtzees in a game (more than one), AND you scored your first yahtzee in the Yahtzee box, you would score a further bonus 100 points in the yahtzee box. You must also put this roll into another category, as follows:
      -If the corresponding Upper section category is not filled then you must score there.
      ie if you rolled 4 - 4 - 4 - 4 - 4 and the Fours Category is not filled, you must put the score in the Fours category.

      -If the corresponding Upper section category is filled you may then put the score anywhere on the Upper Section (scoring zero), or one of the lower section categories. In 3 of a Kind, 4 of a Kind, and Chance categories you would score the total of the die faces. For the Small Straight, Large Straight, and Full House categories, you would score 30, 40 and 25 points respectively.`
    }else if (this.props.content === 'scratch'){
      content = `You can score any roll in any category at any time, even if the resulting score is zero. Eg, you can take 2-3-3-4-6 in the 5's category. It will score 0. This could be used near the end of a game to lose a poor roll against a difficult-to-get category that you've failed to fill (eg, long straight or yahtzee).`
    }

    return (
      <div className="rules_section">

          <Link className='close' to='/'>X</Link>

          <h1>{this.props.heading}</h1>
          <p>{ content }</p>

      </div>
    );
  }
}


export default RulesSection;