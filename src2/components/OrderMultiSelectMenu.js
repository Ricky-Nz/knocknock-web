import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';

class OrderMultiSelectMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selects: props.viewer.orderStatus
		};
	}
	onCheck = (event, checked) => {
		let newSelect;
		if (this.props.viewer.orderStatus.length === this.state.selects) {
			newSelect = [];
		} else {
			newSelect = this.props.viewer.orderStatus;
		}

		this.setState({selects: newSelect});
		this.props.onSelect(newSelect);
	}
	onChange = (event, value) => {
		let newSelect;
		const selects = this.state.selects;
		const index = selects.indexOf(value);

		if (index >= 0) {
			newSelect = [...selects.slice(0, index), ...selects.slice(index + 1)];
		} else {
			newSelect = [...selects, value];
		}

		this.setState({selects: newSelect});
		this.props.onSelect(newSelect);
	}
	render() {
		const selects = this.state.selects;

		return (
		  <Menu onChange={this.onChange}>
		    <div className='padding'>
		    	<Checkbox label='Selct All' checked={this.props.viewer.orderStatus.length===selects.length}
		    		onCheck={this.onCheck}/>
		    </div>
				{
					this.props.viewer.orderStatus.map((status, index) =>
						<MenuItem key={index} value={status} primaryText={status}
							rightIcon={(selects&&selects.indexOf(status)>=0)?<IconChecked/>:<IconUnCheck/>}/>)
				}
		  </Menu>
		);
	}
}

OrderMultiSelectMenu.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(OrderMultiSelectMenu, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				orderStatus
			}
		`
	}
});