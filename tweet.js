//MoodTrack

var Twitter = require('twit'); //twit module
var express_app = require('express'); // express module
var http_app = require('http'); // http module
var socketio_app = require('socket.io'); // socket.io module
var sentiment_app = require('sentiment'); // sentiment module
port= process.env.PORT || 8080; // server port
ip = process.env.IP || 'localhost'; // application ip adress

var getTweets = function(server){ // function,which connects to Twitter Streaming API
var self = this;
var io = socketio_app(server);
var clientNumber = 0;

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
console.log(new Date() + ' - A new client is connected.'); // print on cmd
if(twit_pipe_live !== null && clientNumber === 0){
	twit_pipe_live.start();
}
clientNumber ++;
sock_listen.emit("connected");

sock_listen.on('start-streaming', function() { // show new tweet on map
if(twit_pipe_live === null)
	SetupCallback(sock_listen);
});
sock_listen.on('disconnect', function() { //when a client has disconnected
console.log(new Date() + ' - Disconnected client');
clientNumber --;
if(clientNumber < 1){
	twit_pipe_live.stop();
	console.log(new Date() + ' - All clients are disconnected.'); } }); }); }

SetupCallback = function(sock_listen){
twit_pipe_live = twitter_api.stream(
'statuses/filter', 
{'locations':'-180,-90,180,90', 'language':'en'});

twit_pipe_live.on('tweet', function(tweet) {
//console.log(new Date() + ' - Received new tweet.');
if (tweet.coordinates && tweet.coordinates !== null){
tweet.sentiment = sentiment_app(tweet.text);
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

var appli_mm = express_app();
appli_mm.use(express_app.static(__dirname + '/fronted'));
self.server = http_app.Server(appli_mm);
startTwittPipe(); }

var startTwittPipe = function(){
var twitterService = new getTweets(self.server);	
twitterService.StartService_Thesis(); }

self.Start = function(){
self.server.listen(self.port, self.ip, function() { } ); } }

var appli_mm = new Appli_mm();
appli_mm.Initialize();
appli_mm.Start();
