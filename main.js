window.onload = startClock;

let alarmTime = new Date();
let currentStatus;

function startClock() {
    currentStatus = new Status(false,0,false); 
    // start clock running--------------
    const clockElement = document.querySelector(".clock");
    const clockObject = new DigitalClock(clockElement);
    clockObject.start();
    // ---------------------------------
    initialBellTime();
}
class Status {
    constructor(isWorking,totalTime,isCounting) {
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
function initialBellTime(){
    document.querySelector('#alarm-time-hour').value = addZero(alarmTime.getHours());
    document.querySelector('#alarm-time-minute').value = addZero(alarmTime.getMinutes());
}

function startBell(){
    if(setupAlarmTime()){
        document.querySelector('#isWorking').textContent = "準備中";
        currentStatus.isCounting = true;
        currentStatus.isWorking = true;
        showingStatus();
    }else{
        alert("bell's time format isn't right");
    }

}

function stopBell(){
    currentStatus.isCounting = false;
    currentStatus.isWorking = false;
    document.querySelector('#isWorking').textContent = "停止中";
    document.querySelector('#alarmTime').textContent = "00:00";
}

function setupAlarmTime(){
    let alarmHour = document.querySelector('#alarm-time-hour').value;
    let alarmMinute = document.querySelector('#alarm-time-minute').value;
    let result = false;
    if(validateHourFormat(alarmHour) && validateMinuteFormat(alarmMinute)){
        alarmTime.setHours(addZero(alarmHour));
        alarmTime.setMinutes(addZero(alarmMinute));
        alarmTime.setSeconds(0);
        result = true;
    }
    return result;
}

function validateHourFormat(hour) {
    // Regular expression to match hour format: 00-23
    const regex = /^(0\d|1\d|2[0-3])$/;
    return regex.test(hour);
  }
  
  function validateMinuteFormat(minute) {
    // Regular expression to match minute format: 00-59
    const regex = /^[0-5]\d$/;
    return regex.test(minute);
  }

function showingStatus(){
    document.querySelector('#status').style.display = 'block';
    document.querySelector('#alarmTime').textContent = addZero(alarmTime.getHours()) + ":" + addZero(alarmTime.getMinutes());
    updateStopwatch();
}


function updateStopwatch(){
    const hours = addZero(Math.floor(currentStatus.totalTime / 3600));
    const minutes = addZero(Math.floor((currentStatus.totalTime - hours * 3600) / 60));
    document.querySelector('#totalTime').textContent = hours + ":" + minutes;
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
        audio = new Audio('Abreak.mp3');
        playRing(audio);
        let resttime = Number(document.querySelector('#rest-time').value);
        resetAlarm(resttime);
    } else {
        currentStatus.isWorking = false;
        audio = new Audio('Beginning.mp3');
        playRing(audio);
        let worktime = Number(document.querySelector('#work-time').value);
        resetAlarm(worktime);
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
