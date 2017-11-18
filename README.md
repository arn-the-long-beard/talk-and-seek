# README #
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
 
 :warning: Works only on Chrome

Speak to the App and find information

Thank you very much for your previous work [grvcoelho](https://github.com/grvcoelho/react-voice-components)

Thank you very much for your checklist [thedaviddias](https://github.com/thedaviddias/Front-End-Checklist)

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

There is also a Promise promisesCollecteur to handle Async redux actions for injecting data and render ready html for SEO if we need


* Configuration

>1 Dev config :

    npm start
or
    
    npm start_dev

the package.json is a mess because I took my core platform I developped the 4 last month and I did not have time to clean it

>2 Prod config :

For building for production :
    
    npm build

For running the production server :

    npm start_prod
    
The production version does not work. After few hours on the problem, I understood that there is something wrong with ui-material. I will try later to move to the beta and see if it fixe the issue

I didn't not have the time to provide a production version
    
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
 
 => Need to fix the production version. 

* Other guidelines


### Community ###

* Arnaud Menant alias the "Security Freak" from SportIn : arn.menant@gmail.com
* Other community or team contact

Feel free to ask questions and help about how to run an isomorphic React-Redux app like this