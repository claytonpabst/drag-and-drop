import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
    //bind shit here
  }

  render() {

    let testStyle = [
      {
        "height":"100px",
        "width":"50px",
        "background":"black",
        "left":"200px",

      },
    ]

    let moveTheDiv = function(e){
      return {
        startMoving: function(e){
          console.log(e)
          let mouseDownX = e.clientX;
          let mouseDownY = e.clientY;
          let mouseUpX;
          let mouseUpY;

          document.onmousemove = function(e){
            console.log(e)
          }

        }

      }

    }

    return (
      <div className="home">

        <div draggable="true" onMouseDown={moveTheDiv.startMoving} style={testStyle[0]} className="createdDiv"></div>

      </div>
    );
  }
}


export default Home;