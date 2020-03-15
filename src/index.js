import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import setStore from './store';
import './index.css';
import App from './App';
import data from './data/data';

const initialState = {
	app: {
		employeeList: data
	}
};



// function tableList(state = initialState, action) {
// 	if (action.type === 'ADD_DATA') {
// 		return [
// 			...state,
// 			action.payload
// 		];
// 	}
// 	return state;
// }

const store = setStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// import { createStore } from 'redux';



// store.subscribe(() => {
// 	console.log('subscribe', store.getState())
// })

// store.dispatch({ type: 'ADD_DATA', payload: 'first item'});