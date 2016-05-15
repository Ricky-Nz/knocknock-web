import React, { Component, PropTypes } from 'react';
import DropZone from 'react-dropzone';

class DropZoneView extends Component {
	getFile = () => {
		if (this.state) {
			return this.state.file;
		}
	}
	onDrop = (files) => {
		if (files&&files[0]) {
			this.setState({file: files[0]});
		}
	}
	render() {
		const { className, multiple, accept, imageUrl } = this.props;
		const preview = (this.state&&this.state.file.preview)||imageUrl;

		return (
		  <DropZone className={className} style={styles.container} multiple={multiple} accept={accept} onDrop={this.onDrop}>
		    {preview?<img style={styles.img} src={preview}/>:<div>Try dropping some files here, or click to select files to upload.</div>}
		  </DropZone>
		);
	}
}

const styles = {
	container: {
		padding: 16,
		borderStyle: 'dashed'
	},
	img: {
		width: '100%'
	}
}

DropZoneView.proptypes = {
	imageUrl: PropTypes.string
};

export default DropZoneView;