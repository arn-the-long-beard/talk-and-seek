import React from 'react'
import PropTypes from 'prop-types'
import MicrophoneOn from 'material-ui/svg-icons/av/mic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import {blue500} from 'material-ui/styles/colors'
import VoiceRecognition from '../lib/VoiceRecognition.js'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import FloatingActionButton from 'material-ui/FloatingActionButton'

const TalkForm = ({
                      record,
                    start, onEnd, errors, onResult, result}) => (
                      <section className={styles.container}>
                        <h4 className={styles.titleSection}> Talk to me <CommunicationChatBubble color={blue500} /></h4>
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
                        <br />
                        <span className={styles.label}> I understood :
                          {result &&
                          <i className={styles.result} >{result}</i> }</span>
                      </section>
  )
TalkForm.contextTypes = {
  insertCss: PropTypes.func
}
TalkForm.propTypes = {
  onResult: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired
}
export default withStyles(styles)(TalkForm)
