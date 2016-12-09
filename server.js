//MoodTrack

var twitter_app = require('twit');
var express_app = require('express');
var http_app = require('http');
var socketio_app = require('socket.io');
var sentiment_app = require('sentiment');

var getTweets = function(server){
	var self = this;
	var io = socketio_app(server);
	var clientCount = 0;

	var twitter_live_stream = null;
	
	var twitter_api = 
			new twitter_app({
				consumer_key:    'lq28gDTCT1RC49i73uG3hGjzp',
				consumer_secret: 'dC2pvHoxChsQaVHw80rYUzsaip0TzBcIYKXSAqcFTVjIzVl8Ne',
				access_token:    	'787308845890756608-Oj4gY2DxhXvX3lKv76nLMykGHnkBkuV',
				access_token_secret:'EMTGKB3J6NrHpkXq13Zg96B6rkNUZPuIHkgkGKAEbRfdX'
			});

	var SetupSocketCallback_Thesis = function(){
		io.on('connection', function (socket) {
			console.log(new Date() + ' - A new client is connected.');
			if(twitter_live_stream !== null && clientCount === 0){
				twitter_live_stream.start();
				console.log(new Date() + ' - Restarted streaming.');
			}
			clientCount ++;
			socket.emit("connected");

		  	socket.on('start-streaming', function() {
		  		console.log(new Date() + ' - Received new event <start-streaming>.');
		  		if(twitter_live_stream === null)
			    	SetupCallback(socket);
		  	});
		  	socket.on('disconnect', function() {
				console.log(new Date() + ' - A client is disconnected');
				clientCount --;
				if(clientCount < 1){
					twitter_live_stream.stop();
					console.log(new Date() + ' - All clients are disconnected. Stopped streaming.');
				}
			});
		});
	}

	SetupCallback = function(socket){
      	twitter_live_stream = twitter_api.stream(
      		'statuses/filter', 
      		{'locations':'-180,-90,180,90', 'language':'en'});

      	twitter_live_stream.on('tweet', function(tweet) {
      		//console.log(new Date() + ' - Received new tweet.');
          	if (tweet.coordinates && tweet.coordinates !== null){
          		tweet.sentiment = sentiment_app(tweet.text);
              	socket.broadcast.emit("new-tweet", tweet);
              	socket.emit('new-tweet', tweet);
          	}
         });

      	twitter_live_stream.on('error', function(error) {
      		console.log(new Date() + ' - Twitter stream error: %j', error);
      		socket.broadcast.emit("stream-error");
          	socket.emit('stream-error');
		});

      	twitter_live_stream.on('connect', function(request) {
		    console.log(new Date() + ' - Connected to Twitter stream API.');
		});

		twitter_live_stream.on('reconnect', function (request, response, connectInterval) {
		  	console.log(new Date() + ' - Trying to reconnect to Twitter stream API in ' + connectInterval + ' ms.');
		});

      	twitter_live_stream.on('limit', function(limitMessage) {
        	console.log(new Date() + ' - Twitter stream limit error: %j', limitMessage);
        	socket.broadcast.emit("stream-limit");
          	socket.emit('stream-limit');
      	});

      	twitter_live_stream.on('warning', function(warningMessage) {
       	 	console.log(new Date() + ' - Twitter stream warning: %j', warningMessage);
      	});

      	twitter_live_stream.on('disconnect', function(disconnectMessage) {
        	console.log(new Date() + ' - Disconnected to Twitter stream API.');
      	});

      	console.log(new Date() + " - Initialized twitter streaming.");
	}



	self.StartService_Thesis = function(){
		SetupSocketCallback_Thesis();
	}
}

var Application_Thesis = function(){
	var self = this;

	self.Initialize = function(){
		self.ip        = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

		var app_thesis = express_app();
		app_thesis.use(express_app.static(__dirname + '/fronted'));
		self.server = http_app.Server(app_thesis);

		startTwitterStreamService();
	};

	var startTwitterStreamService = function(){
		var twitterService = new getTweets(self.server);
		twitterService.StartService_Thesis();
	};

	self.Start = function(){
		self.server.listen(self.port, self.ip, function() {
            console.log(new Date() + ' - Server started. Listening on ' + self.ip + ':' + self.port);
        });
	};
}

var app_thesis = new Application_Thesis();
app_thesis.Initialize();
app_thesis.Start();
