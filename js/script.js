let inputDir = { x: 0, y: 0 };
let food = { x: 10, y: 13 }
let snakeArr = [{ x: 9, y: 9 }];
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let highscorecrossed = false;

const foodeat = new Audio("assets/sounds/foodeat.wav")
const gameover = new Audio("assets/sounds/gameover.wav")
const movesnd = new Audio("assets/sounds/movesnd.mp3")
const highscoresnd = new Audio("assets/sounds/highscore.mp3")

let highscore = localStorage.getItem("highscore")
if (highscore === null) { highscore = 0; }

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) { return; }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y >= 18) {
        return true;
    }
}

function playAudio(audio) {
    if (volumeOnElement.style.display !== 'none') {
        audio.play();
    }
}

function gameEngine() {
    document.getElementById("ScoreValue").textContent = score;
    document.getElementById("HighScoreValue").textContent = highscore;

    if (isCollide(snakeArr)) {
        playAudio(gameover);
        inputDir = { x: 0, y: 0 }

        if (score == highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore)
        }
        score = 0;
        highscorecrossed = false;
        alert("Game Over")

        snakeArr = [
            { x: 9, y: 9 }
        ];
        speed = 8;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        score += 1;
        if (score > highscore) {
            highscore = score;
            if (highscorecrossed == false) {
                playAudio(highscoresnd);
                highscorecrossed = true;
            }
        }
        playAudio(foodeat);

        speed += 0.3
        food = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (14) * Math.random()) }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add("snakehead");
        }
        else {
            snakeElement.classList.add("snakebody");
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        document.getElementById('uppc').click();
    } else if (event.key === 'ArrowDown') {
        document.getElementById('downpc').click();
    } else if (event.key === 'ArrowLeft') {
        document.getElementById('leftpc').click();
    } else if (event.key === 'ArrowRight') {
        document.getElementById('rightpc').click();
    }
});

document.getElementById("left").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: -1, y: 0 };
});

document.getElementById("up").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: 0, y: -1 };
});

document.getElementById("right").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: 1, y: 0 };
});

document.getElementById("down").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: 0, y: 1 };
});

document.getElementById("leftpc").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: -1, y: 0 };
});

document.getElementById("uppc").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: 0, y: -1 };
});

document.getElementById("rightpc").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: 1, y: 0 };
});

document.getElementById("downpc").addEventListener("click", function () {
    playAudio(movesnd);
    inputDir = { x: 0, y: 1 };
});

// --------------------------------------------------------------------------------------
// For responsiveness


window.addEventListener('DOMContentLoaded', (event) => {
    const body = document.querySelector('body');
    const board = document.querySelector('#board');
    const keyboard = document.querySelector('.keyboard-buttons');
    const keyboardonmobile = document.querySelector('.keyboard-buttons-on-mobile');

    function updateStyles() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if (height < width) {
            // for pc
            body.style.alignItems = 'center';
            board.style.marginTop = '';
            keyboard.style.display = 'flex';
            keyboardonmobile.style.display = 'none';
        } else {
            // for mobile
            body.style.alignItems = '';
            board.style.marginTop = '60px';
            keyboard.style.display = 'none';
            keyboardonmobile.style.display = 'flex';
        }
    }

    updateStyles();

    window.addEventListener('resize', updateStyles);
});

/////////////////////////////////////////////////////////////////////////

let volumepreference = localStorage.getItem("volumepreference");

// Get the volume element
const volumeElement = document.getElementById('volume');

// Get the volumeon and volumeoff elements
const volumeOnElement = document.getElementById('volumeon');
const volumeOffElement = document.getElementById('volumeoff');

// Add a click event listener to the volume element
volumeElement.addEventListener('click', function () {
    // Toggle the visibility of the volumeon and volumeoff elements
    if (volumeOnElement.style.display === 'none') {
        volumeOnElement.style.display = 'inline';
        volumeOffElement.style.display = 'none';
        localStorage.setItem("volumepreference", true);
    } else {
        volumeOnElement.style.display = 'none';
        volumeOffElement.style.display = 'inline';
        localStorage.setItem("volumepreference", false);
    }
});

if (volumepreference === 'false') {
    volumeElement.click();
}
