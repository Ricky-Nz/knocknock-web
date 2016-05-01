import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { logIn } from './actions';
import LoginPage from './LoginPage';

const selectToken = state => state.token;

const mapStateToProps = createSelector(
	selectToken,
	(token) => ({token})
);

const mapActionToProps = dispatch => ({
	logIn: (args) => {
		dispatch(logIn(args));
	}
});

export default connect(mapStateToProps, mapActionToProps)(LoginPage);