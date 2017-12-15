import React, { Component } from 'react';

import './AlarmClock.css';


class AlarmClock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hours: '',
      minutes: '',
      military: false,
      notMilitary: true,
      AM: true,
      alarms: [],
    }

    this.setTime = this.setTime.bind(this);
    this.addAlarm = this.addAlarm.bind(this);
    this.updateSingleAlarm = this.updateSingleAlarm.bind(this);
    this.deleteSingleAlarm = this.deleteSingleAlarm.bind(this);
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

  addAlarm(){
    let alarms = this.state.alarms.slice();
    alarms.push({
      name: '',
      hours: '12',
      minutes: '00'
    })
    this.setState({
      alarms: alarms
    })
  }

  updateSingleAlarm(e, i, key){
    console.log(i, key);
    let alarms = this.state.alarms.slice();
    alarms[i][key] = e.target.value;
    this.setState({alarms});
  }

  deleteSingleAlarm(i){
    let alarms = this.state.alarms.slice();
    alarms.splice(i, 1);
    this.setState({alarms});
  }

  render() {

    return (
      <section className="alarmClockWrapper">

        <div className='alarm_clock'>
          <img src='https://101clipart.com/wp-content/uploads/02/Digital%20Clock%20Clipart%2029.png' alt='alarm clock' className='alarm_pic' />
          <p className='alarm_time'>
            {this.state.hours < 10 ? '0' + this.state.hours : this.state.hours}:
              {this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes} 
              <span style={{fontSize: '18px'}}>{this.state.military ? '' : this.state.AM ? 'AM' : 'PM'}</span>
          </p>
        </div>

        <div className='alarm_controls'>

          <div className='alarm_military_switch'>
            <p>Time Setting:</p>
            <p>12 Hour</p><input type='radio' checked={this.state.notMilitary} onChange={() => this.switchMilitary(false)} />
            <p>24 Hour</p><input type='radio' checked={this.state.military} onChange={() => this.switchMilitary(true)} />
          </div>

          <div className='alarm_add_new'>
            <p className='add_alarm_text'>Add Alarm </p><p className='add_alarm_plus' onClick={this.addAlarm} >+</p>
          </div>

          <ul className='alarms'>
            {
              this.state.alarms.map( (item, i) => {
                return  <li className='alarm_item' key={i} >
                          <input value={item.name} onChange={(e) => this.updateSingleAlarm(e, i, 'name')} placeholder='Alarm Name' className='alarms_names' />
                          <input value={item.hours} onChange={(e) => this.updateSingleAlarm(e, i, 'hours')} placeholder='12' className='alarms_time_box' />:
                          <input value={item.minutes} onChange={(e) => this.updateSingleAlarm(e, i, 'minutes')} placeholder='00' className='alarms_time_box' />
                          <div onClick={() => this.deleteSingleAlarm(i)} className='alarm_delete'>X</div>
                        </li>
              })
            }
          </ul>

        </div>

      </section>
    );
  }
}


export default AlarmClock;