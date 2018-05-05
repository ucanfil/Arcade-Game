// Enemies our player must avoid
class GameEntities {
  constructor(x, y, width = 101, height = 171, sprite = 'images/enemy-bug.png') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y - this.height / 2);
  };
};

class Enemy extends GameEntities {
  constructor(x, y, width, height, sprite, speed = 100, num = 5) {
    super(x, y, width, height, sprite);
    this.x = -100;
    this.y = 143 + Math.floor(Math.random() * 3) * 83;
    this.num = num;
    this.speed = Math.max(Math.floor(Math.random() * (num - 3)) * 100, Math.floor(Math.random() * num) * 100);
  }

  render() {
    super.render();
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y - this.height / 2);
  };

  update(dt) {
    if (this.x > 505 + this.width) {
      this.x = -100;
    }
    this.x += this.speed * dt;
  }
}

class Player extends GameEntities {
  constructor(x = 252.5, y = 456.5, width, height, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {

  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y - this.height / 2.5);
  }

  handleInput(direction) {
    switch (direction) {
      case 'left':
        this.x > 50.5 ? this.x -= 101 : this.x;
        break;
      case 'right':
        this.x < 454.5 ? this.x += 101 : this.x;
        break;
      case 'up':
        this.y > 41.5 ? this.y -= 83 : this.y;
        break;
      case 'down':
        this.y < 456.5 ? this.y += 83 : this.y;
        break;
    }
  }
};



/* const Enemy = function (x = -100, y = 143, width = 101, height = 171) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = 143 + Math.floor(Math.random() * 3) * 83;
    this.speed = Math.max(Math.floor(Math.random() * 2) * 100, Math.floor(Math.random() * 5) * 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505 + this.width) {
      this.x = -100;
    }
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y - this.height / 2);
}; */

const level = 'easy';
const numEnemies = level === 'hard' ? 12 : level === 'medium' ? 9 : 6;

const allEnemies = [];

for (let i = 0; i < 6; i++) {
  num = 6;
  randomX = -100 - Math.floor(Math.random() * 3) * 100;
  randomY = 143 + Math.floor(Math.random() * 3) * 83;

  speed = Math.max(Math.floor(Math.random() * (num - 3)) * 100, Math.floor(Math.random() * num) * 100);
  let enemy = new Enemy(randomX, randomY, speed, num);
  allEnemies.push(enemy);
}
/*
constructor(x, y, width, height, sprite, speed = 100, num = 5)
this.x = -100;
this.y = 143 + Math.floor(Math.random() * 3) * 83;
this.num = num;
this.speed = Math.max(Math.floor(Math.random() * (num - 3)) * 100, Math.floor(Math.random() * num) * 100); */

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/* const Player = function(x, y, width = 101, height = 171) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y - this.height / 2.5);
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
      case 'left':
        this.x > 50.5 ? this.x -= 101 : this.x;
        break;
      case 'right':
        this.x < 454.5 ? this.x += 101 : this.x;
        break;
      case 'up':
        this.y > 41.5 ? this.y -= 83 : this.y;
        break;
      case 'down':
        this.y < 456.5 ? this.y += 83 : this.y;
        break;
    };
}; */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(252.5, 456.5);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
