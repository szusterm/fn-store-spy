import React, {Component} from 'react';

import ItemsList from './components/ItemsList';

import './scss/index.scss';

const items = [
	{
		name: 'Archetype',
		price: 2000,
		rarity: 'legendary',
		imgSrc: 'https://image.fnbr.co/outfit/5b562a36781e1981e5378f55/icon.png'
	},
	{
		name: 'Commando',
		price: 800,
		rarity: 'uncommon',
		imgSrc: 'https://image.fnbr.co/outfit/5ab1b7169116ac5688c6d7cc/icon.png'
	},
	{
		name: 'Half Shell',
		price: 800,
		rarity: 'rare',
		imgSrc: 'https://image.fnbr.co/glider/5ab17b545f957f27504aa52b/icon.png'
	},
	{
		name: 'Archetype',
		price: 2000,
		rarity: 'legendary',
		imgSrc: 'https://image.fnbr.co/outfit/5b562a36781e1981e5378f55/icon.png'
	}
];

class App extends Component {
	render() {
		return (
			<ItemsList items={items}/>
		);
	}
}

export default App;