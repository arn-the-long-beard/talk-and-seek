import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'material-ui/Card'
import MicrophoneOn from 'material-ui/svg-icons/av/mic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import VoiceRecognition from '../lib/VoiceRecognition.js'
import { FloatingActionButton } from 'material-ui'

const TalkForm = ({
                      record,
                    start, onEnd, errors, onResult, result}) => (
                      <Card >
                        <div className={styles.container}>
                          <h4 className={styles.h1}>Ask for information , ex : " Tell me about Norway "</h4>
                          <div>
                            {record && (
                            <VoiceRecognition
                              onStart={start}
                              onEnd={onEnd}
                              continuous={false}
                              onResult={onResult}
                              lang='en-US'
                                />
                              )}
                          </div>
                          {errors.summary && <p className='error-message'>{errors.summary}</p>}
                          <div>
                            <FloatingActionButton
                              disabled={record}
                              onClick={start}>
                              <MicrophoneOn />
                            </FloatingActionButton>
                          </div>
                          {result &&
                          <div className={styles.result} >{result}</div> }
                        </div>
                      </Card>
  )
TalkForm.contextTypes = {
  insertCss: PropTypes.func
}
export default withStyles(styles)(TalkForm)
