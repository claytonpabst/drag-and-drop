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
      ],
      x:null,
      y:null,
      newX:null,
      newY:null,
      moveActive:false

    }
    //bind shit here
    this.moveTheDiv = this.moveTheDiv.bind(this);
    this.releaseTheDiv = this.releaseTheDiv.bind(this);
    this.resetMoveActive = this.resetMoveActive.bind(this);
  }

  moveTheDiv(evt){
    let x = evt.clientX;
    let y = evt.clientY;
    this.setState({
      x:x,
      y:y,
      moveActive:true
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
    let top = this.state.newY;
    let left = this.state.newX;
    let style = this.state.testStyle;
    style[0].left = JSON.stringify(left);
    style[0].top = JSON.stringify(top);
    this.setState({
      testStyle:style
    })
  }

  resetMoveActive(){
    this.setState({
      moveActive:false
    })
  }

  render() {
    console.log('rendered')
    let testStyle = {
      "height":this.state.testStyle[0].height,
      "width":this.state.testStyle[0].width,
      "background":this.state.testStyle[0].background,
      "left":this.state.testStyle[0].left,
      "top":this.state.testStyle[0].top
    }
    // let moveTheDiv = function(){
    //   console.log();
    //   return {
    //     startMoving: function(){
    //       console.log()
    //       // let mouseDownX = e.clientX;
    //       // let mouseDownY = e.clientY;
    //       // let mouseUpX;
    //       // let mouseUpY;

    //       document.onmousemove = function(e){
    //         console.log()
    //       }

    //     }

    //   }

    // }();

    return (
      <div className="home" onMouseMove={this.releaseTheDiv} onMouseUp={this.resetMoveActive}>

        <div onMouseDown={this.moveTheDiv}  style={this.state.testStyle[0]} className="createdDiv"></div>
        <h1>{this.state.x} {this.state.y}</h1>
        <h1>{this.state.newX} {this.state.newY}</h1>
      </div>
    );
  }
}


export default Home;