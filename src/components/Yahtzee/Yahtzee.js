import React, { Component } from 'react';
import axios from 'axios';
import Scoresheet from './Scoresheet/Scoresheet.js';
import Board from './Board/Board.js';
import classicCup from './../../media/cup.png';
import metalCup from './../../media/metalCup.png';
import flamesCup from './../../media/flamesCup.png';
import './Yahtzee.css';

class Game extends Component {

  constructor(props){
    super(props);

    this.state = {
      startGame: true,
      showAreYouSure: false,
      ones: '',
      twos: '',
      threes: '',
      fours: '',
      fives: '',
      sixes: '',
      threeKind: '',
      fourKind: '',
      fullhouse: '',
      smallStraight: '',
      largeStraight: '',
      yahtzee: '',
      chance: '',
      upperTotal: 0,
      bonus: 0,
      lowerTotal: 0,
      grandTotal: 0,
      savedDice: [],
      diceOnTable: [6, 6, 6, 6, 6],
      rollNum: 1,
      userScoreSelection: '',
      showYahtzeeModal: false,
      isYahtzee: false,
      finalDice: {},
      yahtzeeNum: null,
      forceupperTotal: false,
      userSelectionString: '',
      selectionsMade: 0,
      highScores: [{}],
      username: '',
      showHighScores: false,
      showSettingsModal: false,
      theme: 'Classic',
      audioSrc: '',
      soundIsOn: true
    }

    this.getGrandTotal = this.getGrandTotal.bind(this);
    this.assertSelection = this.assertSelection.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeYahtzeeModal = this.closeYahtzeeModal.bind(this);
    this.selectScore = this.selectScore.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.bonusYahtzee = this.bonusYahtzee.bind(this);
    this.setDiceAside = this.setDiceAside.bind(this);
    this.returnDiceToTable = this.returnDiceToTable.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateHighScores = this.updateHighScores.bind(this);
    this.newGame = this.newGame.bind(this);
    this.closeStartGameHelp = this.closeStartGameHelp.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.closeSettingsModal = this.closeSettingsModal.bind(this);
    this.updateTheme = this.updateTheme.bind(this);
    this.shakeCup = this.shakeCup.bind(this);
    this.stopShakingCup = this.stopShakingCup.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount(){
    console.log(this.props.uniqueID);
  }

  getGrandTotal(){
    let {ones, twos, threes, fours, fives, sixes, threeKind, fourKind, fullhouse, smallStraight, largeStraight, yahtzee, chance} = this.state;
    let bonus = 0;
    let upperTotal = Number(ones) + Number(twos) + Number(threes) + Number(fours) + Number(fives) + Number(sixes);
    if (upperTotal >= 63){
      bonus = 35;
    }
    let lowerTotal = Number(threeKind) + Number(fourKind) + Number(fullhouse) + Number(smallStraight) + Number(largeStraight) + Number(yahtzee) + Number(chance);
    let grandTotal = upperTotal + bonus + lowerTotal;

    let randomMessage = this.generateRandomMessage()
    this.setState({
      gameOverMessage: randomMessage,
      upperTotal: upperTotal,
      bonus: bonus,
      lowerTotal: lowerTotal,
      grandTotal: grandTotal
    })
  }

  generateRandomMessage(){
    let randomMessages = [
      'Weak sauce son!',
      'Is that all you got?',
      'I expected bigger and better...',
      'I haven\'t seen a score that low since... well nevermind',
      'I didn\'t know the scores went that low!',
      'Let\'s try again, but this time try to win',
      'What is this? A yahtzee score for ants?!',
      'One of these days you\'ll bring your A game',
      'You can do better than that!',
      'If I had a LOW scores table, we\'d be getting somewhere',
      'I dare you to try again',
    ]
    let r = Math.floor(Math.random() * randomMessages.length)
    return randomMessages[r]
  }

  assertSelection(){
    let num = this.state.userScoreSelection;
    let { finalDice, isYahtzee } = this.state
    
    let diceTotal = finalDice[1]+finalDice[2]*2+finalDice[3]*3+finalDice[4]*4+finalDice[5]*5+finalDice[6]*6

    switch (num){
      case 50:
        if (this.state.yahtzee === '' && isYahtzee){
          this.setState({
            yahtzee: 50,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }else if (this.state.yahtzee === '' && !isYahtzee){
          this.setState({
            yahtzee: 0,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 1:
        if (this.state.ones === ''){
          this.setState({
            ones: finalDice[1],
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 2:
        if (this.state.twos === ''){
          this.setState({
            twos: finalDice[2]*2,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 3:
        if (this.state.threes === ''){  
          this.setState({
            threes: finalDice[3]*3,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 4:
        if (this.state.fours === ''){  
          this.setState({
            fours: finalDice[4]*4,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 5:
        if (this.state.fives === ''){  
          this.setState({
            fives: finalDice[5]*5,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 6:
        if (this.state.sixes === ''){  
          this.setState({
            sixes: finalDice[6]*6,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 7:
        if (this.state.threeKind === ''){
          let threeKindScore = 0;
          for (var key in finalDice){
            if (finalDice[key] >= 3){
              threeKindScore = diceTotal
            }
          }
          this.setState({
            threeKind: threeKindScore,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 8:
        if (this.state.fourKind === ''){
          let fourKindScore = 0;
          for (var fkkey in finalDice){
            if (finalDice[fkkey] >= 4){
              fourKindScore = diceTotal
            }
          }
          this.setState({
            fourKind: fourKindScore,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 25:
        if (this.state.fullhouse === ''){
          let fullhouseScore = 0;
          for (var fhkey in finalDice){
            if (finalDice[fhkey] === 3){
              for (var fhkey2 in finalDice){
                if (finalDice[fhkey2] === 2){
                  fullhouseScore = 25;
                }
              }
            }
          }
          if (this.state.isYahtzee){
            fullhouseScore = 25;
          }
          this.setState({
            fullhouse: fullhouseScore,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 30:
        if (this.state.smallStraight === ''){
          let smallStraightScore = 0;
          if ((finalDice[1] >= 1 && finalDice[2] >= 1 && finalDice[3] >= 1 && finalDice[4] >= 1) || (finalDice[2] >= 1 && finalDice[3] >= 1 && finalDice[4] >= 1 && finalDice[5] >= 1) || (finalDice[3] >= 1 && finalDice[4] >= 1 && finalDice[5] >= 1 && finalDice[6] >= 1) ){
            smallStraightScore = 30;
          }
          if (this.state.isYahtzee){
            smallStraightScore = 30;
          }
          this.setState({
            smallStraight: smallStraightScore,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 40:
        if (this.state.largeStraight === ''){
          let largeStraightScore = 0;
          if ((finalDice[1] === 1 && finalDice[2] === 1 && finalDice[3] === 1 && finalDice[4] === 1 && finalDice[5] === 1) || ((finalDice[2] === 1 && finalDice[3] === 1 && finalDice[4] === 1 && finalDice[5] === 1 && finalDice[6] === 1))){
            largeStraightScore = 40;
          }
          if (this.state.isYahtzee){
            largeStraightScore = 40;
          }
          this.setState({
            largeStraight: largeStraightScore,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      case 51:
        if (this.state.chance === ''){
          this.setState({
            chance: diceTotal,
            rollNum: 1,
            diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
            savedDice: []
          })
        }
        break;
      default:
      console.log('default switch')
    }
    this.setState({
      selectionsMade: this.state.selectionsMade + 1
    }, function(){
      if (this.state.selectionsMade >= 13){
        this.getGrandTotal()
      }
    })
    this.closeModal();
  }

  closeModal(){
    this.setState({
      showAreYouSure: false
    })
  }

  closeYahtzeeModal(){
    this.setState({
      showYahtzeeModal: false
    })
  }

  selectScore(num){
    if (this.state.rollNum <= 1){
      return alert('Please roll the dice first by clicking on the cup')
    }

    let stateMatch = {
      1: 'ones',
      2: 'twos',
      3: 'threes',
      4: 'fours',
      5: 'fives',
      6: 'sixes',
      7: 'threeKind',
      8: 'fourKind',
      25: 'fullhouse',
      30: 'smallStraight',
      40: 'largeStraight',
      50: 'yahtzee',
      51: 'chance'
    }
    this.stateMatch = stateMatch
    let match = stateMatch[num]
    if (this.state[match] !== ''){
      return alert('You have already scored in that category, and cannot score there again')
    }
    this.setState({
      showAreYouSure: true,
      userScoreSelection: num,
      userSelectionString: match
    })
  }

  rollDice(){
    this.closeModal();
    this.closeStartGameHelp();
    this.closeSettingsModal();
    this.closeYahtzeeModal();
    if (this.state.soundIsOn){
      this.setState({
        audioSrc: './media/move.wav'
      }, () => {
        setTimeout( () => {
          this.setState({
            audioSrc: ''
          })
        }, 2000)
      })
    }
    if (this.state.rollNum === 1){
      this.setState({
        savedDice: []
      })
    }
    if (this.state.rollNum <= 3){
      let { diceOnTable } = this.state;
      let cup = document.getElementById('cup' + this.props.uniqueID);
      cup.style.animation = 'rollDice 2s';
      setTimeout(function() {
        cup.style.animation = 'none'
      }, 2000);

      for (let i = 0; i < diceOnTable.length; i ++){
        let r = Math.floor( Math.random()*6) + 1;
        diceOnTable[i] = r;
        // diceOnTable[i] = 5
      }
      this.setState({
        diceOnTable: diceOnTable,
        rollNum: this.state.rollNum + 1
      }, function(){
          let isYahtzee = false;
          let yahtzeeNum = null;
          let finalDice = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
          }
          for (var i = 0; i < 5; i ++){
            if (this.state.diceOnTable[i]){
              finalDice[this.state.diceOnTable[i]] ++
            }
            if (this.state.savedDice[i]){
              finalDice[this.state.savedDice[i]] ++
            }
          }
          for (var number in finalDice){
            if (finalDice[number] === 5){
              isYahtzee = true;
              yahtzeeNum = number
            }
          }
          if (isYahtzee && this.state.yahtzee >= 50){
            this.setState({
              yahtzee: this.state.yahtzee + 100,
              isYahtzee: isYahtzee,
              finalDice: finalDice,
              showYahtzeeModal: true,
              yahtzeeNum: yahtzeeNum
            }, this.bonusYahtzee)
          }else{
            this.setState({
              isYahtzee: isYahtzee,
              finalDice: finalDice,
              yahtzeeNum: yahtzeeNum
            })
          }
      })
    }else if (this.state.rollNum > 3){
      alert('Please select a scoring option first by clicking on the scoresheet')
    }
  }

  bonusYahtzee(){
    let num = this.stateMatch[this.state.yahtzeeNum]
    if (this.state[num] === ''){
      //user hasn't scored upper section yet
      let state = this.state
      state[num] = this.state.yahtzeeNum * 5
      let newState = Object.assign({}, this.state, state)
      this.state = newState
      this.setState({
        rollNum: 1,
        diceOnTable: [...this.state.diceOnTable, ...this.state.savedDice],
        savedDice: [],
        forceupperTotal: true,
        selectionsMade: this.state.selectionsMade + 1
      },
        function(){
          if (this.state.selectionsMade >= 13){
            this.getGrandTotal()
          }
        }
      )
    }else{
      //upper section has been scored, user may select any other box they wish. Play continues as normal
      this.setState({
        forceupperTotal: false
      })
    }
  }

  setDiceAside(index){
    if (this.state.rollNum <= 1){
      return alert('Please roll the dice first by clicking on the cup')
    }
    let num = this.state.diceOnTable[index];
    let diceOnTable = this.state.diceOnTable.slice()
    let savedDice = this.state.savedDice.slice();
    diceOnTable.splice(index, 1);
    savedDice.push(num);
    this.setState({
      savedDice: savedDice,
      diceOnTable: diceOnTable
    })
  }

  returnDiceToTable(index){
    let num = this.state.savedDice[index];
    console.log(num)
    let savedDice = this.state.savedDice.slice();
    let diceOnTable = this.state.diceOnTable.slice();
    savedDice.splice(index, 1);
    diceOnTable.push(num);
    this.setState({
      savedDice: savedDice,
      diceOnTable: diceOnTable
    })
  }

  updateUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  updateHighScores(){
    axios.put('/api/highscores/classic', {
      score: this.state.grandTotal,
      name: this.state.username,
      id: this.state.highScores[4].id
    })
    .then( res => {
      this.setState({
        highScores: res.data,
        showHighScores: true
      })
    })
  }

  newGame(){
    this.setState({
      showAreYouSure: false,
      ones: '',
      twos: '',
      threes: '',
      fours: '',
      fives: '',
      sixes: '',
      threeKind: '',
      fourKind: '',
      fullhouse: '',
      smallStraight: '',
      largeStraight: '',
      yahtzee: '',
      chance: '',
      upperTotal: 0,
      bonus: 0,
      lowerTotal: 0,
      grandTotal: 0,
      savedDice: [],
      diceOnTable: [6, 6, 6, 6, 6],
      rollNum: 1,
      userScoreSelection: '',
      showYahtzeeModal: false,
      isYahtzee: false,
      finalDice: {},
      yahtzeeNum: null,
      forceupperTotal: false,
      userSelectionString: '',
      selectionsMade: 0,
      username: '',
      showHighScores: false
    })
  }

  closeStartGameHelp(){
    this.setState({
      startGame: false
    })
  }

  toggleSettingsModal(){
    this.closeModal();
    this.closeStartGameHelp();
    this.closeYahtzeeModal();
    this.setState({
      showSettingsModal: !this.state.showSettingsModal
    })
  }

  closeSettingsModal(){
    this.setState({
      showSettingsModal: false
    })
  }

  updateTheme(e){
    this.setState({
      theme: e.target.value
    })
  }

  shakeCup(){
    if (this.state.showAreYouSure ||
    this.state.showHighScores || 
    this.state.showSettingsModal || 
    this.state.showYahtzeeModal ||
    this.state.startGame){
      // console.log('modal open')
      return;
    }
    let cup = document.getElementById('cup' + this.props.uniqueID);
    let {theme} = this.state 
    if (theme === 'Classic'){
      // console.log('classic shake')
      cup.style.animation = 'shakeClassicCup 0.2s infinite'
    }else if (theme === 'Metal'){
      // console.log('metal shake')
      cup.style.animation = 'shakeMetalCup 0.2s infinite'
    }else if (theme === 'Flames'){
      // console.log('flames shake')
      cup.style.animation = 'shakeFlamesCup 0.2s infinite'
    }
    if (this.state.soundIsOn){
      this.setState({
        audioSrc: './media/shakeDice.wav'
      })
    }
  }

  stopShakingCup(){
    let cup = document.getElementById('cup' + this.props.uniqueID);
    if (cup.style.animation !== 'rollDice 2s'){
      cup.style.animation = 'none'
    }
    this.setState({
      audioSrc: ''
    })
  }

  toggleSound(){
    this.setState({
      soundIsOn: !this.state.soundIsOn
    })
  }

  render() {

    let settingsModal = null;
    if (this.state.showSettingsModal){
      settingsModal = <div className='settings_modal'>
          <h4>Theme</h4>
          <p onClick={ this.closeSettingsModal }>X</p>
          <select onChange={ this.updateTheme } value={this.state.theme}>
            <option>Classic</option>
            <option>Metal</option>
            <option>Flames</option>
          </select>
          <h4>Sound</h4>
          <select onChange={ this.toggleSound } value={ this.state.soundIsOn ? 'On' : 'Off' }>
            <option>On</option>
            <option>Off</option>
          </select>
        </div>
    }else{
      settingsModal = null;
    }

    let howToPlay = null;
    if (this.state.startGame){
      howToPlay = <ul className='how_to_play'>
          <li>Roll the dice by clicking on the cup</li>
          <li>Click on the dice to set them aside. Any dice still on the table will be re-rolled when you click on the cup</li>
          <li>Hover over the scoresheet to see what each category is</li>
          <li>Click on a category during any part of your turn to score there. You don't have to use all 3 rolls if you don't want to</li>
          <button onClick={ this.closeStartGameHelp }>Close</button>
        </ul>
    }

    let areYouSure = null;
    if (this.state.showAreYouSure){
      areYouSure =  <div className='are_you_sure'>
                      <p>Are You Sure you want to score in the { this.state.userSelectionString } category?</p>
                      <button onClick={ this.assertSelection } >Yes</button>
                      <button onClick={ this.closeModal } >No</button>
                    </div>
    }else{
      areYouSure = null;
    }

    let rollNum = this.state.rollNum;
    let rollStyles = {
      fontSize: '30px'
    }
    if (rollNum > 3){
      rollNum = 'Please select a category to score in'
      rollStyles = {
        fontSize: '16px',
        lineHeight: '16px'
      }
    }

    let yahtzeeModal = null;
    if(this.state.showYahtzeeModal && this.state.forceupperTotal){
      yahtzeeModal = <div className='yahtzee_modal'>
          <p>When you score more than one Yahtzee in a game, you get 100 bonus points, which have already been applied for you. Your upper score for that number hasn't yet been filled. You MUST score up there, so we have filled in that spot for you! Roll the dice again to keep playing.</p>
          <button onClick={ this.closeYahtzeeModal }>Close</button>
        </div>
    }else if (this.state.showYahtzeeModal){
      yahtzeeModal = <div className='yahtzee_modal'>
          <p>When you score more than one Yahtzee in a game, you get 100 bonus points, and you get to use the yahtzee to score in another spot. Your upper score has already been filled in, so you can score in any of the lower section categories and receive that score. For instance, you can score in the large straight caterogy if you wish, and receive the full 40 points!</p>
          <button onClick={ this.closeYahtzeeModal }>Close</button>
        </div>
    }else{
      yahtzeeModal = null
    }

    let gameOverModal = null;
    if (this.state.selectionsMade >= 13){
      gameOverModal = <div className='game_over_modal'>
          <h4>Your Final Score: { this.state.grandTotal }</h4>
          <button onClick={ this.newGame } className='game_over_button'>New Game</button>
        </div>
    }else if (this.state.selectionsMade >= 13){
      gameOverModal = <div className='game_over_modal'>
          <h3>Game Over!</h3>
          <h4>Your Final Score: { this.state.grandTotal }</h4>
          <p>{ this.state.gameOverMessage }</p>
        </div>
    }else{
      gameOverModal = null;
    }

    let highScores = null;
    if (this.state.showHighScores){
      highScores = <div className='high_scores_modal'>
          <h3>Classic High Scores</h3>
          {this.state.highScores.map( (data, i) => {
            return <p key={i}> {data.score} - {data.name} </p>
          })}
          <button onClick={ this.newGame }>New Game</button>
        </div>
    }else{
      highScores = null;
    }

    let cup = classicCup;
    let cupStyles = {};
    let background = {};
    switch(this.state.theme){
      case 'Classic':
        background={
          background: 'url("http://cdn.wallpapersafari.com/79/31/Em1adP.jpg")center no-repeat',
          backgroundSize: 'cover'
        }
        cup = classicCup
        cupStyles = {
          transform: 'scale(0.4) rotate(90deg)',
          right: '-120px',
          bottom: '50px'
        }
        break;
      case 'Metal':
        background={
          background: 'url("https://s-media-cache-ak0.pinimg.com/originals/81/66/ce/8166ce752069e7df3a55b993fe9ae1d4.jpg")center no-repeat',
          backgroundSize: 'cover'
        }
        cup = metalCup
        cupStyles = {
          transform: 'scale(0.35)',
          right: '-10px',
          bottom: '20px'
        }
        break;
      case 'Flames':
        background={
          background: 'url("https://orig14.deviantart.net/e267/f/2014/311/a/d/background_fire_theme_by_lockeliefather-d85ka9h.png")center no-repeat',
          backgroundSize: 'cover'
        }
        cup = flamesCup
        cupStyles = {
          transform: 'scale(0.35)',
          right: '-20px',
          bottom: '20px'
        }
        break;
      default:
        background={
          background: 'url("http://cdn.wallpapersafari.com/79/31/Em1adP.jpg")center no-repeat',
          backgroundSize: 'cover'
        }
        cup = classicCup
        cupStyles = {
          transform: 'scale(0.5) rotate(90deg)',
          right: '-120px',
          bottom: '50px'
        }
        break;
    }

    let {ones, twos, threes, fours, fives, sixes, threeKind, fourKind, fullhouse, smallStraight, largeStraight, yahtzee, chance, bonus} = this.state;
    let upperTotal = Number(ones)+Number(twos)+Number(threes)+Number(fours)+Number(fives)+Number(sixes);
    if (upperTotal >= 63){
      bonus = 35;
    }
    let lowerTotal =  Number(threeKind)+Number(fourKind)+Number(fullhouse)+Number(smallStraight)+Number(largeStraight)+Number(yahtzee)+Number(chance);

    return (
      <div className="game" id={'game' + this.props.uniqueID} style={background}>

        { howToPlay }
        { areYouSure }
        { yahtzeeModal }
        { gameOverModal }
        { highScores }
        { settingsModal }

        <button className='link settings'
        onClick={ this.toggleSettingsModal }
        title='change the settings'>Settings</button>
        
        <Scoresheet ones={ones}
        twos={twos}
        threes={threes}
        fours={fours}
        fives={fives}
        sixes={sixes}
        bonus={bonus}
        upperTotal={upperTotal}
        threeKind={threeKind}
        fourKind={fourKind}
        fullhouse={fullhouse}
        smallStraight={smallStraight}
        largeStraight={largeStraight}
        yahtzee={yahtzee}
        chance={chance}
        lowerTotal={lowerTotal}
        selectScore={this.selectScore}
        id={'scoresheet' + this.props.uniqueID}
        />

        <Board 
        diceOnTable={ this.state.diceOnTable }
        savedDice={ this.state.savedDice } 
        setDiceAside={ this.setDiceAside }
        returnDiceToTable={ this.returnDiceToTable }
        theme={ this.state.theme }
        id={'board' + this.props.uniqueID}
        />

        <img id={'cup' + this.props.uniqueID} className='cup' src={ cup } onClick={ this.rollDice } 
        alt='yahtzee dice cup' style={cupStyles}
        onMouseEnter={ this.shakeCup } onMouseLeave={ this.stopShakingCup } />

        <h4 className='roll_number' style={ rollStyles }>Rolls remaining this turn: { 4 - rollNum || 0 }</h4>

        <audio src={ this.state.audioSrc } loop autoPlay />

      </div>
    );
  }
}

export default Game;
