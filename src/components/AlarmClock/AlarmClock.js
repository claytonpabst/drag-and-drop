import React, { Component } from 'react';

import './AlarmClock.css';


class AlarmClock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hours: '',
      minutes: '',
      military: true,
      notMilitary: false,
      AM: true,
    }

    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.setTime();
  }

  componentWillUnmount(){
    clearInterval(this.alarmTime);
  }

  setTime(){
    if (this.alarmTime){
      clearInterval(this.alarmTime)
    }

    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let AM = true;

    if (this.state.notMilitary && hours > 12){
      AM = false;
      hours -= 12;
    }

    this.setState({ hours, minutes, AM }, () => {
      this.alarmTime = setInterval(() => {
        this.setTime();
      }, 60000)
    })
  }

  switchMilitary(isMilitary){
    this.setState({
      military: isMilitary,
      notMilitary: !isMilitary,
    }, this.setTime);
  }

  render() {

    return (
      <section className="alarmClockWrapper">

        <div className='alarm_clock'>
          <img src='https://101clipart.com/wp-content/uploads/02/Digital%20Clock%20Clipart%2029.png' alt='alarm clock' className='alarm_pic' />
          <p className='alarm_time'>
            {this.state.hours < 10 ? '0' + this.state.hours : this.state.hours}:
              {this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes} 
              {this.state.military ? '' : this.state.AM ? 'AM' : 'PM'}
          </p>
        </div>

        <div className='alarm_controls'>
          <div className='alarm_military_switch'>
            <input type='radio' checked={this.state.military} onClick={() => this.switchMilitary(true)} />
            <input type='radio' checked={this.state.notMilitary} onClick={() => this.switchMilitary(false)} />
          </div>
        </div>

      </section>
    );
  }
}


export default AlarmClock;