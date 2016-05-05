import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconFirst from 'material-ui/svg-icons/navigation/first-page';
import IconLast from 'material-ui/svg-icons/navigation/last-page';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconRight from 'material-ui/svg-icons/navigation/chevron-right';

class Pagination extends Component {
	componentDidMount() {
		this.props.onNavigate(this.props.currentPage, this.props.pageSize);
	}
	render() {
		const {navLength, currentPage, totalPage, pageSize,
			onChangePageSize, onNavigate} = this.props;
		const startPage = Math.floor((currentPage - 1) / navLength) * navLength + 1;
		const endPage = Math.min(totalPage, startPage + navLength - 1);
		const hasPrevPage = startPage > 1;
		const hasNextPage = endPage !== totalPage;
		let pageButtons = [];
		for (let index = startPage; index <= endPage; index++) {
			pageButtons.push(<FlatButton labelStyle={{padding: 0}} key={index}
				label={index} primary={currentPage===index} onClick={() => onNavigate(index, pageSize)}/>)
		}

		return (
			<div className='flex flex-row flex-space-between'>
				<div className='flex flex-row'>
					<IconButton disabled={!hasPrevPage} onClick={() => onNavigate(1, pageSize)}><IconFirst/></IconButton>
					<IconButton disabled={!hasPrevPage} onClick={() => onNavigate(startPage - 1, pageSize)}><IconLeft/></IconButton>
					{pageButtons}
					<IconButton disabled={!hasNextPage} onClick={() => onNavigate(endPage + 1, pageSize)}><IconRight/></IconButton>
					<IconButton disabled={!hasNextPage} onClick={() => onNavigate(totalPage, pageSize)}><IconLast/></IconButton>
				</div>

		    <DropDownMenu value={pageSize} onChange={(event, key, value) => onNavigate(1, value)}>
		      <MenuItem value={5} primaryText='5' />
		      <MenuItem value={10} primaryText='10' />
		      <MenuItem value={20} primaryText='20' />
		      <MenuItem value={30} primaryText='30' />
		    </DropDownMenu>
			</div>
		);
	}
}

Pagination.propTypes = {
	navLength: PropTypes.number,
	currentPage: PropTypes.number.isRequired,
	totalPage: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onNavigate: PropTypes.func.isRequired
};

Pagination.defaultProps = {
	navLength: 5
};

export default Pagination;