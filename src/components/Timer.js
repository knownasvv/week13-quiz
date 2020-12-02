import React, { Component } from 'react';
import {
    Button, Grid, Typography
} from '@material-ui/core';

export default class Timer extends Component{
    constructor(props){
        super(props);

        this.state = {
            hours: this.props.hours,
            minutes: this.props.minutes,
            seconds: this.props.seconds
        }
    }

    componentDidMount() {
        this.intervalTimer = setInterval(() => {
            const { hours, seconds, minutes } = this.state

            if(seconds > 0){
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if(seconds === 0){
                if(minutes > 0){
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
            if(seconds === 0){
                if(minutes === 0){
                    if(hours === 0){
                        clearInterval(this.intervalTimer)
                    }
                    else{
                        this.setState(({ hours }) => ({
                            hours: hours - 1,
                            minutes: 59,
                            seconds: 59
                        }))
                    }
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalTimer)
    }

    render() {
        const { hours, minutes, seconds } = this.state
        return (
            <div>
                { hours === 0 && minutes === 0 && seconds === 0 ? 
                    <>
                        <Typography variant="h5">BOOOM!!!!!!</Typography>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <Button variant="outlined" color="secondary">Reset</Button>
                            </Grid>
                        </Grid>
                    </>
                    : 
                    <Typography align="center">
                        Time Remaining<br/>
                        {hours < 10 ? `0${hours}` : hours}:
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                        <br/>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <Button variant="outlined" color="primary">Pause</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" color="secondary">Reset</Button>
                            </Grid>
                        </Grid>
                    </Typography>
                }
            </div>
        )
    }
}