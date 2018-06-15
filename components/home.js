
import React, { Component } from 'react';
import {render} from 'react-dom';

export default class Home extends Component {

	componentDidMount() {

		console.log('componentDidMount ')
	}

	componentWillUpdate() {

		console.log('componentWillUpdate ')
	}

	componentDidUpdate () {

		console.log('componentDidUpdate  ')
	}

	handleClick() {

		alert('click!')
	}
	

	render() {
		return <div>
			<h3>Home Page!</h3>
			<ul>
				<li onClick={this.handleClick}>点我看看</li>
			</ul>
		</div>;
	}
}
