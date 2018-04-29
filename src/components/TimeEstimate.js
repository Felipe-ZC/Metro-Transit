import React, { Component } from 'react';
import axios from 'axios';
import {Panel} from 'react-bootstrap'
import '../App.css';

class TimeEstimate extends Component {
  constructor(props) {
   super(props);
   this.state = {
     departureTime: {}
   }
  //  this.handleChange = this.handleChange.bind(this);
 }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/' + this.props.routeID + '/' + this.props.directionID + '/' + this.props.stopID
    })
    .then((response) => {
      console.log("Response")
      console.log(response);
      console.log(response.data);
      this.setState({
        departureTime: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
  //
  displayDepartureTime(){
    if(this.state.departureTime){
      for(var i = 0; i < this.state.departureTime.length;++i){
        if(!(this.state.departureTime[i].DepartureText === "Due")){
          console.log("Not due")
          return (<Panel>
            <Panel.Body> The next route leaves in {this.state.departureTime[i].DepartureText} </Panel.Body>
          </Panel>)
        }
        else{
          console.log("Due")
        }
      }
    }
  }
  render() {
    return (
        <div>
          {this.displayDepartureTime()}
          {/* <FormGroup controlId="formControlsSelect">
            <ControlLabel>Route Direction</ControlLabel>
            <FormControl onChange={this.handleChange} componentClass="select" placeholder="Select a bus route!">
              <option value="other">...</option>
              {this.displayOptions()}
            </FormControl>
          </FormGroup>
          {this.state.directionSelected &&  <BusStopForm routeID={this.props.routeID} directionID={this.state.directionSelected}/>} */}
        </div>
    );
  }
}

export default TimeEstimate;
