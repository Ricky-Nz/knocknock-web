import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getPageData } from './actions';
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

const mapActionToProps = (dispatch) => ({
	onLoad: (page, pageSize, role) => {
		dispatch(getPageData(page, pageSize, role));
	}
});

export default connect(mapStateToProps, mapActionToProps)(PaginationList);