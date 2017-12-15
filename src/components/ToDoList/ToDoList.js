import React, { Component } from 'react';

import './ToDoList.css';


class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
    

  }
  


  render() {

    return (
        <div className="toDoListWrapper">
          <div className="toDoHeader">
            <h1>Catagory++</h1>
          </div>
          <div className="toDoCatagory">
            
          </div>
        </div>
    );
  }
}


export default Calendar;