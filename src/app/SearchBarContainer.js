import { connect } from 'react-redux';
import { search } from './actions';
import { SearchBar } from '../../widgets';

const mapActionToProps = dispatch => ({
	onSearch: (text) => {
		dispatch(search(text));
	}
});

export default connect(null, mapActionToProps)(SearchBar);