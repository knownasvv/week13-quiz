import {Typography, Box, Button, Grid, Container} from '@material-ui/core';
import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const theme = createMuiTheme({
  typography:{
    fontFamily: [
      'Work Sans', 
      'Rubik',
      'sans-serif'
    ],
  },
});




class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      hours: 0,
      minutes: 0,
      seconds: 0,
      hours2: 0,
      minutes2: 0,
      seconds2: 0,
      displayStats: 0,
      displayButton: 0
    }
    this.countTimer = this.countTimer.bind(this);
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

    changeDisplay=()=>{
      this.setState({
        displayStats: (!this.state.displayStats),
        hours2: this.state.hours,
        seconds2: this.state.seconds,
        minutes2: this.state.minutes,
        hours: 0,
        seconds: 0,
        minutes: 0,
        displayButton: 0
      },
      ()=>{this.countTimer()})
    }

    countTimer(){
      this.intervalTimer = setInterval(() => {
        const { hours2, seconds2, minutes2 } = this.state

        if(seconds2 > 0){
            this.setState(({ seconds2 }) => ({
                seconds2: seconds2 - 1
            }))
        }
        if(seconds2 === 0){
            if(minutes2 > 0){
                this.setState(({ minutes2 }) => ({
                    minutes2: minutes2 - 1,
                    seconds2: 59
                }))
            }
        }
        if(seconds2 === 0){
            if(minutes2 === 0){
                if(hours2 === 0){
                    clearInterval(this.intervalTimer)
                }
                else{
                    this.setState(({ hours2 }) => ({
                        hours2: hours2 - 1,
                        minutes2: 59,
                        seconds2: 59
                    }))
                }
            }
        }
    }, 1000)
    }
  
    pauseTimer=()=>{
      clearInterval(this.intervalTimer)
      this.setState({displayButton: !this.state.displayButton});
    }

    resumeTimer=()=>{
      this.setState({displayButton: !this.state.displayButton}, ()=>{
        this.countTimer()
      });
    }

  render(){
    const { hours, minutes, seconds, hours2, minutes2, seconds2 } = this.state;
    return (
      <ThemeProvider theme={theme}>
          <Typography variant="h3" align="center">Simple Countdown</Typography>
          <Box textAlign="center" display={this.state.displayStats ? "none": "block"}>
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
            <Button variant="outlined" color="primary" onClick={this.changeDisplay}>START</Button>
          </Box>
          <Box textAlign="center" display={this.state.displayStats ? "block": "none"}>
          {hours2 === 0 && minutes2 === 0 && seconds2 === 0 ? 
              <Container>
                  <Typography variant="h5">BOOOM!!!!!!</Typography>
                  <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={3}>
                          <Button variant="outlined" color="secondary" onClick={this.changeDisplay}>Reset</Button>
                      </Grid>
                  </Grid>
              </Container>
              : 
              <Container>
                <Typography align="center">
                    Time Remaining<br/>
                    {hours2 < 10 ? `0${hours2}` : hours2}:
                    {minutes2 < 10 ? `0${minutes2}` : minutes2}:
                    {seconds2 < 10 ? `0${seconds2}` : seconds2}
                    <br/>
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={3}>
                          <Box display={this.state.displayButton ? "none": "block"}>
                            <Button variant="outlined" color="primary"  onClick={this.pauseTimer}>Pause</Button>
                          </Box>
                          <Box display={this.state.displayButton ? "block": "none"}>
                            <Button variant="outlined" color="primary" onClick={this.resumeTimer}>Resume</Button>
                          </Box>
                      </Grid>
                      <Grid item xs={3}>
                          <Button variant="outlined" color="secondary" onClick={this.changeDisplay}>Reset</Button>
                      </Grid>
                  </Grid>
              </Container>
            }
          </Box>
      </ThemeProvider>
    );
  }
}

export default App;
