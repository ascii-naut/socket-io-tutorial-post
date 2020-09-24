var socket = io();

const startingSection = document.querySelector('.starting-section');
const homeBtn = document.querySelector('.home-btn');

const myText = document.querySelector('.my-time-text');
const getScore = document.querySelector('.score');

myText.innerHTML = "Click Start";
myText.style.left = "40%";
myText.style.animation = "none";

let num = Number(0);
socket.emit('giveMeNumber');

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
socket.on('crazyIsClicked', (data) => {
    goCrazy(data.offsetLeft, data.offsetTop);
});





socket.on('save', (data) => {
    num = data;
})
socket.emit('giveMeNumber');
socket.on('takeThisData', (data) => {
    getScore.innerHTML = data;
})

function goCrazy(offLeft, offTop) {

    let top, left;

    left = offLeft;
    top = offTop;

    crazyButton.style.top = top + 'px';
    crazyButton.style.left = left + 'px';

    num++;
    crazyButton.style.animation = "none";

    socket.emit('changeServerNumber', num);
    socket.emit('updateServerNumber');
    socket.on('save', (data) => {
        num = data;
    })
    socket.emit('giveMeNumber');

    if(Number(num) > 9) {
        getScore.style.left = "45%";
    }
    else if(Number(num) > 99) {
        getScore.style.left = "44%";
    }

}

function hideStartButton() {
    startButton.style.display = "none";
    crazyButton.style.display = "block";
    startingSection.style.display = "none";
    myText.innerHTML = "Hit Hard";
    myText.style.left = "42%";
    myText.style.animation = "shake .2s infinite";
    //socket.emit('giveMeNumber');
}