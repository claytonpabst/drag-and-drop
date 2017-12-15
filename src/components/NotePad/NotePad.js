import React, { Component } from 'react';

import './NotePad.css';


class NotePad extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    //bind shit here

  }
  


  render() {

    return (
        <div className="notePadWrapper">
          <textarea className="notePadTextArea"></textarea>
        </div>
    );
  }
}


export default NotePad;