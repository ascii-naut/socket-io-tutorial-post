var socket = io();

const startingSection = document.querySelector('.starting-section');
const homeBtn = document.querySelector('.home-btn');

const myText = document.querySelector('.my-time-text');
const getScore = document.querySelector('.score');

myText.innerHTML = "Click Start!";
myText.style.left = "40%";
myText.style.animation = "none";

let num = Number();

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    socket.emit('startGame');
})

socket.on('startGame', () => {
    hideStartButton();
});

let crazyButton = document.getElementById('crazyButton');
crazyButton.addEventListener('click', () => {
    socket.emit('crazyIsClicked', {
        offsetLeft: Math.random() * ((window.innerWidth - crazyButton.clientWidth) - 100),
        offsetTop: Math.random() * ((window.innerHeight - crazyButton.clientHeight) - 50)
    });
})

socket.emit('giveMeNumber');

socket.on('takeThisData', (data) => {
    getScore.innerHTML = data;
})

socket.on('getServerNumber', (data) => {
    socket.emit('updateServerNumber', data);
});


socket.on('crazyIsClicked', (data) => {
    goCrazy(data.offsetLeft, data.offsetTop, data.numData);
    socket.emit('updateServerNumber', num);
});




function goCrazy(offLeft, offTop) {

    let top, left;

    left = offLeft;
    top = offTop;

    crazyButton.style.top = top + 'px';
    crazyButton.style.left = left + 'px';

    num ++;
    console.log(Number(num));
    crazyButton.style.animation = "none";
    socket.emit('giveMeNumber');

    if(Number(num) > 9) {
        getScore.style.left = "45%";
    }
    else if(Number(num) > 99) {
        getScore.style.left = "44%";
    }

}

function _getScore(numData) {
    getScore.innerHTML = numData;
}

function hideStartButton() {
    num++;
    _getScore(num);
    startButton.style.display = "none";
    crazyButton.style.display = "block";
    startingSection.style.display = "none";
    myText.innerHTML = "Hit Hard!";
    myText.style.left = "42%";
    myText.style.animation = "shake .2s infinite";
    socket.emit('giveMeNumber');
}
function showStartButton() {
    startButton.style.display = "block";
    crazyButton.style.display = "none";
    startingSection.style.display = "block";
    myText.innerHTML = "Click Start!";
    myText.style.left = "40%";
    myText.style.animation = "none";
}
_getScore(num);