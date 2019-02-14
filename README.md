# basic-quasar-loading-saving-vuex
A basic app that populates vuex from saved json file and resaves the file on addition.

## Requirements
Node, Cordova, Android

#Installation
`npm install`

#Running
`quasar dev -m cordova -T android`
tap the + to add new post

#What's the rundown?
So it's got Vuex and Vue Router, it routes to 3 different pages (the homepage, the new post page, and the post page); Vuex keeps state of all posts and also allows for syncing with json file.
You can find all the code in the src folder, all the saving/syncing code in the src/store/index.js file, etc.
Would recommend playing around with Quasar and getting to know that a little.