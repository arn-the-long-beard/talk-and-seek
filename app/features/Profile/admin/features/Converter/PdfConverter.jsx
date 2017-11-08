import React, { Component} from 'react'

import Snackbar from 'material-ui/Snackbar';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as convertPDFActions from './actions'

import PDFDropZone from './components/PDFDropZone'
import MyPersonalFiles from './features/Files/MyPersonalFiles'


class PdfConverter extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.maxSize = props.maxSize ? props.maxSize : 2097152

    this.text = props.text ? props.text : `Drop your PDF here. Max ${this.maxSize} `
    this.state = {
files:[],
      message : '',
      open: false
    }
    this.onDrop = this.onDrop.bind(this)
    this.save = this.save.bind(this)
    // this.context.socket.emit('getfile',this.props.university_id)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props. converter !== nextProps.converter) {
  // this.props.actionsUser.updateUserFiles()
    //  this.props.actionsUser.invalidateUser()
    }
  }
  componentDidMount () {
  //  this.props.actions.getUniversityAdminIfNeeded(this.props._id)
    if(this.props.converter.didUploaded
    ){
    //  this.props.actions.resetConverter()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props. converter !== prevProps.converter) {
   //  this.props.actionsUser.updateUserFiles()

    }
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  onDrop (files) {

    if (files.length === 0) {
      this.setState({
        open: true,
        message: 'No files found!'
      });
      return
    }
files.forEach(file => {

    if (file.size > this.maxSize) {

      this.setState({
        open: true,
        message: `File: ${file.name} size: ${file.size} > max: ${this.maxSize} bytes`
      });
      return
    }
    const reader = new FileReader();

      reader.onload = () => {
        console.log(event.target.result)
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.readAsBinaryString(file);

      };
})

this.props.actions.AddFilesForConversion(files)
  /*  this.setState({
      files: files
    })*/
  }
  save (event) {
    event.preventDefault()

 this.props.actions.uploadPDFs(this.props.converter.task.items.filter(file => !file.isConverted && !file.isUploaded))


  }




  render () {
    return (
      <div>

        <PDFDropZone
        maxSize={this.maxSize}
        onDrop={this.onDrop}
        text={this.text}
        files={this.props.converter.task.items}
        save={this.save}
      />
        <MyPersonalFiles />
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    )
  }
}
function mapStateToProps (state) {

const {converter} = state.profile.myProfile
  return {converter}
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(convertPDFActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PdfConverter)


