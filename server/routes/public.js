
const express = require('express')
const router = new express.Router()
// Imports the Google Cloud client library
// const speech = require('@google-cloud/speech');
// const fs = require('fs');
//
// // Your Google Cloud Platform project ID
// const projectId = 'talk-and-seek-1510136935941';
//
// // Creates a client
// const client = new speech.SpeechClient({
//   projectId: projectId,
// });

// The name of the audio file to transcribe
// const fileName = './resources/audio.raw';
//
// // Reads a local audio file and converts it to base64
// const file = fs.readFileSync(fileName);
// const audioBytes = file.toString('base64');
//
// // The audio file's encoding, sample rate in hertz, and BCP-47 language code
// const audio = {
//   content: audioBytes,
// };
// const config = {
//   encoding: 'LINEAR16',
//   sampleRateHertz: 16000,
//   languageCode: 'en-US',
// };
// const request = {
//   audio: audio,
//   config: config,
// };
router.post('/record', (req, res) => {

})



module.exports = router
