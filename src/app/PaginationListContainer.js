import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getWorker } from './actions';
import PaginationList from './PaginationList';

const selectCurrentPage = state => state.pagination.currentPage;

const selectPageSize = state => state.pagination.pageSize;

const selectDatas = state => state.paginationData;

const mapStateToProps = createSelector(
	selectCurrentPage,
	selectPageSize,
	selectDatas,
	(currentPage, pageSize, datas) =>
		({currentPage, pageSize, datas})
);

const mapActionToProps = (dispatch, {role}) => ({
	onLoad: (page, pageSize) => {
		switch(role) {
			case 'worker':
				dispatch(getWorker(page, pageSize));
				break;
		}
	}
});

export default connect(mapStateToProps, mapActionToProps)(PaginationList);