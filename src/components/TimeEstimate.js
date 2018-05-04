import React, { Component } from 'react';
import axios from 'axios';
import {Panel} from 'react-bootstrap'
import moment from 'moment-timezone';
import '../App.css';

class TimeEstimate extends Component {
  constructor(props) {
   super(props);
   this.state = {
     departureTime: {},
     currentTime: {}
   }
 }

 // Load time departure objects when component has been mounted
  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/' + this.props.routeID + '/' + this.props.directionID + '/' + this.props.stopID
    })
    .then((response) => {
      console.log("Response")
      console.log(response);
      console.log(response.data);
      console.log("Current CDT: " + moment().tz("America/Chicago").format("HH:mm"))
      this.setState({
        departureTime: response.data,
        currentTime: moment().tz("America/Chicago").format("HH:mm")
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Update component state with new props!
  componentWillReceiveProps(nextProps){
    console.log("Next Route: " + nextProps.routeID + "\nNext Direction: " + nextProps.directionID + "\nNext Stop: " + nextProps.stopID);
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/' + nextProps.routeID + '/' + nextProps.directionID + '/' + nextProps.stopID
    })
    .then((response) => {
      console.log("Response")
      console.log(response);
      console.log(response.data);
      console.log("Current Time: " + this.state.currentTime)
      // Get next departure
      this.setState({
        departureTime: response.data,
        currentTime: moment().tz("America/Chicago").format("HH:mm")
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Takes in the next depature time as a string and calculates the time in minutes
  // until the next bus/train arrives
  calculateTime(deptTime){
    // Separate time at the white space char
    var tempTime = deptTime.split(" ")
    // The time is in minutes! No need to calculate time difference
    if(tempTime.length > 1){
      return deptTime;
    }
    // The time is not in minutes! Calculate time difference
    else{
      if(this.state.currentTime){
        var currTime = this.state.currentTime.split(":")
        var dTime = deptTime.split(":")
        var hoursDiff =  parseInt(dTime[0]) - parseInt(currTime[0])
        var minDiff = parseInt(dTime[1]) - parseInt(currTime[1])
        // Convert hours to minutes and add/subtract difference in minutes
        var timeDiff = (hoursDiff * 60) + minDiff;
        return timeDiff + " minutes"
      }
    }
  }

  //
  displayDepartureTime(){
    if(this.state.departureTime){
      for(var i = 0; i < this.state.departureTime.length;++i){
        // Only look for depature times that have not left yet!
        if(!(this.state.departureTime[i].DepartureText === "Due")){
          console.log("Not due")
          return (<Panel>
            <Panel.Body> The next route leaves in {this.calculateTime(this.state.departureTime[i].DepartureText)}. </Panel.Body>
          </Panel>)
        }
        else{
          console.log("Due")
        }
      }
    }
    // No departures at this time
    else{
      return (<Panel>
        <Panel.Body> No current departures at this time.</Panel.Body>
      </Panel>)
    }
  }
  render() {
    return (
        <div>
          {this.displayDepartureTime()}
        </div>
    );
  }
}

export default TimeEstimate;
