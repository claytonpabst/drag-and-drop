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
        <div onMouseDown={() => this.props.bringToFront(3)} style={{...this.props.style}} className="createdDiv">
          <div onMouseDown={(e) => this.props.moveTheDiv(e, 3)} className="createdDivTopPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, 3, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, 3, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, 3, "left")} className="createdDivLeftPanel"></div>
          <h1>I am an alarm clock</h1>
          <h1>I am an alarm clock</h1>
          <h1>I am an alarm clock</h1>
          <h1>I am an alarm clock</h1>
          <h1>I am an alarm clock</h1>
        </div>
    );
  }
}


export default AlarmClock;