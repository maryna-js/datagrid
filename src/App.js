import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
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
      currentlyDisplayed: this.props.collection
    }

this.onInputChange = this.onInputChange.bind(this);
this.change = this.change.bind(this);

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
        currentlyDisplayed: this.props.collection
      });
    }
    else {
      let newDisplayed = this.props.collection.filter(person => {
        return (
          person.isActive.toLowerCase().includes(event.target.value.toLowerCase()) 
          )})
      this.setState({
        currentlyDisplayed: newDisplayed
      });
    }

  }

  render() {

    return (
      <div>
        <input type="text" onChange={this.onInputChange}/>

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
<select onChange={this.change} value={this.state.value}>
<option value="all">all</option>
  <option value="yes">yes</option>
  <option value="no">no</option>
</select>

    </tr>
  </thead>
  <tbody>
  {this.state.currentlyDisplayed.map(person => (

<tr key={person.id}>
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
  setSortParams: bindActionCreators(actions.setSortParams, dispatch)
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(App);

