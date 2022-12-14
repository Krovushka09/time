import sendData from './dbFunction.js';

let sumSec = 0;
let prevSec = 0;
let hour = 0;
let min = 0;
let sec = 1;
let timerId = null;
let isPause = false;
let hoursEl = document.body.querySelector(".hours");
let minutesEl = document.body.querySelector(".minutes");
let secondsEl = document.body.querySelector(".seconds");
let timeDate = null;
let timeStart = 0;
let pauseStart = 0;
let pauseTime = 0;

/*
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}*/

document.addEventListener("visibilitychange", handleVisibilityChange, false);

//проверяет активна ли вкладка
function handleVisibilityChange() {
    if (document.hidden) {
        console.log('off');
    } else  {
        console.log('on');
        setTimePass();
    }
  }
/*
setInterval(() => {
    console.log(document.hidden);
}, 1000);*/

//вычисляет секунды с учетом сколько времени вкладка была неактивна
//(когда вкладка неактивна, то timeInterval не регает прошедшие секунды)
function setTimePass(){
    sumSec = timeStart ? Math.floor((Date.now() - timeStart)/1000) - pauseTime : timeStart;
}

//выключается кнопки
function disableButtons(){
    const pauseButton = document.body.querySelector(".pause");
    const stopButton = document.body.querySelector(".stop");
    pauseButton.style.backgroundColor = "gray";
    stopButton.style.backgroundColor = "gray";
    pauseButton.disabled = true;
    stopButton.disabled = true;
}

//включается кнопки
function enableButtons(){
    const pauseButton = document.body.querySelector(".pause");
    const stopButton = document.body.querySelector(".stop");
    pauseButton.style.backgroundColor = "white";
    stopButton.style.backgroundColor = "white";
    pauseButton.disabled = false;
    stopButton.disabled = false;
}

if (timerId === null) {
    disableButtons();
}

//solution
/*
document.body.querySelector(".start").onclick = () => {
    if (!(timerId === null)) return;
    timerId = setInterval(() => {
        if (!pause) {
            if (sec < 9) secondsEl.innerHTML = `0${sec}`;
            else secondsEl.innerHTML = sec;
            if (sec > 59) {
                min++;
                if (min < 9) minutesEl.innerHTML = `0${min}`;
                else minutesEl.innerHTML = min;
                sec = 0;
                secondsEl.innerHTML = "00";
            }
            if (min > 59) {
                hour++;
                if (hour < 9) hoursEl.innerHTML = `0${hour}`;
                else hoursEl.innerHTML = hour;
                sec = 0;
                min = 0;
                secondsEl.innerHTML = "00";
                minutesEl.innerHTML = "00";
            }
            sumSec++;
            sec++;
        }
        
    }, 1000);
    console.log('bup');
};
*/
//The cooler solution
document.body.querySelector(".start").onclick = () => {
    if (!(timerId === null)) return;
    enableButtons();
    timeStart = Date.now();
    timerId = setInterval(() => {
        if (!isPause) {
            hour = Math.floor(sumSec/3600);
            hoursEl.innerHTML = hour <= 9 ? `0${hour}` : hour;
            min = Math.floor(sumSec/ 60) % 60;
            minutesEl.innerHTML = min <= 9 ? `0${min}` : min;
            sec = sumSec % 60;
            secondsEl.innerHTML = sec <= 9 ? `0${sec}` : sec;
            sumSec++;
        }
    }, 1000);
};

document.body.querySelector(".pause").onclick = () => {
    isPause = isPause ? false : true;
    if (isPause) {
        pauseStart = Math.floor(Date.now()/1000);
    }
    if (!isPause) {
        pauseTime = pauseTime ? pauseTime + Math.floor(Date.now()/1000) - pauseStart : Math.floor(Date.now()/1000) - pauseStart;
        setTimePass();
    }
};

document.body.querySelector(".stop").onclick = stopTimer;

document.querySelector('.section__add-button').onclick = () => {
    if(sumSec > 0){
        return alert('Чтобы добавить время, необходимо обнулить таймер.');
    }
    const inputTheme = document.querySelector('.section__label');
    const theme = inputTheme.value;
    if(theme.length === 0){
        return alert('Чтобы добавить время, необходимо написать/выбрать тему.');
    }
    //const copyTimeDate = JSON.parse(JSON.stringify(timeDate));
    ( async () => await sendData(theme, timeDate, prevSec))();
}

function stopTimer() {
    disableButtons();
    console.log(sumSec);
    clearInterval(timerId);
    timerId = null;
    console.log('beep');
    createTimeHistoryEl(hour, min, sec);
    secondsEl.innerHTML = '00';
    minutesEl.innerHTML = '00';
    hoursEl.innerHTML = '00';
    prevSec = sumSec;
    sumSec = 0;
    hour = 0;
    min = 0;
    sec = 0;
    isPause = false;
    timeDate = new Date();
    pauseStart = 0;
    pauseTime = 0;
    timeStart = 0;
}

function createTimeHistoryEl(...time) {
    time.forEach(t => {
        t = t > 9 ? t : `0${t}`
    });
    let historyEl = document.createElement('div');
    historyEl.className = "history__block-info";
    historyEl.innerHTML = `${time[0]}:${time[1]}:${time[2]}`;
    document.body.querySelector('.history').append(historyEl);
}


