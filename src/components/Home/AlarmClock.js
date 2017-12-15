import React, { Component } from 'react';

import './AlarmClock.css';


class AlarmClock extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    //bind shit here

  }
  


  render() {

    return (
        <div className="alarmClockWrapper">
          <p>I am an alarm clock.</p>
        </div>
    );
  }
}


export default AlarmClock;