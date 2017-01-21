//MoodTrack

var twitter_app = require('twit');
var express_app = require('express');
var http_app = require('http');
var socketio_app = require('socket.io');
var sentiment_app = require('sentiment');

var getTweets = function(server){
	var self = this;
	var io = socketio_app(server);
	var clientNumber = 0;

	var twit_pipe_live = null;
	
	var twitter_api = 
			new twitter_app({
				consumer_key:    'lq28gDTCT1RC49i73uG3hGjzp',
				consumer_secret: 'dC2pvHoxChsQaVHw80rYUzsaip0TzBcIYKXSAqcFTVjIzVl8Ne',
				access_token:    	'787308845890756608-Oj4gY2DxhXvX3lKv76nLMykGHnkBkuV',
				access_token_secret:'EMTGKB3J6NrHpkXq13Zg96B6rkNUZPuIHkgkGKAEbRfdX'
			});

	var SetupSocket_mm = function(){
		io.on('connection', function (sock_listen) {
			console.log(new Date() + ' - A new client is connected.');
			if(twit_pipe_live !== null && clientNumber === 0){
				twit_pipe_live.start();
				console.log(new Date() + ' - Restarted streaming.');
			}
			clientNumber ++;
			sock_listen.emit("connected");

		  	sock_listen.on('start-streaming', function() {
		  		console.log(new Date() + ' -New event <start-streaming>.');
		  		if(twit_pipe_live === null)
			    	SetupCallback(sock_listen);
		  	});
		  	sock_listen.on('disconnect', function() {
				console.log(new Date() + ' - Disconnected client');
				clientNumber --;
				if(clientNumber < 1){
					twit_pipe_live.stop();
					console.log(new Date() + ' - All clients are disconnected.');
				}
			});
		});
	}

	SetupCallback = function(sock_listen){
      	twit_pipe_live = twitter_api.stream(
      		'statuses/filter', 
      		{'locations':'-180,-90,180,90', 'language':'en'});

      	twit_pipe_live.on('tweet', function(tweet) {
      		//console.log(new Date() + ' - Received new tweet.');
          	if (tweet.coordinates && tweet.coordinates !== null){
          		tweet.sentiment = sentiment_app(tweet.text);
              	sock_listen.broadcast.emit("new-tweet", tweet);
              	sock_listen.emit('new-tweet', tweet);
          	}
         });

      	twit_pipe_live.on('error', function(error) {
      		console.log(new Date() + ' - Twitter stream error: %j', error);
      		sock_listen.broadcast.emit("stream-error");
          	sock_listen.emit('stream-error');
		});

      	twit_pipe_live.on('connect', function(request) {
		    console.log(new Date() + ' - Connected to Twitter stream API.');
		});

		twit_pipe_live.on('reconnect', function (request, response, connectInterval) {
		  	console.log(new Date() + ' - Trying to reconnect to Twitter stream API in ' + connectInterval + ' ms.');
		});

      	twit_pipe_live.on('limit', function(limitMessage) {
        	console.log(new Date() + ' - Twitter stream limit error: %j', limitMessage);
        	sock_listen.broadcast.emit("stream-limit");
          	sock_listen.emit('stream-limit');
      	});

      	twit_pipe_live.on('warning', function(warningMessage) {
       	 	console.log(new Date() + ' - Twitter stream warning: %j', warningMessage);
      	});

      	twit_pipe_live.on('disconnect', function(disconnectMessage) {
        	console.log(new Date() + ' - Disconnected to Twitter stream API.');
      	});

      	console.log(new Date() + " - Initialized twitter streaming.");
	}



	self.StartService_Thesis = function(){
		SetupSocket_mm();
	}
}

var Appli_mm = function(){
	var self = this;

	self.Initialize = function(){
		self.ip        = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

		var appli_mm = express_app();
		appli_mm.use(express_app.static(__dirname + '/fronted'));
		self.server = http_app.Server(appli_mm);

		startTwittPipe();
	};

	var startTwittPipe = function(){
		var twitterService = new getTweets(self.server);
		twitterService.StartService_Thesis();
	};

	self.Start = function(){
		self.server.listen(self.port, self.ip, function() {
            console.log(new Date() + ' - Server started. Listening on ' + self.ip + ':' + self.port);
        });
	};
}

var appli_mm = new Appli_mm();
appli_mm.Initialize();
appli_mm.Start();
