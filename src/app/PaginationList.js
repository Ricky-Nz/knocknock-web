import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Pagination from './PaginationContainer';

class PaginationList extends Component {
	componentDidMount() {
		this.props.onLoad(this.props.currentPage, this.props.pageSize);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.currentPage !== this.props.currentPage
			|| nextProps.pageSize !== this.props.pageSize) {
			this.props.onLoad(nextProps.currentPage, nextProps.pageSize);
		}
	}
	render() {
		const {datas, onLoad, bindItem} = this.props;

		return (
			<div className='flex flex-fill'>
				<List className='scroll'>
					{datas&&datas.map((data, index) => bindItem(data, index))}
				</List>
				<Paper className='margin-horizontal'>
					<Pagination/>
				</Paper>
			</div>
		);
	}
}

PaginationList.propTypes = {
	role: PropTypes.oneOf(['worker']),
	currentPage: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	datas: PropTypes.array,
	onLoad: PropTypes.func.isRequired,
	bindItem: PropTypes.func.isRequired
};

export default PaginationList;