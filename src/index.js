import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';

const initialState = [
	'1',
	'second row',
	'third td'
];

function tableList(state = initialState, action) {
	if (action.type === 'ADD_DATA') {
		return [
			...state,
			action.payload
		];
	}
	return state;
}

const store = createStore(tableList);

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