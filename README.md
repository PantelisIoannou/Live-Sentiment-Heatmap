# MoodTrack

A real-time Google Maps of Tweets from around the world.

This web app attaches to the Twitter API stream/filter and runs sentiment analysis on Tweets with geo data.
Tweets are published with the use of JavaScript libraries on special modified Google Map.MoodTrack display the Tweets,with the use of emoticon(happy,neutral,sad),which depends from the Tweet's content.The user can easily have access on the Tweet's content and search with a keyword for specific Tweets.

# Installing and Running

Install [Node.js](http://nodejs.org/).

Clone GitHub repo:

```
https://github.com/PantelisIoannou/MoodTrack
```
Insert in the file Tweets.js your personal credentials Twitter's credentials.(You can have them for free by making a new app on Twitter Dev Site).

Install node module dependencies:

```
npm install
```

Run application:

```
npm start
```
Go to [http://localhost:3000](http://localhost:3000) in your browser.

Deploying

**Heroku**

You can deploy to Heroku via [Git](https://devcenter.heroku.com/articles/git) with the [Heroku toolbelt](https://toolbelt.heroku.com/).

Before deploying to Heroku, set your environment [config vars](https://devcenter.heroku.com/articles/config-vars) to mirror `config.json`, and set `NODE_ENV` to "production."

[![image](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/PantelisIoannou/MoodTrack)
