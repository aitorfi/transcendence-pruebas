export function initializeGame() {
	canvas = document.getElementById('pongCanvas');
	ctx = canvas.getContext('2d');

	// let paddleHeight = 100, paddleWidth = 10;
	// let player1Y, player2Y;
	// let ballSize = 10;
	// let ballX, ballY;
	// let ballSpeedX = 4, ballSpeedY = 4;
	// const paddleSpeed = 6;
	// let player1Up = false, player1Down = false;
	// let player2Up = false, player2Down = false;

    player1Y = (canvas.height - paddleHeight) / 2;
    player2Y = (canvas.height - paddleHeight) / 2;
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;

    document.addEventListener('keydown', (event) => {
      if (event.key === 'w') player1Up = true;
      if (event.key === 's') player1Down = true;
      if (event.key === 'ArrowUp') player2Up = true;
      if (event.key === 'ArrowDown') player2Down = true;
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'w') player1Up = false;
      if (event.key === 's') player1Down = false;
      if (event.key === 'ArrowUp') player2Up = false;
      if (event.key === 'ArrowDown') player2Down = false;
    });

    gameLoop();
}

function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fill();
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawRect(0, player1Y, paddleWidth, paddleHeight, 'white');
	drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, 'white');
	drawBall(ballX, ballY, ballSize, 'white');

	if (player1Up && player1Y > 0) player1Y -= paddleSpeed;
	if (player1Down && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;
	if (player2Up && player2Y > 0) player2Y -= paddleSpeed;
	if (player2Down && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY = -ballSpeedY;

	if (ballX <= paddleWidth) {
		if (ballY > player1Y && ballY < player1Y + paddleHeight)
			ballSpeedX = -ballSpeedX;
	} else if (ballX + ballSize >= canvas.width - paddleWidth) {
		if (ballY > player2Y && ballY < player2Y + paddleHeight)
			ballSpeedX = -ballSpeedX;
	}

	requestAnimationFrame(gameLoop);
}

let canvas;
let ctx;
let paddleHeight = 100, paddleWidth = 10;
let player1Y, player2Y;
let ballSize = 10;
let ballX, ballY;
let ballSpeedX = 8, ballSpeedY = 1;
const paddleSpeed = 6;
let player1Up = false, player1Down = false;
let player2Up = false, player2Down = false;
