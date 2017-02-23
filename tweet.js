//MoodTrack
var express = require('express'); // express module
var Twitter = require('twit'); //twit module
var http = require('http'); // http module
var socketio = require('socket.io'); // socket.io module
var sentiment_app = require('sentiment'); // sentiment module
port= process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000; // server port
ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0' // application ip adress



var getTweets = function(server){ // function,which connects to Twitter Streaming API
var self = this;
var io = socketio(server);
var clientNumber = 0;
console.log("Inside getTweets");
var twit_pipe_live = null;
var twitter_api = 
new Twitter({
	consumer_key:    'lq28gDTCT1RC49i73uG3hGjzp', //  From Twitter Developers Site
	consumer_secret: 'dC2pvHoxChsQaVHw80rYUzsaip0TzBcIYKXSAqcFTVjIzVl8Ne', // From Twitter Developers Site
	access_token:    	'787308845890756608-Oj4gY2DxhXvX3lKv76nLMykGHnkBkuV', // From Twitter Developers Site
	access_token_secret:'EMTGKB3J6NrHpkXq13Zg96B6rkNUZPuIHkgkGKAEbRfdX' // From Twitter Developers Site
});

var SetupSocket_mm = function(){ // Socket between server and fronted
io.on('connection', function (sock_listen) {
console.log('A new client is connected.'); // print on cmd
if(twit_pipe_live !== null && clientNumber === 0){
	twit_pipe_live.start();
	console.log("Inside twit_pipe_live");
}
clientNumber ++;
sock_listen.emit("connected");

sock_listen.on('start-streaming', function() { // show new tweet on map
if(twit_pipe_live === null)
	SetupCallback(sock_listen);
});
sock_listen.on('disconnect', function() { //when a client has disconnected
clientNumber --;
if(clientNumber < 1){
	twit_pipe_live.stop();
	 } }); }); }

SetupCallback = function(sock_listen){
console.log("Inside filter");
twit_pipe_live = twitter_api.stream(
'statuses/filter', 
{'locations':'-180,-90,180,90', 'language':'en'});
count = null;
twit_pipe_live.on('tweet', function(tweet) {
if (tweet.coordinates && tweet.coordinates !== null){
tweet.sentiment = sentiment_app(tweet.text);
count++;
console.log(count);
sock_listen.broadcast.emit("new-tweet", tweet);
sock_listen.emit('new-tweet', tweet); }});
}
self.StartService_Thesis = function(){
SetupSocket_mm(); } }

var Appli_mm = function(){
var self = this;

self.Initialize = function(){
self.ip   = ip;
self.port = port;

var appli_mm = express();
appli_mm.use(express.static(__dirname + '/fronted'));
console.log("Inside fronted");
self.server = http.Server(appli_mm);
startTwittPipe(); }

var startTwittPipe = function(){
var twitterService = new getTweets(self.server);	
console.log("Inside twitterService");
twitterService.StartService_Thesis(); }

self.Start = function(){
self.server.listen(self.port, self.ip, function() { } ); } }

var appli_mm = new Appli_mm();
appli_mm.Initialize();
appli_mm.Start();
