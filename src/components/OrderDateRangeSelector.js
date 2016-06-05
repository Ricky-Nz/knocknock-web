import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class OrderDateRangeSelector extends Component {
	state = {
		selectType: 'All',
		after: null,
		before: null
	}
	handleChange = (event, index, selectType) => {
		let after = this.state.after;
		let before = this.state.before;
		if (selectType === 'Between' && this.state.after && this.state.before) {
			this.props.onSelect(this.state.after, this.state.before)
		} else if (selectType === 'After' && this.state.after) {
			this.props.onSelect(this.state.after, null);
			before = null;
		} else if (selectType === 'Before' && this.state.before) {
			this.props.onSelect(null, this.state.before);
			after = null;
		} else if (selectType === 'All') {
			this.props.onSelect(null, null);
			before = null;
			after = null;
		}

		this.setState({selectType, after, before});
	}
	onAfterChange = (_, date) => {
		this.setState({after: date});
		if (this.state.selectType !== 'Between') {
			this.props.onSelect(date, null);
		} else if (this.state.before) {
			this.props.onSelect(date, this.state.before);
		}
	}
	onBeforeChange = (_, date) => {
		this.setState({before: date});
		if (this.state.selectType !== 'Between') {
			this.props.onSelect(null, date);
		} else if (this.state.after) {
			this.props.onSelect(this.state.after, date);
		}
	}
	render() {
		const selectType = this.state.selectType;
		const range = selectType === 'Between';
		const all = selectType === 'All';

		return (
			<div className='flex padding-horizontal'>
        <SelectField floatingLabelText='Pickup Date' value={selectType} onChange={this.handleChange}>
        	<MenuItem value='All' primaryText='All' />
          <MenuItem value='After' primaryText='After' />
          <MenuItem value='Before' primaryText='Before' />
          <MenuItem value='Between' primaryText='Between' />
        </SelectField>
        {!all&&(range||selectType==='After')&&
        	<DatePicker hintText={(range?'After':selectType).toLowerCase()} mode='landscape' onChange={this.onAfterChange}/>
        }
				{!all&&(range||selectType==='Before')&&
					<DatePicker hintText={(range?'Before':selectType).toLowerCase()} mode='landscape' onChange={this.onBeforeChange}/>
				}
			</div>
		);
	}
}

OrderDateRangeSelector.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default OrderDateRangeSelector;