import React, { Component } from 'react';

import AlarmClock from './../AlarmClock/AlarmClock.js';
import NotePad from './../NotePad/NotePad.js';
import ToDoList from './../ToDoList/ToDoList.js';
import Stopwatch from './../Stopwatch/Stopwatch.js';
import Yahtzee from './../Yahtzee/Yahtzee.js';

import './ActiveApp.css';
import './Settings.css';

class ActiveApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      minimized:false,
      style:this.props.style,
      settingsStyle:{height:"0%",background:"#eee"},
      backgroundColorInput: ''
    }

    this.toggleMinimized = this.toggleMinimized.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.updateBackgroundColorInput = this.updateBackgroundColorInput.bind(this);
    this.applySettingsChanges = this.applySettingsChanges.bind(this);
  }
  
  toggleMinimized(val){
    let x = !this.state.minimized;
    let style = val === '-'?this.props.minimizedStyle:this.props.style;
    if(val === '-'){
      let minimizedPosition = ((this.props.elementIndex*100)+130).toString() + "px";
      style.left = minimizedPosition;
    }
    style.transition="all .5s";
    this.setState({minimized:x, style:style});

    setTimeout(() => this.removeTransition(val),500);
  }
  
  removeTransition(val){
    let style = val === '-'?this.props.minimizedStyle:this.props.style;
    if(val === '-'){
      let minimizedPosition = ((this.props.elementIndex*100)+130).toString() + "px";
      style.left = minimizedPosition;
    }
    style.transition="all 0s";
    this.setState({style:style})
  }

  toggleSettings(){
    let x = this.state.settingsStyle;
    if(this.state.settingsStyle.height === "0%"){
      x.height = "100%";
    } else {
      x.height = "0%";
    }
    this.setState({settingsHeight:x})
  }

  updateBackgroundColorInput(e){
    this.setState({backgroundColorInput:e.target.value})
  }

  applySettingsChanges(){
    let background = this.state.backgroundColorInput;
    let settingsStyle = this.state.settingsStyle;
    let style = this.state.style;
    settingsStyle.background = background;
    settingsStyle.height = "0%";
    style.background = background;
    this.setState({settingsStyle, style});
  }

  render() {
    let appType;
    switch(this.props.appType){
      case "Alarm Clock":
        appType = <AlarmClock/>
        break;
      case "To Do List":
        appType = <ToDoList/>
        break;
      case "Note Pad":
        appType = <NotePad/>
        break;
      case "Stopwatch":
        appType = <Stopwatch/>
        break;
      case "Yahtzee":
        appType = <Yahtzee parentStyle={this.props.style} />
        break;
      case "None":
        appType = <h1>I shouldn't exist</h1>
        break;
      default:
        appType = <p>No available app to load.</p>
        break;
    }
    let settings =  <div style={{...this.state.settingsStyle}} className="settingsWrapper">
                      <h1>Set background color:</h1>
                      <input onChange={this.updateBackgroundColorInput} type="color"/>
                      <br/>
                      <br/>
                      <button onClick={this.applySettingsChanges}>Apply Changes</button>
                    </div>

    return (
        <div onMouseDown={() => this.props.bringToFront(this.props.elementIndex)} style={{...this.state.style}} className="createdDiv">
          <div onMouseDown={(e) => this.props.moveTheDiv(e, this.props.elementIndex)} className="createdDivTopPanel">
            <ul>
              <div onClick={() => this.props.deleteApp(this.props.elementIndex)} style={{background:"red"}}>x</div>
              <div onClick={() => this.toggleMinimized('-')} style={{background:"#ffc405"}}>-</div>
              <div onClick={() => this.toggleMinimized('+')} style={{background:"green"}}>+</div>
            </ul>
            <h1>{this.props.appType}</h1>
            <span>
              <img onClick={this.toggleSettings} src="http://freevector.co/wp-content/uploads/2013/08/4450-setting-tool1.png" alt=""/>
            </span>
          </div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "left")} className="createdDivLeftPanel"></div>
          <div className="activeAppAppWrapper">
            {appType}
            {settings}
          </div>
        </div>
    );
  }
}

export default ActiveApp;