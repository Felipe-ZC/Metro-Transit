import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {Panel} from 'react-bootstrap';
import InputForm from './components/InputForm'

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     /*
     * Routes is an array of objects where
     * each object contains the route provider,
     * providerID and the route number.
     */
     routes : [],
   }
 }

 /*
  * Get all routes that are in service
  * on the current day once this component
  * has been mounted.
  */
  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://svc.metrotransit.org/NexTrip/Routes'
    })
    .then((response) => {
      console.log("Response")
      console.log(response);
      console.log(response.data);
      this.setState({
        routes: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container App">
          <div className="row">
              <h1 className="App-header">Metro Transit</h1>
          </div>
          <div className="row Input-Form">
            <div className="col-md-12">
              <Panel className="Main-Panel">
              <InputForm routeList={this.state.routes} />
            </Panel>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
