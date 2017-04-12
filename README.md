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

You can deploy to Heroku with mutliple ways.My way and the most easy i think is to make a new app on heroku platform and then deploy it with your Github profile.See the pictures below:

![](https://github.com/PantelisIoannou/images/blob/master/Deploy1.PNG) _

An then:
https://github.com/PantelisIoannou/images/blob/master/Deploy2.PNG
![](https://github.com/PantelisIoannou/images/blob/master/Deploy2.PNG) _

