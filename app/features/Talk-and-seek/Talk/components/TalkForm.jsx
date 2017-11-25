import React from 'react'
import PropTypes from 'prop-types'
import MicrophoneOn from 'material-ui/svg-icons/av/mic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import {blue500} from 'material-ui/styles/colors'
import { VoiceRecognition } from 'react-voice-components'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import FloatingActionButton from 'material-ui/FloatingActionButton'
const TalkForm = ({
                      record,
                    start, onEnd, errors, onResult, result, compatibility}) => (
                      <section className={styles.container}>
                        <h4 className={styles.titleSection}> Talk to me <CommunicationChatBubble color={blue500} /></h4>
                        <div>
                          {record && compatibility && (
                            <VoiceRecognition
                              onStart={start}
                              onEnd={onEnd}
                              continuous={false}
                              onResult={onResult}
                              lang='en-US'
                                />
                              )}
                        </div>
                        <div>
                          <FloatingActionButton
                            disabled={record || !compatibility}
                            onClick={start}>
                            <MicrophoneOn />
                          </FloatingActionButton>
                        </div>
                        <br />
                        <span className={styles.label}> I understood :
                          {result &&
                          <i className={styles.result} >{result}</i> }</span>
                        {errors && !compatibility &&
                        <div>
                          <p className={styles.errors}>{errors}</p>
                          <a href='https://www.google.com/chrome/browser/desktop/index.html'> Google Chrome</a>
                        </div>}
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
