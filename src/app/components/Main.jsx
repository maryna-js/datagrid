import React from 'react';
import PropTypes from 'prop-types';
import data from '../data/mock_data.json';
import TableMain from './TableMain';


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data
    }
    this.sortBy = this.sortBy.bind(this)
  }

  sortBy(key) {
    console.log(data);
    this.setState({
      data: data( (a, b) => a[key] - b[key])
    })
  }

  render() {
    return (
      <div className="table-container">
      <TableMain 
      data = {this.state.data}
      sortBy = {this.sortBy}
      />
      </div>
    )
  }
}

// const Main = props => (
  

//     <h1 className="some-user-class">Hello from ReactJS</h1>
//     <div>
//       <button className="btn btn-primary mr-3" onClick={props.decrement}>-</button>
//       <span>{props.value}</span>
//       <button className="btn btn-primary ml-3" onClick={props.increment}>+</button>
//     </div>
//   </div>
// );



export default Main;
