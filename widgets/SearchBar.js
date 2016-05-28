import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class SearchBar extends Component {
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
	}
	render() {
		return (
			<TextField name='search' hintText='search' onChange={this.onChange}/>
		);
	}
}

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired
};

export default SearchBar;