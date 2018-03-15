import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import './index.css';
import './animate.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
require('firebase/firestore');

//Initialize Firebase/Firestore
firebase.initializeApp({
  apiKey: "AIzaSyCYFkvU2AeAXzBKdVJNkyGv6pxVC8MyrCo",
  authDomain: "portfolio-jeffzhong.firebaseapp.com",
  databaseURL: "https://portfolio-jeffzhong.firebaseio.com",
  projectId: "portfolio-jeffzhong",
  storageBucket: "portfolio-jeffzhong.appspot.com",
  messagingSenderId: "450134145708"
});


ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
registerServiceWorker();
