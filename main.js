window.onload = startClock;
let alarmTime = new Date();
let alarmHour = document.querySelector('.alarm-time-hour').textContent;
let alarmMinute = document.querySelector('.alarm-time-minute').textContent;
alarmTime.setHours(alarmHour);
alarmTime.setMinutes(alarmMinute);
alarmTime.setSeconds(0);


function startClock(){
    const clockElement = document.querySelector(".clock");
    const clockObject = new DigitalClock(clockElement);
    
    clockObject.start();
}

class DigitalClock{
    constructor(element){
        this.element = element;
    }
    start(){
        this.update();
        setInterval(this.update, 500);
    }

    update(){
        let currentTime = new Date();

        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        alarm(currentTime);
        document.querySelector('.clock-time').textContent = hours + ":" + minutes;
    }
    
}
let isWorking = true;
function alarm(currentTime){ // 有夠肥要優化
    if(currentTime.getHours() == alarmTime.getHours() && currentTime.getMinutes() == alarmTime.getMinutes() && currentTime.getSeconds() == 0){
        console.log('bingo');
        let addMinute;
        let audio ;
        if(!isWorking){
            addMinute = 10;
            isWorking = true;
            audio = new Audio('Abreak.mp3');
            audio.addEventListener('ended', () => {
                audio.pause();
                audio.currentTime = 0;
              });
              audio.play();

        }else{
            addMinute = 50;
            isWorking = false;
            audio = new Audio('Beginning.mp3');
            audio.addEventListener('ended', () => {
                audio.pause();
                audio.currentTime = 0;
              });
              audio.play();
        }
        alarmTime.setMinutes(alarmTime.getMinutes() + addMinute);
    }
    
}
