import React, { Component } from 'react';
import {FormControl, FormGroup, ControlLabel, Panel} from 'react-bootstrap'
import DirectionsForm from './DirectionsForm'
import '../App.css';

class InputForm extends Component {
  constructor(props) {
   super(props);
   this.state = {
     routeSelected: '',
   }
   this.handleRouteChange = this.handleRouteChange.bind(this);
 }

  displayOptions(){
  const routesList = this.props.routeList.map((routeObj) =>
      <option key={routeObj.Route} value={routeObj.Route}>{routeObj.Description}</option>
  );
  return routesList;
  }

  handleRouteChange(e){
    console.log("Route ID: " + e.target.value)
    this.setState({
      routeSelected: e.target.value
    });
  }

  render() {
    return (
        <form>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Bus Route</ControlLabel>
            <FormControl onChange={this.handleRouteChange} componentClass="select" placeholder="Select a bus route!">
              <option value="other">...</option>
              {this.displayOptions()}
            </FormControl>
          </FormGroup>
          {this.state.routeSelected &&  <DirectionsForm routeID={this.state.routeSelected}/>}
        </form>
    );
  }
}

export default InputForm;
