import React, { Component } from 'react';
import './Stopwatch.css';

class Stopwatch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            hundredthSeconds: 0,
            stopwatchRunning: false,
            lap1: [0, 0, 0, 0],
            lap2: [0, 0, 0, 0],
            lap3: [0, 0, 0, 0],
            lap4: [0, 0, 0, 0],
            lapToCapture: 1,
        }

        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.captureLap = this.captureLap.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    startTimer() {
        if (!this.state.stopwatchRunning){
            this.setState({
                stopwatchRunning: true
            }, () => {
               this.timer = setInterval(() => {
                    if (this.state.stopwatchRunning){
                        let hundredthSeconds = this.state.hundredthSeconds + 1;
                        let seconds = this.state.seconds;
                        let minutes = this.state.minutes;
                        let hours = this.state.hours;

                        if (hundredthSeconds >= 100){
                            hundredthSeconds = 0;
                            seconds ++;
                        }
                        if (seconds >= 60){
                            seconds = 0;
                            minutes ++;
                        }
                        if (minutes >= 60){
                            minutes = 0;
                            hours ++;
                        }

                        this.setState({ hundredthSeconds, seconds, minutes, hours });
                    }
                }, 10)
            })
        }
    }

    pauseTimer() {
        this.setState({
            stopwatchRunning: false
        })
        clearInterval(this.timer);
    }

    captureLap() {
        if (this.state.lapToCapture <= 4){
            let whatLap = 'lap' + this.state.lapToCapture
            this.setState({
                [whatLap]: [this.state.hours, this.state.minutes, this.state.seconds, this.state.hundredthSeconds],
                lapToCapture: this.state.lapToCapture + 1
            }, () => {
                console.log(this.state);
            });
        }
    }

    resetTimer() {
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            hundredthSeconds: 0,
            stopwatchRunning: false,
            lap1: [0, 0, 0, 0],
            lap2: [0, 0, 0, 0],
            lap3: [0, 0, 0, 0],
            lap4: [0, 0, 0, 0],
            lapToCapture: 1,
        })
        clearInterval(this.timer);
    }

    render() {
        return (
            <section className='stopwatch_container'>

                <div className='stopwatch_box'>
                    <img src='http://www.sportcount.com/scwp_2017/wp-content/uploads/2017/09/face-sportcount-stopwatch.png' alt='stopwatch' />
                    <div className='stopwatch_screen'>
                        {this.state.hours < 10 ? '0' + this.state.hours : this.state.hours}
                        :
                        {this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}
                        :
                        {this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}
                        .
                        {this.state.hundredthSeconds < 10 ? '0' + this.state.hundredthSeconds : this.state.hundredthSeconds}
                    </div>

                    <div className='stopwatch_controls'>
                        <div onClick={this.startTimer} className='stopwatch_btn stopwatch_start'>Start</div>
                        <div onClick={this.pauseTimer} className='stopwatch_btn stopwatch_pause'>Pause</div>
                        <div onClick={this.captureLap} className='stopwatch_btn stopwatch_lap'>Lap</div>
                        <div onClick={this.resetTimer} className='stopwatch_btn stopwatch_reset'>Reset</div>
                    </div>

                </div>


                <div className='stopwatch_laps'>
                    <div>
                        Lap 1: {this.state.lap1[0] < 10 ? '0' + this.state.lap1[0] : this.state.lap1[0]}
                        :
                        {this.state.lap1[1] < 10 ? '0' + this.state.lap1[1] : this.state.lap1[1]}
                        :
                        {this.state.lap1[2] < 10 ? '0' + this.state.lap1[2] : this.state.lap1[2]}
                        .
                        {this.state.lap1[3] < 10 ? '0' + this.state.lap1[3] : this.state.lap1[3]}
                    </div>
                    <div>
                        Lap 2: {this.state.lap2[0] < 10 ? '0' + this.state.lap2[0] : this.state.lap2[0]}
                        :
                        {this.state.lap2[1] < 10 ? '0' + this.state.lap2[1] : this.state.lap2[1]}
                        :
                        {this.state.lap2[2] < 10 ? '0' + this.state.lap2[2] : this.state.lap2[2]}
                        .
                        {this.state.lap2[3] < 10 ? '0' + this.state.lap2[3] : this.state.lap2[3]}
                    </div>
                    <div>
                        Lap 3: {this.state.lap3[0] < 10 ? '0' + this.state.lap3[0] : this.state.lap3[0]}
                        :
                        {this.state.lap3[1] < 10 ? '0' + this.state.lap3[1] : this.state.lap3[1]}
                        :
                        {this.state.lap3[2] < 10 ? '0' + this.state.lap3[2] : this.state.lap3[2]}
                        .
                        {this.state.lap3[3] < 10 ? '0' + this.state.lap3[3] : this.state.lap3[3]}
                    </div>
                    <div>
                        Lap 4: {this.state.lap4[0] < 10 ? '0' + this.state.lap4[0] : this.state.lap4[0]}
                        :
                        {this.state.lap4[1] < 10 ? '0' + this.state.lap4[1] : this.state.lap4[1]}
                        :
                        {this.state.lap4[2] < 10 ? '0' + this.state.lap4[2] : this.state.lap4[2]}
                        .
                        {this.state.lap4[3] < 10 ? '0' + this.state.lap4[3] : this.state.lap4[3]}
                    </div>
                </div>

            </section>
        );
    }
}

export default Stopwatch;