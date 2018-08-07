import React, {Component} from 'react';

import ItemsList from './components/ItemsList';

import './scss/index.scss';

class App extends Component {
	render() {
		return (
			<ItemsList items={items}/>
		);
	}
}

export default App;