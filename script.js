function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

function updateStopwatch() {
    const stopwatchElement = document.getElementById('stopwatch');
    const hours = Math.floor(stopwatchTime / 3600000);
    const minutes = Math.floor((stopwatchTime % 3600000) / 60000);
    const seconds = Math.floor((stopwatchTime % 60000) / 1000);
    const milliseconds = stopwatchTime % 1000;
    
    stopwatchElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

document.getElementById('startStopwatch').addEventListener('click', () => {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 10;
            updateStopwatch();
        }, 10);
        document.getElementById('startStopwatch').textContent = 'Pause';
        stopwatchRunning = true;
    } else {
        clearInterval(stopwatchInterval);
        document.getElementById('startStopwatch').textContent = 'Start';
        stopwatchRunning = false;
    }
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchRunning = false;
    document.getElementById('startStopwatch').textContent = 'Start';
    updateStopwatch();
    document.getElementById('laps').innerHTML = '';
});

document.getElementById('lapStopwatch').addEventListener('click', () => {
    if (stopwatchRunning) {
        const lapTime = document.getElementById('stopwatch').textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${lapTime}`;
        document.getElementById('laps').prepend(lapItem);
    }
});

let timerInterval;
let timerTime = 0;
let timerRunning = false;

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const hours = Math.floor(timerTime / 3600000);
    const minutes = Math.floor((timerTime % 3600000) / 60000);
    const seconds = Math.floor((timerTime % 60000) / 1000);
    
    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timerTime <= 0 && timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('startTimer').textContent = 'Start';
        alert('Timer finished!');
    }
}

document.getElementById('startTimer').addEventListener('click', () => {
    if (!timerRunning) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        timerTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        
        if (timerTime > 0) {
            timerInterval = setInterval(() => {
                timerTime -= 1000;
                if (timerTime >= 0) {
                    updateTimer();
                }
            }, 1000);
            document.getElementById('startTimer').textContent = 'Pause';
            timerRunning = true;
        }
    } else {
        clearInterval(timerInterval);
        document.getElementById('startTimer').textContent = 'Start';
        timerRunning = false;
    }
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerTime = 0;
    timerRunning = false;
    document.getElementById('startTimer').textContent = 'Start';
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    updateTimer();
});

setInterval(updateClock, 1000);
updateClock();
updateStopwatch();
updateTimer();