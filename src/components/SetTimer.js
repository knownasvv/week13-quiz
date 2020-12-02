import React, { Component } from 'react';
import {
    Box, Button, Grid, Typography
} from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default class SetTimer extends Component{
    constructor(props){
        super(props);

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    hoursUp=()=>{this.setState({hours: this.state.hours + 1});}

    minutesUp=()=>{
        this.state.minutes === 59 ?
            this.setState({
                minutes: 0, 
                hours: this.state.hours + 1
            }):
            this.setState({minutes: this.state.minutes + 1})
    }

    secondsUp=()=>{
        this.state.seconds === 59 ?
            this.setState({seconds: 0,}, ()=>{this.minutesUp()}):
            this.setState({seconds: this.state.seconds + 1})
    }

    hoursDown=()=>{
        if(this.state.hours > 0){
            this.setState({hours: this.state.hours - 1})
        }
    }

    minutesDown=()=>{
        if(this.state.minutes === 0){
            if(this.state.hours > 0){
                this.setState({minutes: 59},
                    ()=>{this.hoursDown()})
            }
        }
        else this.setState({minutes: this.state.minutes - 1})
    }

    secondsDown=()=>{
        if(this.state.seconds === 0){
            if(this.state.minutes > 0){
                this.setState({seconds: 59},
                    ()=>{this.minutesDown()})
            }
        }
        else this.setState({seconds: this.state.seconds - 1})
    }

    render(){
        const { hours, minutes, seconds } = this.state;
        return(
            <Box textAlign="center">
                
                <Grid container spacing={1} direction="column" justify="center" alignItems="center">
                    <Grid container item xs={5} spacing={1}>
                        <Grid item xs onClick={this.hoursUp}><ArrowDropUpIcon fontSize="large"/></Grid>
                        <Grid item xs></Grid>
                        <Grid item xs onClick={this.minutesUp}><ArrowDropUpIcon fontSize="large"/></Grid>
                        <Grid item xs></Grid>
                        <Grid item xs onClick={this.secondsUp}><ArrowDropUpIcon fontSize="large"/></Grid>
                    </Grid>
                    <Grid container item xs={5} spacing={1}>
                        <Grid item xs>
                            <Typography>{hours < 10 ? `0${hours}` : hours}</Typography>
                        </Grid>
                        <Grid item xs><Typography>:</Typography></Grid>
                        <Grid item xs>
                            <Typography>{minutes < 10 ? `0${minutes}` : minutes}</Typography>
                        </Grid>
                        <Grid item xs><Typography>:</Typography></Grid>
                        <Grid item xs>
                            <Typography>{seconds < 10 ? `0${seconds}` : seconds}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} spacing={1}>
                        <Grid item xs onClick={this.hoursDown}><ArrowDropDownIcon fontSize="large"/></Grid>
                        <Grid item xs></Grid>
                        <Grid item xs onClick={this.minutesDown}><ArrowDropDownIcon fontSize="large"/></Grid>
                        <Grid item xs></Grid>
                        <Grid item xs onClick={this.secondsDown}><ArrowDropDownIcon fontSize="large"/></Grid>
                    </Grid>
                </Grid>
                <Button variant="outlined" color="primary">START</Button>
            </Box>
        );
    }
}