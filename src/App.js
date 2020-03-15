import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import * as actions from "./actions/actions";

class App extends Component {
  render() {
    console.log(this.props.collection);
    return (
      <div>
        <Table responsive>
  <thead>
    <tr>
    <th onClick={() => this.props.setSortParams("firstName")}>First Name</th>

<th onClick={() => this.props.setSortParams("lastName")}>Last Name</th>

<th onClick={() => this.props.setSortParams("age")}>Age</th>

<th onClick={() => this.props.setSortParams("position")}>Position</th>

<th onClick={() => this.props.setSortParams("hiringAt", "date")}>Hired At</th>

<th onClick={() => this.props.setSortParams("salary")}>Salary</th>
<th onClick={() => this.props.setSortParams("active")}>Active</th>
    </tr>
  </thead>
  <tbody>
  {this.props.collection.map(person => (

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

          <td>{person.location?person.location:''}
          </td>

</tr>

))}

  
  </tbody>
</Table>


      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  collection: state.app.employeeList,
  sortParams: state.app.sortParams
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

