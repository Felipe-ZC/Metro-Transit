import React, { Component } from 'react';
import axios from 'axios';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap'
import BusStopForm from './BusStopForm'
import '../App.css';

class DirectionsForm extends Component {
  constructor(props) {
   super(props);
   this.state = {
     directions: [],
     directionSelected: ''
   }
   this.handleChange = this.handleChange.bind(this);
 }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/Directions/' + this.props.routeID
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

  componentWillReceiveProps(nextProps){
    console.log("Next prop: " + nextProps.routeID);
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/Directions/' + nextProps.routeID
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
  const directList = this.state.directions.map((directObj) =>
      <option key={directObj.Text} value={directObj.Value}>{directObj.Text}</option>
  );
  return directList;
  }

  handleChange(e){
    console.log("Direction selected: " + e.target.value)
    this.setState({
      directionSelected: e.target.value
    });
  }

  render() {
    return (
        <div>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Route Direction</ControlLabel>
            <FormControl onChange={this.handleChange} componentClass="select" placeholder="Select a bus route!">
              <option value="other">...</option>
              {this.displayOptions()}
            </FormControl>
          </FormGroup>
          {this.state.directionSelected &&  <BusStopForm routeID={this.props.routeID} directionID={this.state.directionSelected}/>}
        </div>
    );
  }
}

export default DirectionsForm;
