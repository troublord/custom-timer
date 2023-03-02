window.onload = startClock;

let alarmTime = new Date();
let isCounting = false;

function startClock() {
    const clockElement = document.querySelector(".clock");
    const clockObject = new DigitalClock(clockElement);

    clockObject.start();
}

function startCount(){
    isCounting = true;
    let alarmHour = document.querySelector('#alarm-time-hour').value;
    let alarmMinute = document.querySelector('#alarm-time-minute').value;
    alarmTime.setHours(alarmHour);
    alarmTime.setMinutes(alarmMinute);
    alarmTime.setSeconds(0);
}

class DigitalClock {
    constructor(element) {
        this.element = element;
    }
    start() {
        this.update();
        setInterval(this.update, 500);
    }

    update() {
        let currentTime = new Date();

        let hours = addZero(currentTime.getHours());
        let minutes = addZero(currentTime.getMinutes());
        document.querySelector('.clock-time').textContent = hours + ":" + minutes;
        if(isCounting){
            this.checkTime(currentTime);
        }
    }
}
function checkTime(currentTime) {
    if (currentTime.getHours() == alarmTime.getHours() && currentTime.getMinutes() == alarmTime.getMinutes()) {
        alarm();
    }
}

let isWorking = true;
function alarm(currentTime) { 
    let audio;
    if (!isWorking) {
        isWorking = true;
        audio = new Audio('Abreak.mp3');
        playRing(audio);
        resetAlarm(10);
    } else {
        isWorking = false;
        audio = new Audio('Beginning.mp3');
        playRing(audio);
        resetAlarm(50);
    }
}

function addZero(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}

function playRing(audio) {
    audio.addEventListener('ended', () => {
        audio.pause();
        audio.currentTime = 0;
    });
    audio.play();
}

function resetAlarm(minute) {
    alarmTime.setMinutes(alarmTime.getMinutes() + minute);
}