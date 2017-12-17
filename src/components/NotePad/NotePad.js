import React, { Component } from 'react';

import './NotePad.css';


class NotePad extends Component {
  constructor(props){
    super(props)
    this.state = {

    }

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