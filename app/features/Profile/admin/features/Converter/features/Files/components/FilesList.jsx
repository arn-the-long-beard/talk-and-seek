import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Save from 'material-ui/svg-icons/content/save'
import Convert from 'material-ui/svg-icons/action/extension'
import {blue700, transparent} from 'material-ui/styles/colors'
const MyFiles = ({
                    files, download, condition
                  }) => (
                    <Paper zDepth={1}>
                      <section>
                        <aside>
                          <h3>Converted files</h3>
                          <ul>
                            {
files
            ? files.map(f =>
              condition(f)
                ? <li key={f.content._id}><a href='#' onClick={((e) => download(e, f.content._id))} download='filename'>{f.content.filename}- {f.content.chunkSize} bytes</a> <Convert color={blue700} onClick={((e) => convert(e, f.content._id))} /> </li>
            : null)
         : null }
                          </ul>
                        </aside>
                      </section>
                    </Paper>
)

export default MyFiles
