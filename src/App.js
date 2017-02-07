import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Table } from 'react-bootstrap';

var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCfsSYqEXnOjmdAmAU6SjyIuJAisL_igjE",
    authDomain: "inventory-2f2d7.firebaseapp.com",
    databaseURL: "https://inventory-2f2d7.firebaseio.com",
    storageBucket: "inventory-2f2d7.appspot.com",
    messagingSenderId: "263236529647"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      id:uuid.v1(),
      name:'',
      description:'',
      quantity:'',
      submitted: false
    }
   
  }
  render() {
    var inputForm;
    var table;
    var rows;

//creating a string representation of the array
console.log("inventoryArray: " + JSON.stringify(this.state.inventory));

inputForm = <span>
      <h2>Please enter your inventory Item</h2>
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" placeholder="Enter Name..." name="name" />
        <input type="text" placeholder="Enter description..." name="description" />
        <input type="text" placeholder="Enter quantity..." name="quantity" />
        <button type="submit">Submit</button>
      </form>
    </span>

 if (this.state.submitted && this.state.inventory.length) {
    rows = this.state.inventory.map(function (item,index) {
        return (
          <tr key={index}>
            <th> {item.name} </th>
            <th> {item.description} </th>
            <th> {item.quantity} </th>
          </tr>
        )
      });

  table = (
   <span>
      <Table striped bordered condensed hover>
          <thead>
              <tr>
                <th> Name </th>
                <th> Description </th>
                <th> Quantity </th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </span>
  
)
 }
  return (
      <div className="App">
        <div className="App-header">
          <h2>Inventory App</h2>
        </div>
        <div className="text-center">
          {inputForm}
          <br />
          {table}
        </div>
      </div>
  );
  }
   //Adding our function that will handle our form submit 
  onSubmit(event) {
    event.preventDefault();
     
     const details = {}

    //Go through each element in the form making sure it's an input element
    //we get the value from user input and enter it to the dictionary with input name as the key
    event.target.childNodes.forEach(function (el) {
      if (el.tagName === 'INPUT') {
        details[el.name] = el.value
        el.value=""; //clears the value and sets it to blank
      } else {
        el.value = null
      }
    })
    const newInventoryItem = this.state.inventory.slice()

    if(details.name){
       newInventoryItem.push(details)
    }

    this.setState({
      inventory: newInventoryItem,
      submitted: true
    }) 
    firebase.database().ref('Inventory/'+this.state.id).set(details)//details dictionary from user input
  }
}

export default App;
