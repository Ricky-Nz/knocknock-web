import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';

class OrderStatusMultiSelectMenu extends Component {
	constructor(props) {
		super(props);
		const selects = props.viewer.orderStatus.map(status => status.id);
		this.state = { selects };
		props.onSelect(selects);
	}
	onCheck = (event, checked) => {
		let newSelect;
		
		if (this.props.viewer.orderStatus.length === this.state.selects.length) {
			newSelect = [];
		} else {
			newSelect = this.props.viewer.orderStatus.map(status => status.id);
		}

		this.setState({selects: newSelect});
		this.props.onSelect(newSelect);
	}
	onChange = (event, value) => {
		if (!value) return;

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
					this.props.viewer.orderStatus.map(({status, id}, index) =>
						<MenuItem key={index} value={id} primaryText={status}
							rightIcon={(selects&&selects.indexOf(id)>=0)?<IconChecked/>:<IconUnCheck/>}/>)
				}
		  </Menu>
		);
	}
}

OrderStatusMultiSelectMenu.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(OrderStatusMultiSelectMenu, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				orderStatus {
					id
					status
				}
			}
		`
	}
});