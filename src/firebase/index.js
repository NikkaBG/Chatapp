import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBPhq4o1Wm6AVV26D89mACRCqpaWwiSwf8",
    authDomain: "chatapp-bb409.firebaseapp.com",
    projectId: "chatapp-bb409",
    storageBucket: "chatapp-bb409.appspot.com",
    messagingSenderId: "448051884835",
    appId: "1:448051884835:web:b6fe7bb4379d0f935b9296"
};

// Check if firebase is initialise, if not do so
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };