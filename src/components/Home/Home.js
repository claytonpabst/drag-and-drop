import React, { Component } from 'react';
import AlarmClock from './AlarmClock.js';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeApps:[
        {
          appType:"Alarm Clock",
          style:{
            height:"100px",
            width:"50px",
            background:"black",
            left:"200px",
            top:"100px",
            zIndex:"1"
          }
        }
      ],
      testStyle:[
        {
          height:"100px",
          width:"50px",
          background:"black",
          left:"200px",
          top:"100px",
          zIndex:"1"
        },
        {
          height:"100px",
          width:"50px",
          background:"black",
          left:"500px",
          top:"200px",
          zIndex:"1"
        },
        {
          height:"300px",
          width:"500px",
          background:"white",
          left:"600px",
          top:"800px",
          zIndex:"1"
        },
        {
          height:"300px",
          width:"500px",
          background:"white",
          left:"600px",
          top:"100px",
          zIndex:"1"
        },
      ],
      oldX:null,
      oldY:null,
      newX:null,
      newY:null,
      elementIndex:null,
      moveActive:false,
      expandActive:false,
      expandSide:null

    }
    //bind shit here
    this.moveTheDiv = this.moveTheDiv.bind(this);
    this.releaseTheDiv = this.releaseTheDiv.bind(this);
    this.resetMoveActive = this.resetMoveActive.bind(this);
    this.markXY = this.markXY.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.bringToFront = this.bringToFront.bind(this);
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

  render() {
    console.log('rendered')

    return (
      <div className="home" onMouseMove={this.releaseTheDiv} onMouseUp={this.resetMoveActive}>
        {/*<div onMouseDown={() => this.bringToFront(0)} style={{...this.state.testStyle[0]}} className="createdDiv">
          <div onMouseDown={(e) => this.moveTheDiv(e, 0)} className="createdDivTopPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 0, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 0, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 0, "left")} className="createdDivLeftPanel"></div>
        </div>
        <div onMouseDown={() => this.bringToFront(1)} style={{...this.state.testStyle[1]}} className="createdDiv">
          <div onMouseDown={(e) => this.moveTheDiv(e, 1)} className="createdDivTopPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 1, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 1, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 1, "left")} className="createdDivLeftPanel"></div>
        </div>
        <div onMouseDown={() => this.bringToFront(2)} style={{...this.state.testStyle[2]}} className="createdDiv">
          <div onMouseDown={(e) => this.moveTheDiv(e, 2)} className="createdDivTopPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 2, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 2, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.markXY(e, 2, "left")} className="createdDivLeftPanel"></div>
        </div>*/}
        <AlarmClock style={this.state.activeApps[0].style} 
                    bringToFront={this.bringToFront}
                    moveTheDiv={this.moveTheDiv}
                    markXY={this.markXY}
                    elementIndex={0}
                    app={"Alarm Clock"}
        />
        <h1>{this.state.oldX} {this.state.oldY}</h1>
        <h1>{this.state.newX} {this.state.newY}</h1>
      </div>
    );
  }
}


export default Home;