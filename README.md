# README #
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/arn-the-long-beard/talk-and-seek.svg?branch=master)](https://travis-ci.org/arn-the-long-beard/talk-and-seek)
[![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat)](https://mysterious-atoll-69963.herokuapp.com/talk)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/dominictarr/stability)

 :warning: Works only on Chrome

Speak to the App and find information  :microphone: [Here](https://mysterious-atoll-69963.herokuapp.com/talk)

 


## Stability

Stable: Expect patches, possible features additions.

### Introduction ###

Talk to Speech API ------ Works only on Chrome

* Version
1.0.0


- The web browser may tell you that the page tries to load unsafe script (the http Wikipedia Request) , just click on the small shield on the url bar
- You will get  :warning: "Mixed Content: The page at 'https://mysterious-atoll-69963.herokuapp.com/talk' was loaded over HTTPS, but requested an insecure resource 'http://en.wikipedia.org/w/api.php?list=search&srsearch=Iceland&srlimit=40&format=json&action=query&redirects=&origin=*'. This content should also be served over HTTPS. '"
- Heroku does not like when browser does http request to external server ( Which is comprehensible for security reasons )
- The SSR for 40 results is slow and sometimes gives a timeout error

### How to use ###

**Download**

    git clone git clone https://github.com/arn-the-long-beard/talk-and-seek.git

**Go to the directory**
   
    cd talk-and-seek
    
**Install Npm Packages**
    
    npm install 
    
**Start the dev server**
  
    npm start
    
**For running the production server**

    npm run start_prod  
  
**In case you need to build** 

    npm run build   
    
    
### Comments ####
 
 It is working on http because of the wikiJs. 
 
 Usually I run everything on https by using http2/spdy.
 
 You can change development.js and the page.js inside wikisj to have full https
 
 The redux store has information about the server in case of test on local network 
 
 There is also a promisesCollecteur to handle Async redux actions for injecting data and render ready html for SEO 
    
### Redux persistency and Isomorphism ###


- Here I use [react-cookie](https://github.com/bukinoshita/react-cookies) for sending the state of the wikipedia search to the server

- Then I had two possibilities for the redux store :

    - Just refresh the future hydrated client.jsx with the state from the cookie
        - The web browser ask wikipedia and do the job
        - => we can try later but Heroku will gives more warning message because of wikijs
    
    - Play isomorphism and Promises
        - => I decided to use it to make Async Promise and generate the page injected with the data  
            - Async Action
            - Async Action type
            - Use of the Promise collecteur
            - The server asks Wikipedia
            - The server injects the data and the html
            - fast delivering and SEO
         - => No warning about http request loaded server side
         - => Need to fix wikijs to https to have it clean          
           
- Every time somebody loads the page talk-and-seek, they can find their last research

    - We can still improve it and show the last talked sentence
    - Manage better the rendering ?
    - For the same key, the wikipedia gives the same list but in different orders. I do not know why, might be because of the network and the async part

I decided to use the isomorphism here just to show how it's working, but it does not make so much sense for the SEO, especially because I didn't linked it to the URL and React-router (so the Google Crawler will not find it I think)

NB : There are many possibilities for solving the same problem. What you take depends of your taste and the goal/conditions for solving the need.

Exemple : You want to reference your content better

The isomorphism can be good for it if linked to an URL like */seek/iceland
 - In the root.jsx the component is called this way : 
 
 ```javascript
 
  <Route exact path='/seeky/:key' component={Seek} />
  
 ```
 - Now just call some actions
 
 Here the Async content inside the constructor
 
  ```javascript
     constructor (props, context) {
       super(props, context)
   
       this.props.actions.getAsynContent(this.props.match.params.key)    
   }
  ```
 Here the normal action  
 
   ```javascript
 componentDidUpdate (prevProps) {
       this.props.actions.getContentIfNeeded(this.props.match.params.key)
     }
   ```
 - In this case, the server could fetch from wikipedia all the data related to iceland and inject it
 - In this case, google can crawl on the URL and read/reference the data
 
### Contribution guidelines ###

* Writing tests
* Code review

### TODO ###

 => Need to implement error handler in case of using non compatible web browser, for now the page just crash :white_check_mark:
 
 => Need to clean the package.json ; there are many node_modules the platform does not need
 
 => Need to modify the wikijs for requesting https
 
 => Change to Https after fixing wikijs
 
 => Make a new repository for the isomorphism version and rebuild this one just with web browser rendering and redux store persistency

* Other guidelines


### Community ###

* arn-the-long-beard
* Other community or team contact

Thank you very much for your previous work [grvcoelho](https://github.com/grvcoelho/react-voice-components)

Thank you very much for your checklist [thedaviddias](https://github.com/thedaviddias/Front-End-Checklist)

Feel free to ask questions and help about how to run an isomorphic React-Redux app like this