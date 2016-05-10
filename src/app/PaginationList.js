import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Pagination from './PaginationContainer';

class PaginationList extends Component {
	componentDidMount() {
		this.props.onLoad(this.props.currentPage,
			this.props.pageSize, this.props.role);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.currentPage !== this.props.currentPage
			|| nextProps.pageSize !== this.props.pageSize
			|| nextProps.role !== this.props.role) {
			this.props.onLoad(nextProps.currentPage,
				nextProps.pageSize, nextProps.role);
		}
	}
	render() {
		const {datas, bindItem} = this.props;

		return (
			<div className='flex flex-fill'>
				<List className='scroll'>
					{datas&&datas.map((data, index) => bindItem(data, index))}
				</List>
				<Pagination/>
			</div>
		);
	}
}

PaginationList.propTypes = {
	role: PropTypes.oneOf(['worker', 'client', 'admin']),
	currentPage: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	datas: PropTypes.array,
	onLoad: PropTypes.func.isRequired,
	bindItem: PropTypes.func.isRequired
};

export default PaginationList;