import React, { Component, PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconFirst from 'material-ui/svg-icons/navigation/first-page';
import IconLast from 'material-ui/svg-icons/navigation/last-page';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconRight from 'material-ui/svg-icons/navigation/chevron-right';

class PaginationBar extends Component {
	onPageSizeChange = (event, key, value) => {
		const { limit, cursor, reverse } = this.props;
		this.props.onNavigate({
			limit: value,
			cursor,
			reverse
		});
	}
	onNext = () => {
		const { limit, pageInfo } = this.props;
		this.props.onNavigate({
			limit,
			cursor: pageInfo.endCursor
		});
	}
	onPrevious = () => {
		const { limit, pageInfo } = this.props;
		this.props.onNavigate({
			limit,
			cursor: pageInfo.startCursor,
			reverse: true
		});
	}
	onLast = () => {
		const { limit } = this.props;
		this.props.onNavigate({
			limit,
			reverse: true
		});
	}
	onFist = () => {
		const { limit } = this.props;
		this.props.onNavigate({
			limit
		});
	}
	render() {
		const { limit, cursor, reverse, pageInfo } = this.props;
		console.log(pageInfo);

		const canBack = (!reverse&&!cursor)||(reverse&&!pageInfo.hasPreviousPage);
		const canNext = (reverse&&!cursor)||(!reverse&&!pageInfo.hasNextPage);

		return (
			<div className='flex flex-row flex-align-center'>
		    <DropDownMenu value={limit} onChange={this.onPageSizeChange}>
		      <MenuItem value={10} primaryText='10' />
		      <MenuItem value={25} primaryText='25' />
		      <MenuItem value={50} primaryText='50' />
		    </DropDownMenu>
				<IconButton disabled={canBack} onClick={this.onFist}><IconFirst/></IconButton>
				<IconButton disabled={canBack} onClick={this.onPrevious}><IconLeft/></IconButton>
				<IconButton disabled={canNext} onClick={this.onNext}><IconRight/></IconButton>
				<IconButton disabled={canNext} onClick={this.onLast}><IconLast/></IconButton>
			</div>
		);
	}
}

PaginationBar.propTypes = {
	onNavigate: PropTypes.func.isRequired,
	limit: PropTypes.number.isRequired,
	cursor: PropTypes.string,
	reverse: PropTypes.bool
};

export default PaginationBar;

