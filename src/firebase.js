import  Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const config = {
                    apiKey: "AIzaSyC_8Th5x2Lt9HnXfMeHc7Mjw7JQifuc-Gs",
                    authDomain: "myflix-7332f.firebaseapp.com",
                    databaseURL: "https://myflix-7332f.firebaseio.com",
                    projectId: "myflix-7332f",
                    storageBucket: "myflix-7332f.appspot.com",
                    messagingSenderId: "720219707721",
                    appId: "1:720219707721:web:45ca002046dc124dbe2298"
                }

const firebase = Firebase.initializeApp(config)

//seedDatabase(firebase)

export {firebase}

