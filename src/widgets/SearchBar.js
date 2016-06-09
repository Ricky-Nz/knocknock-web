import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class SearchBar extends Component {
	state = {
		value: ''
	};
	onChange = (event) => {
		const value = event.target.value;

		if (this.props.delay > 0) {
			if (this.pennding) {
				clearTimeout(this.pennding);
				this.pennding = null;
			}

			this.pennding = setTimeout(() => {
				this.props.onSearch(value||'');
				this.pennding = null;
			}, 500);
		} else {
			this.props.onSearch(value||'');
		}

		this.setState({value})
	}
	render() {
		const { onSearch, delay, ...otherProps } = this.props;
		return (
			<TextField name='search' {...otherProps} value={this.state.value}
				onChange={this.onChange}/>
		);
	}
}

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	delay: PropTypes.number
};

SearchBar.defaultProps = {
	delay: 300
};

export default SearchBar;