#Twitter Visualization(HeatMap and Sentiment Analysis)

###Pantelis Ioannou---AM: P2012029


##Aim of the Project
The aim of this project is to create a google map,which visualizes real-time global tweets,based on geolocation's informations.The tweets are being diplayed on the map using emtoticons(positive,neutral,negative).For example,if a tweets is about a warning for bad weather,it will be displayed with a negative emoticon.Furthermore,the user can choose from the search bar,specific tweets,based on words(like weather,rain,money.)

##Features of the project:
The main components of the project is the frontend and the backnend.The first part is the backend of the application with server.js and the fronted based on client folder,which includes index.html.
Especially the server.js uses some modules which makes it able to connect with the Twitter App Stream(twit),to create the server and to check,which tweets have geolocation informations.
To be able to display the tweets on the map,the server uses a module called(socket.io).

The application can have access the Twitter's data through the twitter api stream and after the user has already import the passwords from Twitter App Management(Consumer Key,Consumer Secret,Acess Token,Acess Token Secret).

To be able to make the app,I studied an app from Github.It's name is TweetOMap and it can be found on: https://github.com/tomsoft1/TweetOMap.
The main differences with my application are the use of google maps and some Javascript's libraries,after extensive search on Internet.Επειδή η εφαρμογή από το github προσπαθεί να απεικονίσει ένα χάρτη heatmap,ενώ η δικιά μου και να απεικονίσει τον χάρτη αλλά και να κάνει ένα παράλληλο έλεγχο,έτσι ώστε να απεικονίσει tweets με βάση συγκεκριμένη λέξη αλλά και σε μια κλίμακα από αρνητικό,ουδέτερο και θετικό tweet.
Ο βασικός προβληματισμός μου,ο οποίος με έκανε να αλλάξω τους χάρτες και την βιβλιοθήκη(leaflet),ήταν ότι τα tweets,μετά από ένα χρονικό διάστημα εξασθενούσαν,με αποτέλεσμα να μην αποτυπώνεται ένας σωστός χάρτης.Και αυτό επειδή,οι χάρτες λογικά λειτουργούν με μεγαλύτερο data rate,από τα tweets που έχει πρόσβαση μια εφαρμογή,εξαιτίας του Twitter Api Rate Limits.

![Image](https://github.com/PantelisIoannou/Multipro/blob/master/images/sentimentmap.PNG)

Ο αρχικός πηγαίο κώδικα της εργασίας μου είνα αυτός: https://github.com/PantelisIoannou/Live-Sentiment-Heatmap

####Αλλαγές από τον κώδικα που παραδειγματίστηκα:

1)Αλλαγή του module που συνδέεται στο twitter app stream.

2)Αλλαγή χάρτη google maps και ειδικό customization.

3)Αλλαγή της βιβίοθήλης leaflet η οποία δεν ταιριάζει στο data rate του twitter app stream.

4)Προσθήκη βιβλιοθηκών angular για την απεικόνιση των σημείων.

5)Προσθήκη module sentiment analysis και σύδνεση του με τον κώδικα του server.js









