import React, { Component } from 'react';
import axios from 'axios';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap'
import '../App.css';

class DirectionsForm extends Component {
  constructor(props) {
   super(props);
   this.state = {
     directions: []
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

  // shouldComponentUpdate(nextProps,nextState){
  //   if(nextProps.routeID === this.props.routeID && nextState.directions === this.state.directions)
  //     return false;
  //   else{
  //     return true;
  //     console.log("Should update!")
  //   }
  // }
  //
  // componentWillUpdate(prevProps, prevState, snapshot){
  //   axios({
  //     method: 'get',
  //     url: 'http://svc.metrotransit.org/NexTrip/Directions/' + this.props.routeID
  //   })
  //   .then((response) => {
  //     console.log("Response")
  //     console.log(response);
  //     console.log(response.data);
  //     this.setState({
  //       directions: response.data,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  displayOptions(){
  const directList = this.state.directions.map((directObj) =>
      <option key={directObj.Text} value={directObj.value}>{directObj.Text}</option>
  );
  return directList;
  }

  handleChange(e){
    console.log(e.target.value)
    this.setState({
      routeSelected: e.target.value
    });
  }

  render() {
    return (
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Route Direction</ControlLabel>
            <FormControl onChange={this.handleRouteChange} componentClass="select" placeholder="Select a bus route!">
              {/* <option value="other">...</option> */}
              {this.displayOptions()}
            </FormControl>
          </FormGroup>
    );
  }
}

export default DirectionsForm;
