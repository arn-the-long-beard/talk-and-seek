import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Save from 'material-ui/svg-icons/content/save'
import {blue700, transparent} from 'material-ui/styles/colors'
import Done from 'material-ui/svg-icons/action/done'
import { Paper } from 'material-ui'
const DropZone = ({
                          maxSize,
                          maxWidth,
                          maxHeight,
                          onDrop,
                          files,
                          text,
                          save
                        }) => (
                          <Paper zDepth={1} >
                            <h3>Upload your files</h3>
                            <Dropzone
                              multiple
                              accept={'application/pdf'}
        //  onDrop={(accepted, rejected) => { onChange(accepted,rejected); }}
                              onDrop={onDrop}
      >

                              <p>Set your PDFS Here</p>
                            </Dropzone>
                            <aside>
                              <ul>
                                {
              files.map(f => f.isConverted ? null
                : f.isUploaded ? <li key={f.index}>{f.content.name} - {f.content.size} bytes <Done color={blue700} /></li>
                : <li key={f.index}>{f.content.name} - {f.content.size} bytes</li>)
            }
                              </ul>
                            </aside>
                            <FloatingActionButton label='Save yours PDF and Convert' onClick={save} mini>
                              <Save />
                            </FloatingActionButton>
                          </Paper>
)

DropZone.propTypes = {
  maxSize: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default DropZone
