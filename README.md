# Got Da Flow

The coolest JS flow generator in town

### Setup

1. `npm install`
2. `gulp build`
3. open `/index.html` in the browser

### Development

1.`gulp watch` (it will automatically open a browser window using browserSybc) 

### Architecture

1. I chose the flux uni-directional data flow because i am experementing with it a lot lately. Coming from the world of Backbone/Marionette, i am trying to see if all the buzz about React/Flux is justified and this project was just another good reason to try.

2. I chose also to make the Flow Generator abstracted out of the application itself as much as possible, and also for it to be self sufficient when it comes to testing it's input, throwing errors and generating output.

3. I used some ES6 syntax, but a you will see it is not comletely ES6. Sorry for the inconsistancy, but learning it is a work in progress.

4. I used a boilerplate called [react-starterify](https://github.com/Granze/react-starterify) to speed up development. It has browserSync which i find very helpful!

For some more explanations about specific choices, please see the inline Doc Blocks.

### UI

I used React-Boostrap to minimize the need to deal with styling but still make it look decent. I wanted to put more emphasis on the business logic instead of styling. If there's need for me to show off some CSS/SASS skills, it can be done of course.

### Tests

The tests suite contains for now only tests for the flow generator.
React components, actions and stores are not tested for now only because i did not have experience with testing in React, and i did not take the time to research that.

I preferred showing my ability to test on the Flow Generator utility, which is the engine of this application.

to run the tests:`mocha --compilers js:babel/register --recursive` in the root of the project
