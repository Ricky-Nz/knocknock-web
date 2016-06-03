import React, { Component, PropTypes } from 'react';
import DropZone from 'react-dropzone';

class DropZoneView extends Component {
	state = {
		showError: false
	}
	getFile = () => {
		if (this.state && this.state.file) {
			if (this.state.showError) {
				this.setState({showError: false});
			}
			return this.state.file;
		}

		if (this.props.required) {
			this.setState({showError: true});
		}
	}
	onDrop = (files) => {
		if (files&&files[0]) {
			this.setState({file: files[0]});
		}
	}
	render() {
		const { className, style, multiple, accept, imageUrl } = this.props;
		const preview = (this.state.file&&this.state.file.preview)||imageUrl;

		return (
		  <DropZone className={className} style={styles.container}
		  	multiple={multiple} accept={accept} onDrop={this.onDrop}>
		    {preview?<img style={{...style, ...styles.img}} src={preview}/>:
		    	(this.state.showError?<div style={styles.errorText}>you must select a file</div>
		    		:<div>Try dropping some files here, or click to select files to upload.</div>)}
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
	},
	errorText: {
		color: 'red'
	}
}

DropZoneView.proptypes = {
	imageUrl: PropTypes.string,
	required: PropTypes.bool
};

export default DropZoneView;