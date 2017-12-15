import React, { Component } from 'react';
import AlarmClock from './AlarmClock/AlarmClock.js';
import NotePad from './NotePad.js';
import Calendar from './Calendar.js';

import './ActiveApp.css';


class ActiveApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      minimized:false,
      style:this.props.style
    }
    this.toggleMinimized = this.toggleMinimized.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
  }
  
  toggleMinimized(val){
    let x = !this.state.minimized;
    let style = val === '-'?this.props.minimizedStyle:this.props.style;
    if(val === '-'){
      let minimizedPosition = ((this.props.elementIndex*100)+100).toString() + "px";
      // minimizedPosition = minimizedPosition.toString() + "px";
      style.left = minimizedPosition;
    }
    style.transition="all .5s";
    this.setState({minimized:x, style:style});

    setTimeout(() => this.removeTransition(val),500);
  }
  
  removeTransition(val){
    let style = val === '-'?this.props.minimizedStyle:this.props.style;
    let newNumberOfAppsMinimized = this.props.numberOfAppsMinimized - 1;
    if(val === '-'){
      let minimizedPosition = ((this.props.elementIndex*100)+100).toString() + "px";
      // minimizedPosition = minimizedPosition.toString() + "px";
      style.left = minimizedPosition;
      // newNumberOfAppsMinimized = this.props.numberOfAppsMinimized + 1;
    }
    style.transition="all 0s";
    this.setState({style:style})
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
      case "None":
        appType = <h1>I shouldn't exist</h1>
        break;
      default:
        appType = <p>No available app to load.</p>
        break;
    }
    // let style = this.state.minimized?this.props.minimizedStyle:this.props.style
    return (
        <div onMouseDown={() => this.props.bringToFront(this.props.elementIndex)} style={{...this.state.style}} className="createdDiv">
          <div onMouseDown={(e) => this.props.moveTheDiv(e, this.props.elementIndex)} className="createdDivTopPanel">
            <ul>
              <div onClick={() => this.props.deleteApp(this.props.elementIndex)} style={{background:"red"}}>x</div>
              <div onClick={() => this.toggleMinimized('-')} style={{background:"#ffc405"}}>-</div>
              <div onClick={() => this.toggleMinimized('+')} style={{background:"green"}}>+</div>
            </ul>
            <h1>{this.props.appType}</h1>
            <span></span>
          </div>
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