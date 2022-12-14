import {
    getDoc,
    setDoc,
    doc
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import db from './firebase.js';

async function sendData(theme, date, sec) {
    console.log('sec');
    console.log(sec);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const id = `${day}.${month}.${year}`;
    
    const docRef = doc(db, theme, id);
    const docSnap = await getDoc(docRef);
    let prevSec = docSnap?.data()?.sec ?? 0;

    await setDoc(docRef, {
        theme: theme,
        year: year,
        month: month,
        day: day,
        sec: sec + prevSec,
    });
}

export default sendData;