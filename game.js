// Pong Game - Main Game Logic

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game Objects
const game = {
    playerScore: 0,
    computerScore: 0,
    isRunning: false
};

// Player Paddle
const player = {
    x: 20,
    y: canvas.height / 2 - 60,
    width: 15,
    height: 120,
    dy: 0,
    speed: 6
};

// Computer Paddle
const computer = {
    x: canvas.width - 35,
    y: canvas.height / 2 - 60,
    width: 15,
    height: 120,
    dy: 0,
    speed: 4.5
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 6,
    dy: 6,
    speed: 6
};

// Input tracking
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

let mouseY = canvas.height / 2;

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') keys.ArrowUp = true;
    if (e.key === 'ArrowDown') keys.ArrowDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') keys.ArrowUp = false;
    if (e.key === 'ArrowDown') keys.ArrowDown = false;
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetScore);

// Start Game
function startGame() {
    if (!game.isRunning) {
        game.isRunning = true;
        gameLoop();
    }
}

// Reset Score
function resetScore() {
    game.playerScore = 0;
    game.computerScore = 0;
    game.isRunning = false;
    resetBall();
    updateScore();
    draw();
}

// Update Score Display
function updateScore() {
    document.getElementById('playerScore').textContent = game.playerScore;
    document.getElementById('computerScore').textContent = game.computerScore;
}

// Reset Ball Position
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() - 0.5) * ball.speed;
}

// Update Player Paddle
function updatePlayer() {
    // Keyboard controls
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }

    // Mouse controls
    const paddleCenter = player.y + player.height / 2;
    const distance = mouseY - paddleCenter;

    if (Math.abs(distance) > 5) {
        if (distance > 0 && player.y + player.height < canvas.height) {
            player.y += Math.min(player.speed, distance);
        } else if (distance < 0 && player.y > 0) {
            player.y -= Math.min(player.speed, Math.abs(distance));
        }
    }

    // Keep paddle within bounds
    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
}

// Update Computer Paddle (AI)
function updateComputer() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    const distance = ballCenter - computerCenter;

    // AI tries to center paddle on ball
    if (Math.abs(distance) > 35) {
        if (distance > 0 && computer.y + computer.height < canvas.height) {
            computer.y += computer.speed;
        } else if (distance < 0 && computer.y > 0) {
            computer.y -= computer.speed;
        }
    }

    // Keep paddle within bounds
    computer.y = Math.max(0, Math.min(computer.y, canvas.height - computer.height));
}

// Update Ball
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom wall collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(ball.y, canvas.height - ball.radius));
    }

    // Player paddle collision
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = Math.abs(ball.dx);
        ball.x = player.x + player.width + ball.radius;

        // Add spin based on where ball hits paddle
        const paddleCenter = player.y + player.height / 2;
        const deltaY = ball.y - paddleCenter;
        ball.dy = deltaY * 0.1;
    }

    // Computer paddle collision
    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = -Math.abs(ball.dx);
        ball.x = computer.x - ball.radius;

        // Add spin based on where ball hits paddle
        const paddleCenter = computer.y + computer.height / 2;
        const deltaY = ball.y - paddleCenter;
        ball.dy = deltaY * 0.1;
    }

    // Scoring
    if (ball.x - ball.radius < 0) {
        game.computerScore++;
        updateScore();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        game.playerScore++;
        updateScore();
        resetBall();
    }
}

// Draw Functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
    ctx.shadowBlur = 10;
}

function drawBall() {
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'rgba(255, 0, 255, 0.8)';
    ctx.shadowBlur = 10;
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;

    // Draw elements
    drawCenterLine();
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();
}

// Game Loop
function gameLoop() {
    if (!game.isRunning) return;

    updatePlayer();
    updateComputer();
    updateBall();
    draw();

    requestAnimationFrame(gameLoop);
}

// Initial draw
draw();
updateScore();