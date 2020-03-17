import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableBody from './table/body';
import SortLink from "./sort/sortLink";
import Button from "./button/button";
import './App.css';
import { getSortedEmployeeCollection, sortSelector } from "./selectors";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import * as actions from "./actions/actions";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      currentlyDisplayed: this.props.collection,
      condition:false
    };

    this.onInputChange = this.onInputChange.bind(this);
    // this.change = this.change.bind(this);
  }

  handleClick() {
    this.setState( { condition : !this.state.condition } );
}

  onInputChange(event) {
    let newDisplayed = this.props.collection.filter(person => {
      return (
        person.firstName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        person.lastName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        person.position
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        person.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newDisplayed
    });
  }

  change(event) {
    if (event.target.value === "all") {
      this.setState({
        currentlyDisplayed: this.props.collection,
        toggle: event.target.value
      });
    } else {
      let newDisplayed = this.props.collection.filter(person => {
        return person.isActive
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      this.setState({
        currentlyDisplayed: newDisplayed,
        toggle: event.target.value
      });
    }
  }

  deleteContact(rowId) {
    let newDisplayed = this.props.collection.filter(row => row.id !== rowId);
    this.setState({
      delete: "delete",
      currentlyDisplayed: newDisplayed
    });
  }

  render() {
    let collection = this.props.collection;
    if (this.state.toggle === "all") {
      collection = this.props.collection;
    }
    // if (this.state.searchTerm && this.state.toggle === 'all') {
    //   collection = this.state.currentlyDisplayed
    // }
    if (this.state.searchTerm) {
      collection = this.state.currentlyDisplayed;
    }
    if (this.state.delete) {
      collection = this.state.currentlyDisplayed;
    }

    if (this.state.toggle === "yes" || this.state.toggle === "no") {
      collection = this.state.currentlyDisplayed;
    }

    return (
      <div>
        <input type="text" onChange={this.onInputChange} className="searchBar"/>
        <p className="searchBelow">To sort pls clear input</p>
        <table>
        <thead>
      <tr>
        <th className="firstColumn">
        <SortLink
                  label="First Name"
                  sortKey="firstName"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                />
        </th>

        <th>
        <SortLink
                  label="Last Name"
                  sortKey="lastName"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                />
        </th>

        <th>
        <SortLink
                  label="Age"
                  sortKey="age"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                  textRight
                />
        </th>

        <th>
        <SortLink
                  label="Position"
                  sortKey="position"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                />
        </th>

        <th>
        <SortLink
                  label="Hired At"
                  sortKey="hiredAt"
                  type="date"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                />
        </th>
        <th>
        <SortLink
                  label="Salary"
                  sortKey="salary"
                  type="float"
                  sort={this.props.setSortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                  textRight
                />
        </th>
        <th>
        <SortLink
                  label="E-mail"
                  sortKey="email"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                />
        </th>

        <th>
        <SortLink
                  label="Active"
                  sortKey="isActive"
                  sort={this.props.sortParams}
                  onSort={(key, type) => this.props.setSortParams(key, type)}
                  onSortClear={() => this.props.clearSortParams()}
                />
        </th>
        <select
          onChange={this.change.bind(this)}
          value={this.state.value}
        >
          <option value="all">none</option>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      </tr>
    </thead>

        {/* <AutoSizer>
  {({ height, width }) => (
            <List
              itemData={collection}
              className={'tableMain'}
              height={600}
              itemCount={collection.length}
              itemSize={30}
              width={width}
            > */}
            <tbody>
              {collection.map((person, i) => (
  
  <tr key={person.id} >

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
              <button onClick={() => this.deleteContact(person.id)} className="btn btn-danger">Remove</button>
  </tr>
  
  
  ))}
  </tbody>
              {/* {ItemRenderer}
              
            </List>
// )}
</AutoSizer> */}
</table>
      </div>
    );
  }
}

// class ItemRenderer extends Component {
  
//   render() {
//     console.log(this.props);
//     // Access the items array using the "data" prop:
//     const item = this.props.data[this.props.index];
 
//     return (
     
//     <tbody>
     
//         <tr key={item.id}>
//                 <td>{item.firstName}</td>
//                 <td>{item.lastName}</td>
//                 <td className="text-right">{item.age}</td>
//                 <td>{item.position}</td>
//                 <td>{item.hiredAt}</td>
//                 <td className="text-right">
//                   {parseFloat(item.salary).toLocaleString("en-US", {
//                     style: "currency",
//                     currency: "USD"
//                   })}
//                 </td>
//                 <td>{item.email}</td>
//                 <td>{item.isActive}</td>
      
//                 {/* <td>{person.location?person.location:''}
//                 </td> */}
//       {/* <button onClick={() => this.deleteContact(item.id)} className="btn btn-danger">Remove</button> */}
//       </tr>

//       </tbody>
  
//     );
//   }
// }

const mapStateToProps = (state, props) => ({
  collection: getSortedEmployeeCollection(state),
  sortParams: sortSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setSortParams: bindActionCreators(actions.setSortParams, dispatch),
  clearSortParams: bindActionCreators(actions.clearSortParams, dispatch),
  deleteContact: bindActionCreators(actions.deleteContact, dispatch)
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(App);

