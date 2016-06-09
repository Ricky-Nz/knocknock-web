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
		if (this.props.first) {
			this.props.onNavigate({
				first: value
		});
		} else {
			this.props.onNavigate({
				last: value
			});
		}
	}
	onNext = () => {
		this.props.onNavigate({
			first: this.props.first||this.props.last,
			after: this.props.endCursor,
			last: 0,
			before: null
		});
	}
	onPrevious = () => {
		this.props.onNavigate({
			last: this.props.first||this.props.last,
			before: this.props.startCursor,
			first: 0,
			after: null
		});
	}
	onLast = () => {
		this.props.onNavigate({
			last: this.props.first||this.props.last,
			first: 0,
			after: null,
			before: null
		});
	}
	onFist = () => {
		this.props.onNavigate({
			first: this.props.first||this.props.last,
			last: 0,
			after: null,
			before: null
		});
	}
	render() {
		const { first, last, after, before, hasNextPage, hasPreviousPage } = this.props;
		let disableBack, disableNext;
		if (first > 0) {
			disableBack = !after;
			disableNext = !hasNextPage;
		} else {
			disableBack = !hasPreviousPage;
			disableNext = !before;
		}

		return (
			<div className='flex flex-row flex-align-center'>
		    <DropDownMenu value={first||last} onChange={this.onPageSizeChange}>
		      <MenuItem value={10} primaryText='10' />
		      <MenuItem value={50} primaryText='50' />
		      <MenuItem value={100} primaryText='100' />
		      <MenuItem value={200} primaryText='200' />
		      <MenuItem value={500} primaryText='500' />
		    </DropDownMenu>
				<IconButton disabled={disableBack} onClick={this.onFist}><IconFirst/></IconButton>
				<IconButton disabled={disableBack} onClick={this.onPrevious}><IconLeft/></IconButton>
				<IconButton disabled={disableNext} onClick={this.onNext}><IconRight/></IconButton>
				<IconButton disabled={disableNext} onClick={this.onLast}><IconLast/></IconButton>
			</div>
		);
	}
}

PaginationBar.propTypes = {
	first: PropTypes.number,
	last: PropTypes.number,
	after: PropTypes.string,
	before: PropTypes.string,
	startCursor: PropTypes.string,
	endCursor: PropTypes.string,
	hasNextPage: PropTypes.bool,
	hasPreviousPage: PropTypes.bool,
	onNavigate: PropTypes.func.isRequired
};

export default PaginationBar;

