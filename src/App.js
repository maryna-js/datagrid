import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from './table/body';
import './App.css';
import { getSortedEmployeeCollection, sortSelector } from "./selectors";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import * as actions from "./actions/actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      currentlyDisplayed: this.props.collection,
    }

this.onInputChange = this.onInputChange.bind(this);
// this.change = this.change.bind(this);

  }

  onInputChange(event) {

let newDisplayed = this.props.collection.filter(person => {
  return (
    person.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || 
    person.lastName.toLowerCase().includes(event.target.value.toLowerCase()) ||
    person.position.toLowerCase().includes(event.target.value.toLowerCase()) ||
    person.email.toLowerCase().includes(event.target.value.toLowerCase()) 
    )})
this.setState({
  searchTerm: event.target.value,
  currentlyDisplayed: newDisplayed
});
  }

  change(event) {

    if (event.target.value === 'all') {
      this.setState({
        currentlyDisplayed: this.props.collection,
        toggle: event.target.value
      });
    }
    else {
      let newDisplayed = this.props.collection.filter(person => {
        return (
          person.isActive.toLowerCase().includes(event.target.value.toLowerCase()) 
          )})
      this.setState({
        currentlyDisplayed: newDisplayed,
        toggle: event.target.value
      });
    }

  }

  deleteContact(rowId){
    console.log(rowId)
    let newDisplayed = this.props.collection.filter(row => row.id !== rowId)
    this.setState({
      delete: 'delete',
      currentlyDisplayed: newDisplayed
    });
  }

  render() {
  
    let collection = this.props.collection;
    if (this.state.toggle === 'all') {
      collection = this.props.collection
    }
// if (this.state.searchTerm && this.state.toggle === 'all') {
//   collection = this.state.currentlyDisplayed
// }
if (this.state.searchTerm) {
  collection = this.state.currentlyDisplayed
}
if (this.state.delete) {
  collection = this.state.currentlyDisplayed
}

if (this.state.toggle === 'yes' || this.state.toggle === 'no') {
  collection = this.state.currentlyDisplayed
}

    return (
      <div>
        <input type="text" onChange={this.onInputChange}/>
<p>To sort pls clear input</p>
        <Table responsive>
  <thead>
    <tr>
    <th onClick={() => this.props.setSortParams("firstName")}>First Name</th>

<th onClick={() => this.props.setSortParams("lastName")}>Last Name</th>

<th onClick={() => this.props.setSortParams("age")}>Age</th>

<th onClick={() => this.props.setSortParams("position")}>Position</th>

<th onClick={() => this.props.setSortParams("hiringAt", "date")}>Hired At</th>
<th onClick={() => this.props.setSortParams("salary", "float")}>Salary</th>
<th onClick={() => this.props.setSortParams("email")}>e-mail</th>

<th onClick={() => this.props.setSortParams("isActive")}>Active</th>
<select onChange={this.change.bind(this)} value={this.state.value}>
<option value="all">none</option>
  <option value="yes">yes</option>
  <option value="no">no</option>
</select>

    </tr>
  </thead>
  <tbody>
    
    {collection.map(person => (
  
  <tr key={person.id}>
     <button onClick={() => this.deleteContact(person.id)} className="btn btn-danger">Remove</button>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td className="text-right">{person.age}</td>
            <td>{person.position}</td>
            <td>{person.hiredAt}</td>
            <td className="text-right">
              {parseFloat(person.salary).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            </td>
            <td>{person.email}</td>
            <td>{person.isActive}</td>
  
            {/* <td>{person.location?person.location:''}
            </td> */}
 
  </tr>
  
  
  ))}
  
    
    </tbody>
</Table>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  collection: getSortedEmployeeCollection(state),
  sortParams: sortSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setSortParams: bindActionCreators(actions.setSortParams, dispatch),
  deleteContact: bindActionCreators(actions.deleteContact, dispatch)
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(App);

