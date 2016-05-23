import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconFirst from 'material-ui/svg-icons/navigation/first-page';
import IconLast from 'material-ui/svg-icons/navigation/last-page';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconRight from 'material-ui/svg-icons/navigation/chevron-right';

class PaginationBar extends Component {
	onPageSizeChange = (event, key, value) => {
		this.props.onNavigate({
			first: value
		});
	}
	onNext = () => {
		this.props.onNavigate({
			first: this.props.first,
			after: this.props.endCursor
		});
	}
	onPrevious = () => {

	}
	onLast = () => {

	}
	onFist = () => {
		this.props.onNavigate({
			first: this.props.first
		});
	}
	render() {
		const { first, after, hasNextPage } = this.props;

		return (
			<div className='flex flex-row flex-align-center'>
		    <DropDownMenu value={first} onChange={this.onPageSizeChange}>
		      <MenuItem value={10} primaryText='10' />
		      <MenuItem value={25} primaryText='25' />
		      <MenuItem value={50} primaryText='50' />
		    </DropDownMenu>
				<IconButton disabled={!after} onClick={this.onFist}><IconFirst/></IconButton>
				<IconButton disabled={!after} onClick={this.onPrevious}><IconLeft/></IconButton>
				<IconButton disabled={!hasNextPage} onClick={this.onNext}><IconRight/></IconButton>
				<IconButton disabled={!hasNextPage} onClick={this.onLast}><IconLast/></IconButton>
			</div>
		);
	}
}

PaginationBar.propTypes = {
	first: PropTypes.number,
	after: PropTypes.string,
	startCursor: PropTypes.string,
	endCursor: PropTypes.string,
	hasNextPage: PropTypes.bool,
	onNavigate: PropTypes.func.isRequired
};

export default PaginationBar;

