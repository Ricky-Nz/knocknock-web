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
			limit: value,
			page: 1
		});
	}
	onNext = () => {
		this.props.onNavigate({
			page: this.props.pagination.page + 1,
			limit: this.props.pagination.limit
		});
	}
	onPrevious = () => {
		this.props.onNavigate({
			page: this.props.pagination.page - 1,
			limit: this.props.pagination.limit
		});
	}
	onLast = () => {
		this.props.onNavigate({
			page: this.props.pagination.totalPage,
			limit: this.props.pagination.limit
		});
	}
	onFist = () => {
		this.props.onNavigate({
			page: 1,
			limit: this.props.pagination.limit
		});
	}
	render() {
		const { page, limit, totalPage } = this.props.pagination;
		console.log(this.props.pagination);
		const canBack = page > 1;
		const canNext = page < totalPage;

		return (
			<div className='flex flex-row flex-align-center'>
		    <DropDownMenu value={limit} onChange={this.onPageSizeChange}>
		      <MenuItem value={10} primaryText='10' />
		      <MenuItem value={25} primaryText='25' />
		      <MenuItem value={50} primaryText='50' />
		    </DropDownMenu>
				<IconButton disabled={!canBack} onClick={this.onFist}><IconFirst/></IconButton>
				<IconButton disabled={!canBack} onClick={this.onPrevious}><IconLeft/></IconButton>
				<IconButton disabled={!canNext} onClick={this.onNext}><IconRight/></IconButton>
				<IconButton disabled={!canNext} onClick={this.onLast}><IconLast/></IconButton>
			</div>
		);
	}
}

PaginationBar.propTypes = {
	onNavigate: PropTypes.func.isRequired
};

export default Relay.createContainer(PaginationBar, {
	fragments: {
		pagination: () => Relay.QL`
			fragment on Pagination {
				page
				limit
				totalPage
			}
		`
	}
});

