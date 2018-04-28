import React, { Component } from 'react';
import axios from 'axios';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap'
import TimeEstimate from './TimeEstimate'
import '../App.css';

class BusStopForm extends Component {
  constructor(props) {
   super(props);
   this.state = {
     stops: [],
     stopSelected: ''
   }
   this.handleChange = this.handleChange.bind(this);
 }

  componentDidMount(){
    console.log("Route ID: " + this.props.routeID + "\nDirection: " + this.props.directionID)
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/Stops/' + this.props.routeID + '/' + this.props.directionID
    })
    .then((response) => {
      console.log("Response")
      console.log(response);
      console.log(response.data);
      this.setState({
        stops: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillReceiveProps(nextProps){
    console.log("Next route: " + nextProps.routeID + "\nNext direction: " + nextProps.directionID);
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/Stop/' + this.props.routeID + '/' + this.props.directionID
    })
    .then((response) => {
      console.log("Response")
      console.log(response);
      console.log(response.data);
      this.setState({
        directions: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  displayOptions(){
  const stopsList = this.state.stops.map((stopObj) =>
      <option key={stopObj.Text} value={stopObj.Value}>{stopObj.Text}</option>
  );
  return stopsList;
  }

  handleChange(e){
    console.log("Stop selected: " + e.target.value)
    this.setState({
      stopSelected: e.target.value
    });
  }

  render() {
    return (
      <div>
        <FormGroup controlId="formControlsSelect">
            <ControlLabel>Bus Stop</ControlLabel>
            <FormControl onChange={this.handleChange} componentClass="select" placeholder="Select a bus route!">
              <option value="other">...</option>
              {this.displayOptions()}
            </FormControl>
        </FormGroup>
        {this.state.stopSelected && <TimeEstimate routeID={this.props.routeID} directionID={this.props.directionID} stopID={this.state.stopSelected}/>}
      </div>
    );
  }
}

export default BusStopForm;
