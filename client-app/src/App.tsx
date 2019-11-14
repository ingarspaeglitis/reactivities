import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';


class App extends Component {
	state = {
		values: []
	}

	componentDidMount() {
		axios.get('https://localhost:44385/values')
			.then((response) => {
				this.setState({
					values: response.data	
				});
			})
	}

	render() {
		return (
			<div>
				<Header as='h2' icon='users' content='Reactivities' />
				<List>
					{
						this.state.values.map((value: any) => 
						(
							<List.Item key={ value.id }>{value.name}</List.Item>
						))
					}
				</List>			
				
			</div>
		);
	}
}

export default App;
