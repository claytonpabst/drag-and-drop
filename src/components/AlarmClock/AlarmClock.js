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
      audioSrc: '',
      background: '#fff'
    }

    this.alarmIsSounding = false;

    this.setTime = this.setTime.bind(this);
    this.addAlarm = this.addAlarm.bind(this);
    this.updateSingleAlarm = this.updateSingleAlarm.bind(this);
    this.deleteSingleAlarm = this.deleteSingleAlarm.bind(this);
    this.soundTheAlarm = this.soundTheAlarm.bind(this);
    this.turnOffAlarm = this.turnOffAlarm.bind(this);
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
    let seconds = today.getSeconds();
    let AM = true;

    if (this.state.notMilitary && hours > 12){
      AM = false;
      hours -= 12;
    }

    this.setState({ hours, minutes, AM }, () => {

      // Wait 60 seconds, then set the time again and start this function over
      this.alarmTime = setInterval(() => {
        this.setTime();
      }, (59 - seconds) * 1000)

      // Check if we have any alarms that need to go off right now
      let alarms = JSON.parse(JSON.stringify(this.state.alarms));
      for (let i = 0; i < alarms.length; i++){
        let alarmHours = Number(alarms[i].hours);
        let alarmMinutes = Number(alarms[i].minutes);

        if (alarmHours === hours && alarmMinutes === minutes && (this.state.military || alarms[i].am === AM) ){
          this.soundTheAlarm(i);
        }
      }

    })
  }

  switchMilitary(isMilitary){
    let arr = JSON.parse(JSON.stringify(this.state.alarms));

    for (var i = 0; i < arr.length; i++){
      //if switching to miliary and we're in the pm, add 12 hours to the displayed time
      if (isMilitary && !arr[i].am && arr[i].hours != 12){
        arr[i].hours = Number(arr[i].hours) + 12;
      }
      //if switching to miliary and its 12:xx am, set hours to '00'
      if (isMilitary && arr[i].am && arr[i].hours == 12){
        arr[i].hours = '00';
      }
      //if switching to 12 hour clock and hours > 12, reduce hours by 12 and set am to false
      if (!isMilitary && arr[i].hours > 12){
        arr[i].hours = Number(arr[i].hours) - 12;
        arr[i].am = false;
      }
      //if switching to 12 hour clock and hours == '00', set am to true and set hours = 12
      if (!isMilitary && arr[i].hours == '00'){
        arr[i].hours = 12;
        arr[i].am = true;
      }
    }
    
    this.setState({
      military: isMilitary,
      notMilitary: !isMilitary,
      alarms: arr
    }, this.setTime);
  }

  addAlarm(){
    let alarms = this.state.alarms.slice();
    alarms.push({
      name: '',
      hours: '12',
      minutes: '00',
      am: this.state.AM
    })
    this.setState({
      alarms: alarms
    })
  }

  updateSingleAlarm(e, i, key){
    if (key === 'name' || e.target.value.match(/^[0-9]*$/)){
      let alarms = this.state.alarms.slice();
      alarms[i][key] = e.target.value;
      this.setState({alarms});
    }else{
      console.log('only digits are allowed in the time boxes');
    }
  }

  deleteSingleAlarm(i){
    let alarms = this.state.alarms.slice();
    alarms.splice(i, 1);
    this.setState({alarms});
  }

  validateTime(e, i, key){
    let maxHours = this.state.military ? 24 : 12;
    let max = {
      hours: maxHours,
      minutes: 59
    }
    let num = parseInt(e.target.value, 10);

    if (num > max[key]){
      num = max[key]
    }
    if (num < 0){
      num = 0;
    }
    num = num.toString().length < 2 ? '0' + num.toString() : num.toString();

    let alarms = this.state.alarms.slice();
    alarms[i][key] = num;
    this.setState({alarms});
  }

  updateAlarmAmText(i){
    let alarms = this.state.alarms.slice();
    alarms[i].am = !alarms[i].am ;
    this.setState({alarms});
  }

  soundTheAlarm(i){
    this.alarmIsSounding = true;
    this.setState({
      audioSrc: './media/Wake-up-sounds.mp3',
      background: '#f00'
    })
  }

  turnOffAlarm(){
    if (this.alarmIsSounding){
      this.alarmIsSounding = false;
      this.setState({
        audioSrc: '',
        background: '#fff'
      })
    }
  }

  render() {
    return (
      <section className="alarmClockWrapper" style={{background: this.state.background}}>

        <div className='alarm_clock' onClick={this.turnOffAlarm} >
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
                          <input value={item.hours} onChange={(e) => this.updateSingleAlarm(e, i, 'hours')} placeholder='12' className='alarms_time_box' type='text' maxLength='2' onBlur={(e) => this.validateTime(e, i, 'hours') } />:
                          <input value={item.minutes} onChange={(e) => this.updateSingleAlarm(e, i, 'minutes')} placeholder='00' className='alarms_time_box' type='text' maxLength='2' onBlur={(e) => this.validateTime(e, i, 'minutes') } />
                          {
                            this.state.notMilitary ?
                              <div onClick={() => this.updateAlarmAmText(i)} className='alarm_am_btn'>{item.am ? 'AM' : 'PM'}</div>
                            : null
                          }
                          <div onClick={() => this.deleteSingleAlarm(i)} className='alarm_delete'>X</div>
                        </li>
              })
            }
          </ul>

        </div>

        <audio src={ this.state.audioSrc } loop autoPlay />

      </section>
    );
  }
}

export default AlarmClock;