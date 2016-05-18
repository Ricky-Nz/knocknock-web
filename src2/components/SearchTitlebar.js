import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { SearchBar } from '../widgets';

class SearchTitlebar extends Component {
	render() {
		return (
			<Paper zDepth={2}>
				<Toolbar>
					<ToolbarGroup className='padding-horizontal' firstChild={true}>
			    	<ToolbarTitle text=''/>
			    	<SearchBar onSearch={this.props.onSearch}/>
			    </ToolbarGroup>
			    <ToolbarGroup className='padding-horizontal' lastChild={true}>
			    	{this.props.lastChild}
			    </ToolbarGroup>
				</Toolbar>
			</Paper>
		);
	}
}

SearchTitlebar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	lastChild: PropTypes.element
};

export default SearchTitlebar;