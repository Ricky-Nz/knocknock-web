import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ClothInputAutoComplete from './ClothInputAutoComplete';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconAdd from 'material-ui/svg-icons/content/add';

class OrderItemEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderItems: props.orderItems||[]
		};
	}
	onSelectCloth = (value) => {
		const index = this.state.orderItems.findIndex(cloth => cloth.id === value.productId);
		if (index < 0) {
			const newItems = [{...value, quantity: 1, washType: 'wash'}, ...this.state.orderItems];
			this.setState({orderItems: newItems});
			this.props.onChange(newItems);
		} else {
			this.onAddItem(index);
		}
	}
	onUpdateWashType = (index, washType) => {
		const orderItems = this.state.orderItems;
		const newItems = [...orderItems.slice(0, index),
			{...orderItems[index], washType}, ...orderItems.slice(index + 1)];
		this.setState({orderItems: newItems});
		this.props.onChange(newItems);
	}
	onAddItem = (index) => {
		const orderItems = this.state.orderItems;
		let quantity = orderItems[index].quantity + 1;

		if (quantity > 500) return;

		const newItems = [...orderItems.slice(0, index),
			{...orderItems[index], quantity}, ...orderItems.slice(index + 1)];
		this.setState({orderItems: newItems});
		this.props.onChange(newItems);
	}
	onRemoveItem = (index) => {
		const orderItems = this.state.orderItems;
		let quantity = orderItems[index].quantity - 1;

		if (quantity < 0) return;

		const newItems = [...orderItems.slice(0, index),
			{...orderItems[index], quantity}, ...orderItems.slice(index + 1)];
		this.setState({orderItems: newItems});
		this.props.onChange(newItems);
	}
	render() {
		return (
			<div>
				<ClothInputAutoComplete viewer={this.props.viewer}
					onSelect={this.onSelectCloth} fullWidth={true}/>
				{
					this.state.orderItems.map((item, index) =>
						<div key={index} className='flex flex-row flex-align-center padding-horizontal'>
							<Avatar src={item.cloth.imageUrl}/>
							<div className='flex flex-fill'>
					      <DropDownMenu value={item.washType} autoWidth={true}
					      	onChange={(event, index, value) => this.onUpdateWashType(index, value)}>
					        <MenuItem value='wash' primaryText='Wash&Iron' />
					        <MenuItem value='dry' primaryText='Dry Clean' />
					        <MenuItem value='iron' primaryText='Iron' />
					      </DropDownMenu>
					      <p style={styles.secondaryText}>{item.cloth&&`${item.cloth.nameEn} (${item.cloth.nameCn})`}</p>
							</div>
							<div className='flex flex-row flex-align-center'>
								<IconButton onTouchTap={() => this.onAddItem(index)}><IconAdd/></IconButton>
								<p>{item.quantity}</p>
								<IconButton onTouchTap={() => this.onRemoveItem(index)}><IconRemove/></IconButton>
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

OrderItemEditor.propTypes = {
	orderItems: PropTypes.arrayOf(PropTypes.object),
	onChange: PropTypes.func.isRequired
};

const styles = {
	secondaryText: {
		paddingLeft: 24
	}
};

export default Relay.createContainer(OrderItemEditor, {
	initialVariables: {
		loadItems: false
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${ClothInputAutoComplete.getFragment('viewer')}
			}
		`
	}
});