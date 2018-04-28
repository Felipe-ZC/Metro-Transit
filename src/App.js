import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
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
     value: '',
     routeSelected: false
   }
  //  this.handleChange = this.handleChange.bind(this);
  //  this.handleUserInput = this.handleUserInput.bind(this);
 }

 /*
  * Get all routes that are inservice
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
        routes: response.data,
        route: response.data[0].Route,
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
          <div className="row">
            <div className="col-xs-12">
              <InputForm routeList={this.state.routes} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
