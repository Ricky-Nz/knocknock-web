import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const CategorySelectMenu = ({defaultAll, selectId, connection, onSelect}) => (
  <SelectField value={selectId||null}
  	onChange={(event, index, value) => onSelect(value)}>
  	<MenuItem value={null} primaryText={defaultAll?'All':'None'}
  		secondaryText={defaultAll?'全部':null} label={defaultAll?'All':'None'}/>
  	<Divider />
  	{
  		connection.edges.map(({node}, index) =>
  			<MenuItem key={index} value={node.id} primaryText={node.nameEn}
  				secondaryText={node.nameCn} label={node.nameEn}/>)
  	}
  </SelectField>
);

CategorySelectMenu.propTypes = {
	defaultAll: PropTypes.bool,
	selectId: PropTypes.string,
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(CategorySelectMenu, {
	fragments: {
		connection: () => Relay.QL`
			fragment on CategoryConnection {
				edges {
					node {
						id
						nameCn
						nameEn
					}
				}
			}
		`
	}
});