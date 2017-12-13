import React, { Component } from 'react';


import './AlarmClock.css';


class ActiveApp extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    //bind shit here

  }
  


  render() {

    return (
        <div onMouseDown={() => this.props.bringToFront(this.props.elementIndex)} style={{...this.props.style}} className="createdDiv">
          <div onMouseDown={(e) => this.props.moveTheDiv(e, this.props.elementIndex)} className="createdDivTopPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "bottom")} className="createdDivBottomPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "right")} className="createdDivRightPanel"></div>
          <div onMouseDown={(e) => this.props.markXY(e, this.props.elementIndex, "left")} className="createdDivLeftPanel"></div>
          <div className="innerAppAppWrapper">
            {/*{appType}*/}
          </div>
        </div>
    );
  }
}


export default ActiveApp;