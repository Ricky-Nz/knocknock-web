import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { navigate } from './actions';
import { Pagination } from '../../widgets';

const selectCurrentPage = state => state.pagination.currentPage;

const selectTotalPage = state => state.pagination.totalPage;

const selectPageSize = state => state.pagination.pageSize;

const mapStateToProps = createSelector(
	selectCurrentPage,
	selectTotalPage,
	selectPageSize,
	(currentPage, totalPage, pageSize) =>
		({currentPage, totalPage, pageSize})
);

const mapActionToProps = (dispatch) => ({
	onNavigate: (page, pageSize) => {
		dispatch(navigate(page, pageSize));
	}
});

export default connect(mapStateToProps, mapActionToProps)(Pagination);