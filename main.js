window.onload = startClock;

let alarmTime = new Date();
let currentStatus;
function startClock() {
    initialStatus();
    const clockElement = document.querySelector(".clock");
    const clockObject = new DigitalClock(clockElement);
    clockObject.start();
    
}

function startCount(){
    currentStatus.isCounting = true;
    currentStatus.isWorking = true;
    let alarmHour = document.querySelector('#alarm-time-hour').value;
    let alarmMinute = document.querySelector('#alarm-time-minute').value;
    alarmTime.setHours(alarmHour);
    alarmTime.setMinutes(alarmMinute);
    alarmTime.setSeconds(0);
    showingStatus();
}

function initialStatus(){
    let worktime = Number(document.querySelector('#work-time').value);
    let resttime = Number(document.querySelector('#rest-time').value);
    currentStatus = new Status(worktime,resttime,false,0,false); 
}

function showingStatus(){
    document.querySelector('#status').style.display = 'block';
    document.querySelector('#alarmTime').textContent = addZero(alarmTime.getHours()) + ":" + addZero(alarmTime.getMinutes());
    updateStopwatch();
}

function resetStatus(){
    let worktime = Number(document.querySelector('#work-time').value);
    let resttime = Number(document.querySelector('#rest-time').value);
    currentStatus.workTime = worktime
    currentStatus.restTime = resttime;
}
class Status {
    constructor(workTime, restTime,isWorking,totalTime,isCounting) {
      this.workTime = workTime;
      this.restTime = restTime;
      this.isWorking = isWorking;
      this.totalTime = totalTime; 
      this.isCounting = isCounting;
    }
  }
class DigitalClock {
    constructor(element) {
        this.element = element;
    }
    start() {
        this.update();
        setInterval(this.update, 1000);
    }

    update() {
        let currentTime = new Date();
        let hours = addZero(currentTime.getHours());
        let minutes = addZero(currentTime.getMinutes());
        document.querySelector('.clock-time').textContent = hours + ":" + minutes;
        if(currentStatus.isCounting){
            currentStatus.totalTime++;
            updateStopwatch();
            this.checkTime(currentTime); // check if `this.` should be removed
        }
    }
}
function checkTime(currentTime) {
    if (currentTime.getHours() == alarmTime.getHours() && currentTime.getMinutes() == alarmTime.getMinutes()) {
        alarm();
    }
}

function alarm() { 
    let audio;
    if (!currentStatus.isWorking) {
        currentStatus.isWorking = true;
        console.log(currentStatus.isWorking);
        audio = new Audio('Abreak.mp3');
        playRing(audio);
        resetAlarm(currentStatus.restTime);
    } else {
        currentStatus.isWorking = false;
        console.log(currentStatus.isWorking);
        audio = new Audio('Beginning.mp3');
        playRing(audio);
        resetAlarm(currentStatus.workTime);
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
    document.querySelector('#alarmTime').textContent = addZero(alarmTime.getHours()) + ":" + addZero(alarmTime.getMinutes());
    
    document.querySelector('#isWorking').textContent = (!currentStatus.isWorking) ? "工作中" : "休息" ;
}

function updateStopwatch(){
    const hours = addZero(Math.floor(currentStatus.totalTime / 3600));
    const minutes = addZero(Math.floor((currentStatus.totalTime - hours * 3600) / 60));
    document.querySelector('#totalTime').textContent = hours + ":" + minutes;
}