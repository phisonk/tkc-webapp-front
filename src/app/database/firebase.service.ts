import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }
  firebaseConfig:object = {
    apiKey: "AIzaSyAT8LBV4fikfxjin32GjNrU7sdKaoXjMwM",
    authDomain: "tkc-webapp.firebaseapp.com",
    databaseURL: "https://tkc-webapp.firebaseio.com",
    projectId: "tkc-webapp",
    storageBucket: "tkc-webapp.appspot.com",
    messagingSenderId: "974641117380",
    appId: "1:974641117380:web:ed0a6b8d925fa559d23191",
    measurementId: "G-B5JJ3SNJB4"
  };
  ngOnInit(){
    // Initialize Firebase
    firebase.initializeApp(this.firebaseConfig);
  }

  GetDeviceList(){
  }
  
}
