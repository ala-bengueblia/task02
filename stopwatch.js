let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime += new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    display.innerHTML = "00:00:00";
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapsContainer.innerHTML = "";
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + savedTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds);
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
