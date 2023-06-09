// Initialize game board
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Define game elements
const snake = {
  x: 10,
  y: 10,
  dx: 10,
  dy: 0,
  cells: []
};

const food = {
  x: Math.floor(Math.random() * 20) * 10,
  y: Math.floor(Math.random() * 20) * 10
};

// Define game loop
function loop() {
  // Move snake
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Check for collision with food
  if (snake.x === food.x && snake.y === food.y) {
    // Increase snake length
    snake.cells.push({ x: snake.x, y: snake.y });

    // Move food to random location
    food.x = Math.floor(Math.random() * 20) * 10;
    food.y = Math.floor(Math.random() * 20) * 10;
  }

  // Check for game over conditions
  if (snake.x < 0 || snake.x > 190 || snake.y < 0 || snake.y > 190) {
    // Game over
    clearInterval(gameInterval);
    alert('Game over!');
  }

  // Draw game elements
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  snake.cells.forEach(cell => ctx.fillRect(cell.x, cell.y, 10, 10));
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Start game loop
const gameInterval = setInterval(loop, 100);

// Detect head movements using tracking.js and map to snake movements
const video = document.getElementById('video');
const tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);

tracking.track('#video', tracker, { camera: true });

tracker.on('track', event => {
  if (event.data.length === 0) {
    // No face detected
    return;
  }

  // Get position of head
  const position = event.data[0].bbox;
  const centerX = position[0] + position[2] / 2;
  const centerY = position[1] + position[3] / 2;

  // Map head position to snake movements
  if (centerX < canvas.width / 3) {
    snake.dx = -10;
    snake.dy = 0;
  } else if (centerX > canvas.width * 2 / 3) {
    snake.dx = 10;
    snake.dy = 0;
  } else if (centerY < canvas.height / 3) {
    snake.dx = 0;
    snake.dy = -10;
  } else if (centerY > canvas.height * 2 / 3) {
    snake.dx = 0;
    snake.dy = 10;
  }
});
