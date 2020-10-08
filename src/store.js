import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyAg0rdswrROosrcRaZVupQpRX8ld3pA6VE",
  authDomain: "clientpanel-ea2f9.firebaseapp.com",
  databaseURL: "https://clientpanel-ea2f9.firebaseio.com",
  projectId: "clientpanel-ea2f9",
  storageBucket: "clientpanel-ea2f9.appspot.com",
  messagingSenderId: "533461853264",
  appId: "1:533461853264:web:b97642e6df7b1edb8a9d55",
  measurementId: "G-95V8V6VGHF",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//initialize Firestore

//const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

// storing settings in local storage
if (localStorage.getItem("settings") == null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// create intial state

const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

//create store

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
