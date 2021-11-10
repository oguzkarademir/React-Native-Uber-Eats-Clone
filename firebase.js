import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDvXlD0-19uE0dtLuPLQGaRVSbZZRLr5Zo",
    authDomain: "uber-eats-react-native-326919.firebaseapp.com",
    projectId: "uber-eats-react-native-326919",
    storageBucket: "uber-eats-react-native-326919.appspot.com",
    messagingSenderId: "851936249825",
    appId: "1:851936249825:web:3fab5bdd4bf67137ca74a0"
  };

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

  export default firebase;