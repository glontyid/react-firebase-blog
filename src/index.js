import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyA06wnl2Mdgdm-uHrSG_gG6wiw797UFf5k",
        authDomain: "react-blog-7b6ce.firebaseapp.com",
        projectId: "react-blog-7b6ce",
        storageBucket: "react-blog-7b6ce.appspot.com",
        messagingSenderId: "356829308813",
        appId: "1:356829308813:web:612d09ca31303ee9157fc4",
        measurementId: "G-TZFT6FGHBX"
    }
);

const auth = firebase.auth();
const firestore = firebase.firestore();
//firestore.settings({ timestampsInSnapshots: true });
export const Context = createContext(null);

ReactDOM.render(
  <React.StrictMode>
      <Context.Provider value={{auth, firebase, firestore}}>
          <App />
      </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
