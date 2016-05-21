import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class SearchBar extends Component {
	state = {
		value: ''
	};
	onChange = (event) => {
		if (this.pennding) {
			clearTimeout(this.pennding);
			this.pennding = null;
		}

		const value = event.target.value;
		this.pennding = setTimeout(() => {
			this.props.onSearch(value);
			this.pennding = null;
		}, 500);
		this.setState({value})
	}
	render() {
		return (
			<TextField value={this.state.value} hintText='search' onChange={this.onChange}/>
		);
	}
}

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired
};

export default SearchBar;