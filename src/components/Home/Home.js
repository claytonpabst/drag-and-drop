import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      testStyle:[
        {
          height:"100px",
          width:"50px",
          background:"black",
          left:"200px",
          top:"100px"
        },
        {
          height:"100px",
          width:"50px",
          background:"black",
          left:"500px",
          top:"200px"
        },
        {
          height:"300px",
          width:"500px",
          background:"white",
          left:"600px",
          top:"800px"
        },
      ],
      newX:null,
      newY:null,
      elementIndex:null,
      moveActive:false,

    }
    //bind shit here
    this.moveTheDiv = this.moveTheDiv.bind(this);
    this.releaseTheDiv = this.releaseTheDiv.bind(this);
    this.resetMoveActive = this.resetMoveActive.bind(this);
  }

  moveTheDiv(el){
    this.setState({
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
  }

  updateLocation(){
    let newState = this.state;
    let top = newState.newY;
    let left = newState.newX;
    let style = newState.testStyle;
    style[this.state.elementIndex].left = JSON.stringify(left) + "px";
    style[this.state.elementIndex].top = JSON.stringify(top) + "px";
    this.setState({
      testStyle:style
    })
  }

  resetMoveActive(){
    this.setState({
      moveActive:false,
      elementIndex:null
    })
  }

  render() {
    console.log('rendered')

    return (
      <div className="home" onMouseMove={this.releaseTheDiv} onMouseUp={this.resetMoveActive}>

        <div style={{...this.state.testStyle[0]}} className="createdDiv">
          <div onMouseDown={() => this.moveTheDiv(0)} className="createdDivTopPanel"></div>
          <div className="createdDivBottomPanel"></div>
          <div className="createdDivRightPanel"></div>
          <div className="createdDivLeftPanel"></div>
        </div>
        <div style={{...this.state.testStyle[1]}} className="createdDiv">
          <div onMouseDown={() => this.moveTheDiv(1)} className="createdDivTopPanel"></div>
          <div className="createdDivBottomPanel"></div>
          <div className="createdDivRightPanel"></div>
          <div className="createdDivLeftPanel"></div>
        </div>
        <div style={{...this.state.testStyle[2]}} className="createdDiv">
          <div onMouseDown={() => this.moveTheDiv(2)} className="createdDivTopPanel"></div>
          <div className="createdDivBottomPanel"></div>
          <div className="createdDivRightPanel"></div>
          <div className="createdDivLeftPanel"></div>
        </div>
        <h1>{this.state.x} {this.state.y}</h1>
        <h1>{this.state.newX} {this.state.newY}</h1>
      </div>
    );
  }
}


export default Home;