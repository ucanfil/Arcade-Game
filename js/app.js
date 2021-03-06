// Variables needed for DOM manipulation
const players = document.querySelector('ul'),
      start = document.querySelector('#start'),
      gameIntro = document.querySelector('#game-intro'),
      gameLevels = document.querySelectorAll('.game-level'),
      gemInfo = document.querySelector('#gem-info'),
      gemCount = document.querySelector('#gem-count'),
      lifeCount = document.querySelector('#life-count'),
      gemCountMessage = document.querySelector('#message');

let level = 'Easy';
const numEnemies = {
  Hard: 5,
  Medium: 3,
  Easy: 2,
};

gemInfo.style.display = 'none';
let isPaused = false;
let isGameOver = false;

// Clicking start button removes the intro page
start.addEventListener('click', () => {
  gameIntro.style.display = 'none';
  gemInfo.style.display = 'block';
});

// Adding an event listener to player selection which sets player objects sprite value
players.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    player.sprite = e.target.firstElementChild.getAttribute('src');
  } else if (e.target.nodeName === 'IMG') {
    player.sprite = e.target.getAttribute('src');
  }
});

gameLevels.forEach(item => item.addEventListener('click', (e) => {
  level = e.target.textContent;
}));

// Our base class for game entitites
class GameEntities {
  constructor(x, y, width, height, sprite = 'images/enemy-bug.png') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y);
    gameState(isPaused, 'GAME PAUSED...');
    gameOver();
  }
}

// Enemy class inherits from GameEntities
class Enemy extends GameEntities {
  constructor(x, y, width = 100, height = 79, sprite, speed = 100, num = 3) {
    super(x, y, width, height, sprite);
    this.speed = Math.max(100, Math.random() * speed * 100);
    this.num = num;
  }

  render() {
    super.render();
  }

  update(dt) {
    if (this.x > 505 + this.width) {
      this.x = -100 - Math.floor(Math.random() * this.num) * 100;
      this.y = 135 + Math.floor(Math.random() * this.num) * 83;
      this.speed = Math.max(100, Math.random() * this.num * 100);
    }
    this.x += this.speed * dt;
  }
}

// Player class inherits from GameEntities
class Player extends GameEntities {
  constructor(x = 252.5, y = 456.5, width = 70, height = 88, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/char-boy.png';
    this.level = '';
    this.lives = 3;
  }

  update(dt) {
    const player1 = this; // Needed this for closure!
    const tolerance = 25;
    allEnemies.forEach((enemy) => {
      if (player1.x < enemy.x + enemy.width - tolerance && player1.x + player1.width - tolerance > enemy.x &&
        player1.y < enemy.y + enemy.height - tolerance && player1.height - tolerance + player1.y > enemy.y) {
        player1.x = 252.5;
        player1.y = 465;
        player1.lives--;
        lifeCount.textContent = player1.lives;
      }
    });
  }

  render() {
    super.render();
  }

  handleInput(direction) {
    if (!isPaused) {
      switch (direction) {
        case 'left':
          this.x > 50.5 ? this.x -= 101 : this.x;
          break;
        case 'right':
          this.x < 454.5 ? this.x += 101 : this.x;
          break;
        case 'up':
          this.y > 50 ? this.y -= 83 : this.y;
          break;
        case 'down':
          this.y < 456.5 ? this.y += 83 : this.y;
          break;
      }
    }
  }
}

// Gem class extends on GameEntities
class Gem extends GameEntities {
  constructor(x, y, width = 100, height = 114, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/Gem Green.png';
    this.x = 50.5 + Math.floor(Math.random() * 5) * 101;
    this.y = 135 + Math.floor(Math.random() * 3) * 83;
    this.count = 0;
  }

  render() {
    super.render();
  }

  update() {
    const tolerance = 45;
    const gem1 = this;
    if (this.x < player.x + player.width - tolerance && this.x + this.width - tolerance > player.x &&
      this.y < player.y + player.height - tolerance && this.height - tolerance + this.y > player.y) {
      this.count++;
      gemCount.textContent = this.count;
      if (this.count >= 10) {
        gemCountMessage.textContent = 'Go to creek now!';
      }
      this.x = -300;
      this.y = -300;
      setTimeout(() => {
        gem1.x = 50.5 + Math.floor(Math.random() * 5) * 101;
        gem1.y = 135 + Math.floor(Math.random() * 3) * 83;
      }, 3000);
    }
  }
}

// Instantiating objects
const player = new Player(252.5, 465);
const gem = new Gem();

// Instantiating enemies
const allEnemies = [];
newEnemies();

function newEnemies() {
  let enemy;
  const speedFactor = {
    Hard: 1000,
    Medium: 800,
    Easy: 600,
  };
  for (let i = 0; i < numEnemies[level]; i++) {
    enemy = new Enemy(-100, 135, 100, 79, 'images/enemy-bug.png', speedFactor[level], 3);
    allEnemies.push(enemy);
  }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', (e) => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };
  player.handleInput(allowedKeys[e.keyCode]);

  if (e.keyCode === 80) {
    isPaused = !isPaused;
    init();
  }
});

// Game State Function
function gameState(condition, text) {
  if (condition) {
    ctx.font = '50pt VT323';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.fillText(text, 505 / 2, 606 / 2);
    ctx.strokeText(text, 505 / 2, 606 / 2);
  }
}


// Function that controls the game state when game is over
function gameOver() {
  if (gem.count >= 10 && player.y === 50) {
    isGameOver = true;
    gameState(isGameOver, 'YOU WON!');
  } else if (player.lives === 0) {
    isGameOver = true;
    gameState(isGameOver, 'YOU LOSE!');
  }
}
