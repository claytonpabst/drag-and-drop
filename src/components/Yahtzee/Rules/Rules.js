import React, { Component } from 'react';
import RulesSection from './RulesSection/RulesSection.js';

import './Rules.css';


class Rules extends Component {

  render() {
    return (
      <div className="rules">
        
        <h1 className='rules_heading'>Rules page</h1>

        <RulesSection heading='Object of the game' content='object' />
        <RulesSection heading='Starting the game' content='start' />
        <RulesSection heading='Scoring' content='scoring' />
        <RulesSection heading='Upper section scoring' content='upper' />
        <RulesSection heading='Lower section scoring' content='lower' />
        <RulesSection heading='Additional Yahtzees' content='yahtzee' />
        <RulesSection heading='Scratch or Dump scores' content='scratch' />

      </div>
    );
  }
}


export default Rules;