import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import IconEdit from 'material-ui/svg-icons/image/edit';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class AvatarEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({seletFile: null});
		}
	}
	onSelectFile = (files) => {
		if (files&&files[0]) {
			this.setState({seletFile: files[0]});
		}
  }
  getFile = () => {
  	return this.state.seletFile;
  }
	render() {
		const seletFile = this.state.seletFile;

		return (
			<div style={styles.container} className='position-relative'>
				<Avatar src={seletFile?seletFile.preview:this.props.src} size={85}/>
        <Dropzone style={styles.dropZone} multiple={false} accept='image/*' onDrop={this.onSelectFile}/>
        <IconEdit style={styles.editIcon}/>
			</div>
		);
	}
}

AvatarEditor.propTypes = {
	src: PropTypes.string
};

const styles = {
	container: {
		height: 90,
		width: 90
	},
	dropZone: {
		height: 90,
		width: 90,
		position: 'absolute',
		top: 0,
		left: 0
	},
	editIcon: {
		position: 'absolute',
		bottom: 0,
		right: 0
	}
};

export default AvatarEditor;

