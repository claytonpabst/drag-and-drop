import React, { Component } from 'react';
import AlarmClock from './AlarmClock.js';
import NotePad from './NotePad.js';
import Calendar from './Calendar.js';

import './ActiveApp.css';


class ActiveApp extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    //bind shit here

  }
  


  render() {
    let appType;
    switch(this.props.appType){
      case "Alarm Clock":
        appType = <AlarmClock/>
        break;
      case "Calendar":
        appType = <Calendar/>
        break;
      case "Note Pad":
        appType = <NotePad/>
        break;
      default:
        appType = <p>No available app to load.</p>
        break;
    }

    return (
        <div onMouseDown={() => this.props.bringToFront(this.props.elementIndex)} style={{...this.props.style}} className="createdDiv">
          <div onMouseDown={(e) => this.props.moveTheDiv(e, this.props.elementIndex)} className="createdDivTopPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "left")} className="createdDivLeftPanel"></div>
          <div className="activeAppAppWrapper">
            {appType}
          </div>
        </div>
    );
  }
}


export default ActiveApp;