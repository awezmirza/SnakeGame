let inputDir = { x: 0, y: 0 };
let food = { x: 10, y: 13 }
let snakeArr = [{ x: 9, y: 9 }];
let speed = 8;
let lastPaintTime = 0;
let score = 0;

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

function gameEngine() {
    document.getElementById("ScoreValue").textContent = score;
    document.getElementById("HighScoreValue").textContent = highscore;

    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 }

        if (score == highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore)
        }
        score = 0;
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
        }
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
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }
    switch (e.key) {
        case "ArrowUp":
            // console.log("Arrow Up")
            inputDir = { x: 0, y: -1 }
            break;
        case "ArrowDown":
            // console.log("Arrow Down")
            inputDir = { x: 0, y: 1 }
            break;
        case "ArrowRight":
            // console.log("Arrow Right")
            inputDir = { x: 1, y: 0 }
            break;
        case "ArrowLeft":
            // console.log("Arrow Left")
            inputDir = { x: -1, y: 0 }
            break;
        default: break;
    }
}
)