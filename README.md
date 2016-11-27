#MoodTrack----Under Construction
##Twitter Visualization(HeatMap and Sentiment Analysis)


##Aim of the Project
The aim of this project is to create a google map,which visualizes real-time global tweets,based on geolocation's informations.The tweets are being diplayed on the map using emtoticons(positive,neutral,negative).For example,if a tweets is about a warning for bad weather,it will be displayed with a negative emoticon.Furthermore,the user can choose from the search bar,specific tweets,based on words(like weather,rain,money.)

##Features of the project:
The main components of the project is the frontend and the backnend.The first part is the backend of the application with server.js and the fronted based on client folder,which includes index.html.
Especially the server.js uses some modules which makes it able to connect with the Twitter App Stream(twit),to create the server and to check,which tweets have geolocation informations.
To be able to display the tweets on the map,the server uses a module called(socket.io).

The application can have access the Twitter's data through the twitter api stream and after the user has already import the passwords from Twitter App Management(Consumer Key,Consumer Secret,Acess Token,Acess Token Secret).

To be able to make the app,I studied an app from Github.It's name is TweetOMap and it can be found on: https://github.com/tomsoft1/TweetOMap.
The main differences with my application are the use of google maps and some Javascript's libraries,after extensive search on Internet.The main difference of MoodTrack from the initial application from Github is that the second tries to display a heatmap,while my App tries to make a heatmap with emoticons and gives the ability to the user to display tweets,based only in a specific word. The main reason,which made me to change the initial map and the libraries was the data rate of tweets,and the fact that after a short time the displayed tweets weakend on the map.



####Main replacements from the origin source code:

1)Ρeplacement of the module,which connects to Twitter App Stream.

2)Replacement of the leaflet map with google maps and special customization.

3)Replacement of leaflet's library,which doesn't suit to twitter app stream.

4)Import new Angular libraries for displaying marks.

5)Import module Sentiment Analysis.


![Image](https://github.com/PantelisIoannou/images/blob/master/Thesis1.png)
![Image](https://github.com/PantelisIoannou/images/blob/master/Thesis2.png)








