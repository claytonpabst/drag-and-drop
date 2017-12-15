import React, { Component } from 'react';
import ActiveApp from './ActiveApp.js';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeApps:[],
      oldX:null,
      oldY:null,
      newX:null,
      newY:null,
      elementIndex:null,
      moveActive:false,
      expandActive:false,
      expandSide:null,
      showCreateAppDropDown:false

    }
    //bind shit here
    this.moveTheDiv = this.moveTheDiv.bind(this);
    this.releaseTheDiv = this.releaseTheDiv.bind(this);
    this.resetMoveActive = this.resetMoveActive.bind(this);
    this.markXY = this.markXY.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.bringToFront = this.bringToFront.bind(this);
    this.createNewApp = this.createNewApp.bind(this);
    this.openAvailableAppsDropDown = this.openAvailableAppsDropDown.bind(this);
    this.closeAvailableAppsDropDown = this.closeAvailableAppsDropDown.bind(this);
    this.closeAvailableAppsDropDown2 = this.closeAvailableAppsDropDown2.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
  }

  markXY(e, el, side){
    let x = e.clientX;
    let y = e.clientY;
    this.setState({oldX:x, oldY:y, expandActive:true, elementIndex:el, expandSide:side});
  }

  moveTheDiv(e, el){
    let x = e.clientX;
    let y = e.clientY;    
    this.setState({
      oldX:x,
      oldY:y,
      moveActive:true,
      elementIndex:el
    })
  }

  releaseTheDiv(evt){
    if(this.state.moveActive === true){
      let x = evt.clientX;
      let y = evt.clientY;
      this.setState({
        newX:x,
        newY:y
      }, () => {
        this.updateLocation();
      });
    }
    if(this.state.expandActive === true){
      let x = evt.clientX;
      let y = evt.clientY;
      this.updateHeight(this.state.oldX, this.state.oldY, x, y)
    }
  }

  updateHeight(oldX, oldY, newX, newY){
    let elementIndex = this.state.elementIndex;
    let xMovement = newX - oldX;
    let yMovement = newY - oldY;
    let height = this.state.activeApps[elementIndex].style.height.split('px')[0]
    let width = this.state.activeApps[elementIndex].style.width.split('px')[0]
    let left = this.state.activeApps[elementIndex].style.left.split('px')[0]
    let apps = this.state.activeApps
    switch(this.state.expandSide){
      case "bottom":
        apps[elementIndex].style.height = JSON.stringify((parseInt(height, 10) + yMovement)) + "px";
        this.setState({activeApps:apps, oldX:newX, oldY:newY})
        break;
      case "right":
        apps[elementIndex].style.width = JSON.stringify((parseInt(width, 10) + xMovement)) + "px";
        this.setState({activeApps:apps, oldX:newX, oldY:newY})
        break;
      case "left":
        apps[elementIndex].style.width = JSON.stringify((parseInt(width, 10) - xMovement)) + "px";
        apps[elementIndex].style.left = JSON.stringify((parseInt(left, 10) + xMovement)) + "px";
        this.setState({activeApps:apps, oldX:newX, oldY:newY})
        break;
      default:
        break;
    }
  }

  updateLocation(){
    let newState = this.state;
    let top = newState.activeApps[this.state.elementIndex].style.top;
    let left = newState.activeApps[this.state.elementIndex].style.left;
    let apps = newState.activeApps;
    let xMovement = this.state.newX - this.state.oldX;
    let yMovement = this.state.newY - this.state.oldY;
    apps[this.state.elementIndex].style.left = JSON.stringify((parseInt(left, 10) + xMovement)) + "px";
    apps[this.state.elementIndex].style.top = JSON.stringify((parseInt(top, 10) + yMovement)) + "px";
    this.setState({activeApps:apps, oldX:this.state.newX, oldY:this.state.newY})
  }

  resetMoveActive(){
    this.setState({
      moveActive:false,
      expandActive:false,
      expandSide:null,
      elementIndex:null
    })
  }

  bringToFront(el){
    let apps = this.state.activeApps;
    let numberOfElements = apps.length;
    apps[el].style.zIndex = JSON.stringify(numberOfElements);
    for(let i=0; i<apps.length; i++){
      if(apps[i].style.zIndex > 0){
        apps[i].style.zIndex--;
      };
    };
    this.setState({activeApps:apps});
  }

  openAvailableAppsDropDown(){
    document.getElementById('availableAppsDropDown').focus();
    this.setState({showCreateAppDropDown:true});
  }
  closeAvailableAppsDropDown(){
    setTimeout(() => this.closeAvailableAppsDropDown2(),200);
  }
  closeAvailableAppsDropDown2(){
    this.setState({showCreateAppDropDown:false});
  }

  createNewApp(type, w, h){
    let activeApps = this.state.activeApps;
    let width = JSON.stringify(w) + "px";
    let height = JSON.stringify(h) + "px";
    for(let i=0; i<activeApps.length; i++){
      if(activeApps[i].appType === "None"){
        activeApps[i]={
          appType:type,
          style:{height:height,width:width,background:"white",left:"150px",top:"200px",zIndex:"1"},
          minimizedStyle:{height:"20px",width:"100px",background:"white",left:"100px",top:"0px",zIndex:"1"}
        }
        this.setState({activeApps:activeApps, showCreateAppDropDown:false});
        return;
      }
    }
    activeApps.push({
      appType:type,
      style:{height:height,width:width,background:"white",left:"150px",top:"200px",zIndex:"1"},
      minimizedStyle:{height:"20px",width:"100px",background:"white",left:"100px",top:"0px",zIndex:"1"}
    });
    this.setState({activeApps:activeApps, showCreateAppDropDown:false});
  }

  deleteApp(index){
    let activeApps = this.state.activeApps;
    activeApps[index].appType="None";
    this.setState({activeApps:activeApps});
  }

  render() {
    let activeApps;
    if (this.state.activeApps.length) {
      activeApps = this.state.activeApps.map((app, i) => {
        if(this.state.activeApps[i].appType !== "None"){
          return (
            <ActiveApp  style={this.state.activeApps[i].style}
                        minimizedStyle={this.state.activeApps[i].minimizedStyle}
                        bringToFront={this.bringToFront}
                        moveTheDiv={this.moveTheDiv}
                        markXY={this.markXY}
                        elementIndex={i}
                        appType={this.state.activeApps[i].appType}
                        numberOfAppsMinimized={this.state.numberOfAppsMinimized}
                        deleteApp={this.deleteApp}
                        key={i}
            />
          )
        }
      })
    }
    let createAppDropDownStyle = this.state.showCreateAppDropDown?{height:"145px"}:{height:"0px",border:"none"};
    let addAnAppButton =  this.state.showCreateAppDropDown
                            ?<h1 onClick={this.closeAvailableAppsDropDown} className="addAnAppButton">App++</h1>
                            :<h1 onClick={this.openAvailableAppsDropDown} className="addAnAppButton">App++</h1>;

    return (
      <div className="home" onMouseMove={this.releaseTheDiv} onMouseUp={this.resetMoveActive}>
        {addAnAppButton}
        <div onBlur={this.closeAvailableAppsDropDown} id="availableAppsDropDown" className="availableAppsDropDown" style={createAppDropDownStyle} tabIndex={0}>
          <h1 onClick={() => this.createNewApp("Alarm Clock", 250, 300)}>New Alarm Clock</h1>
          <h1 onClick={() => this.createNewApp("Calendar", 250, 300)}>New Calendar</h1>
          <h1 onClick={() => this.createNewApp("Note Pad", 320, 255)}>New Note Pad</h1>
          <h1 onClick={() => this.createNewApp("Stopwatch", 300, 580)}>Stopwatch</h1>
        </div>
        {activeApps}
      </div>
    );
  }
}


export default Home;