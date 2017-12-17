import React, { Component } from 'react';

import './ToDoList.css';


class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories:[
        {
          categoryName:'',
          toDoItems:['Type Task Here','',''],
          style: {background:"#f17"},
        },
      ]
    }
    
    this.addCategory = this.addCategory.bind(this);
    this.addTask = this.addTask.bind(this);
    this.taskNameChange = this.taskNameChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }
  
  addCategory(){
    let categories = this.state.categories;
    categories.push({
      categoryName:"",
      toDoItems:[""],
      style:{background:this.getBackground()},
    })
    this.setState({categories});
  }
  categoryNameChange(e, i){
    let categories = this.state.categories;
    categories[i].categoryName = e.target.value;
    this.setState({categories});
  }

  addTask(i){
    let categories = this.state.categories;
    categories[i].toDoItems.push("");
    this.setState({categories});
  }
  taskNameChange(e, i, j){
    let categories = this.state.categories;
    categories[i].toDoItems[j] = e.target.value;
    this.setState({categories});
  }
  deleteTask(i, j){
    let categories = this.state.categories;
    categories[i].toDoItems.splice(j, 1);
    this.setState({categories});
  }
  deleteCategory(i){
    let categories = this.state.categories;
    categories.splice(i, 1);
    this.setState({categories});
  }

  completeTask(i, j){
    let categories = this.state.categories;
    if(document.getElementsByClassName('toDoCategory')[i].getElementsByClassName('taskInputs')[j].style.textDecoration !== "line-through"){
      document.getElementsByClassName('toDoCategory')[i].getElementsByClassName('taskInputs')[j].style.textDecoration = "line-through";
    } else {
      document.getElementsByClassName('toDoCategory')[i].getElementsByClassName('taskInputs')[j].style.textDecoration = "";
    };
    this.setState({categories});
  }

  getBackground(){
    let f_position = this.state.categories.length%3+1;
    let x = JSON.stringify(this.randomNumber(1, 9));
    let y = JSON.stringify(this.randomNumber(1, 9));
    let background;
    switch (f_position) {
      case 1:
        background = "#f" + x + y;
        break;
      case 2:
        background =  "#" + x + "f" + y;
        break;
      case 3:
        background = "#" + x + y + "f";
        break;
      default:
        return "#f" + x + y;
    }
    return background;
  }

  randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  render() {
    let categories;
    categories = this.state.categories.map((category, i) => {
      let tasks=[];
      for(let j=0; j<this.state.categories[i].toDoItems.length; j++){
        tasks.push( <h1 className="taskWrapper"  key={j}>
                      <input 
                        onChange={(e) => this.taskNameChange(e, i, j)}
                        className="taskInputs" 
                        style={this.state.categories[i].style}
                        value={this.state.categories[i].toDoItems[j]}
                        type="text"/>
                      <span onClick={() => this.completeTask(i, j)} className="completeToDoTask">&#10003;</span>
                      <span onClick={() => this.deleteTask(i, j)} className="deleteToDoTask">x</span>
                    </h1>)
      }
      return (
        <div key={i} style={this.state.categories[i].style} className="toDoCategory">
          <div onClick={() => this.addTask(i)}>Task++</div>
          <span onClick={() => this.deleteCategory(i)} className="deleteCategory">Delete</span>
          <input  onChange={(e) => this.categoryNameChange(e, i)} 
                  placeholder="Category Name" 
                  className="categoryInputs" 
                  style={this.state.categories[i].style}
                  value={this.state.categories[i].categoryName}
                  type="text"/>
          {tasks}
        </div>
      )
    })

    return (
        <div className="toDoListWrapper">
          <div className="toDoHeader">
            <h1 onClick={this.addCategory}>Category++</h1>
          </div>
          {categories}
        </div>
    );
  }
}


export default Calendar;