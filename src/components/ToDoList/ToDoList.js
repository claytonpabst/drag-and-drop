import React, { Component } from 'react';

import './ToDoList.css';


class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories:[
        {
          categoryName:'General',
          toDoItems:['do this', 'do that'],
          style: {background:"#f17"},
          editing:false
        },
      ]
    }
    
    this.addCategory = this.addCategory.bind(this);
  }
  
  addCategory(){

  }

  randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  render() {

    return (
        <div className="toDoListWrapper">
          <div className="toDoHeader">
            <h1 onClick={this.addCategory}>Category++</h1>
          </div>
          <div style={this.state.categories[0].style} className="toDoCategory">
            <div>Task++</div>
            <h3>{this.state.categories[0].categoryName}</h3>
            {/*<h1>{this.state.categories[0].toDoItems[0]}</h1>
            <h1>{this.state.categories[0].toDoItems[1]}</h1>*/}
          </div>
        </div>
    );
  }
}


export default Calendar;