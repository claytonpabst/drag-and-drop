import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Highscores.css';

class Highscores extends Component {

  constructor(props){
    super(props);
    this.state = {
      highscores: [{'hint': 'If nothing shows up, try refreshing the page'}]
    }
  }

  componentDidMount(){
    axios.get('/api/highscores/classic')
    .then( res => {
      this.setState({
        highscores: res.data
      })
    })
  }

  render() {

    return (
      <div className='high_scores'>

        <Link to='/' className='link link_home'>Home</Link>

        <p>Classic High Scores</p>
        <ul>
          {
            this.state.highscores.map( (data, i) => {
              return <li key={i}> {data.score} - {data.name} </li>
            })
          }
        </ul>

      </div>
    );

  }
}


export default Highscores;