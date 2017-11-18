# README #
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/arn-the-long-beard/talk-and-seek.svg?branch=master)](https://travis-ci.org/arn-the-long-beard/talk-and-seek)
[![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat)](https://mysterious-atoll-69963.herokuapp.com/talk)
 
 :warning: Works only on Chrome

Speak to the App and find information  :microphone: [Here](https://mysterious-atoll-69963.herokuapp.com/talk)

 
The web browser may tell you that the page tries to load unsafe script (the http Wikipedia Request) 
 

### Intropduction ###

Talk to Speech API ------ Works only on Chrome

* Version
1.0.0

### How to use ###

Download

    git clone git clone https://github.com/arn-the-long-beard/talk-and-seek.git

Go to the directory
   
    cd talk-and-seek
    
Install Npm Packages
    
    npm install 
    
Start the server
  
    npm start
    
* Comments  

It is working on http because of the wikiJs. 

Usually I run everything on https by using http2/spdy.

You can change development.js and the page.js inside wikisj to have full https

The redux store has information about the server in case of test on local network 

There is also a promisesCollecteur to handle Async redux actions for injecting data and render ready html for SEO if we need


* Configuration

>1 Dev config :

    npm start
or
    
    npm run start_dev


>2 Prod config :

For building for production :
    
    npm run build

For running the production server :

    npm run start_prod
    
    
##### For the production ( ie for the upload on an hosting server)
* Dependencies
* Database configuration
* How to run tests
( not set yet)
    npm test
* Deployment instructions


For building platform for production :
    
    npm build

For running the production server :

    npm start_prod

### Contribution guidelines ###

* Writing tests
* Code review

### TODO ###
 => Need to implement error handler in case of using non compatible web browser, for now the page just crash
 
 => Need to clean the package.json ; there are many node_modules the platform does not need
 
 => Need to modify the wikijs for requesting https
 
 => Change to Https after fixing wikijs

* Other guidelines


### Community ###

* Arnaud Menant alias the "Security Freak" from SportIn : arn.menant@gmail.com
* Other community or team contact

Thank you very much for your previous work [grvcoelho](https://github.com/grvcoelho/react-voice-components)

Thank you very much for your checklist [thedaviddias](https://github.com/thedaviddias/Front-End-Checklist)

Feel free to ask questions and help about how to run an isomorphic React-Redux app like this