
/*
const firebase = require('firebase/app');
const { addDoc } = require('firebase/firestore');
const initializeApp = firebase.initializeApp;
const firebaseFirestore = require('firebase/firestore')
const getFirestore = firebaseFirestore.getFirestore;
const collection = firebaseFirestore.collection;
const doc = firebaseFirestore.doc;
const getDoc = firebaseFirestore.getDoc;
const getDocs = firebaseFirestore.getDocs;
const setDoc = firebaseFirestore.setDoc;
*/

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    doc
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

/*
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    doc
} from 'firebase/firestore';
*/

const firebaseConfig = {
    apiKey: "AIzaSyBMjsIVdN51ti6IgKavFSqDTv9TWd1KKE4",
    authDomain: "chronology-8b645.firebaseapp.com",
    projectId: "chronology-8b645",
    storageBucket: "chronology-8b645.appspot.com",
    messagingSenderId: "76513053428",
    appId: "1:76513053428:web:ab3b986decafa015df2ca1"
  };
  
  
const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

export default db;
/*
const colRef = collection(db, 'words-en-ru');
const docRef = doc(db, "time-chronology", "js6");


const docSnap2 = await getDoc(docRef);
const sec = docSnap2?.data()?.sec ?? 0;

console.log(docSnap2.data());



const docSnap = getDoc(docRef).then((data => {
    console.log('const/');
    console.log(data?.data()?.sec ?? 0);
}));


async function sendData(docRef) {
    const docSnap = await getDoc(docRef);
    let sec = docSnap?.data()?.sec ?? 0;

    await setDoc(docRef, {
        theme: 'new',
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        sec: 2 + sec,
    });
}

sendData(docRef);*/


/*
async function isExistGetParam(docRef) {
    let result = 0;
    getDoc(docRef).then((data => {
        console.log('function/');
        console.log(data?.data()?.sec ?? 0);
        result = data?.data()?.sec ?? 0;
    }));
    return result;
};

const sec = await isExistGetParam(docRef);


const subColl = collection(db, "/time-chronology/Coding/years/y2022/months/april/days");

(async () => {
    const subDoc = await getDocs(subColl);
    console.log(subDoc.docs.map(d => ({id: d.id, ...d.data()})));
})();


setTimeout(() => (async () => {
    addDoc(subColl, {date: 3000, sec: 1805});
    const subDoc = await getDocs(subColl);
    console.log(subDoc.docs.map(d => ({id: d.id, ...d.data()})));
})(), 4000);


(async () => {
    await setDoc(docRef, {
    theme: 'new',
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    sec: 2 + sec,
});
})();*/