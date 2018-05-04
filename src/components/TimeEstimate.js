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
      // console.log("Current CDT: " + moment().tz("America/Chicago").format("HH:mm"))
      this.setState({
        departureTime: response.data,
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
    var tempTime = deptTime.DepartureText.split(" ")
    // The time is in minutes! No need to calculate time difference
    if(tempTime.length > 1){
      return tempTime[0] + " minutes";
    }
    // The time is not in minutes! Calculate time difference
    else{
      var d = new Date()
      var currTime = Date.now()
      var eTime = deptTime.DepartureTime.split("/Date(")[1].split("-");
      console.log(currTime)
      console.log(eTime[0]);
      var difference = ((eTime[0] - currTime)/60)/1000;
      return Math.ceil(difference) + " minutes"
  }
}

  //
  displayDepartureTime(){
    if(this.state.departureTime.length > 0){
      for(var i = 0; i < this.state.departureTime.length;++i){
        // Only look for depature times that have not left yet!
        if(!(this.state.departureTime[i].DepartureText === "Due")){
          console.log("Not due")
          return (<Panel>
            <Panel.Body> The next route leaves in {this.calculateTime(this.state.departureTime[i])}. </Panel.Body>
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
          {this.state.departureTime && this.displayDepartureTime()}
        </div>
    );
  }
}

export default TimeEstimate;
