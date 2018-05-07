// Our base class for game entitites
class GameEntities {
  constructor(x, y, width = 70, height = 88, sprite = 'images/enemy-bug.png') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y);
  };
};

// Enemy class inherits from GameEntities
class Enemy extends GameEntities {
  constructor(x, y, width = 100, height = 79, sprite, speed = 100, num = 5) {
    super(x, y, width, height, sprite);
    this.speed = speed;
    this.num = num;
  }

  render() {
    super.render();
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y);
  };

  update(dt) {
    if (this.x > 505 + this.width) {
      this.x = -100 - Math.floor(Math.random() * this.num) * 100;
      this.y = 135 + Math.floor(Math.random() * this.num) * 83;
      this.speed = Math.max(100, Math.floor(Math.random() * this.num) * 100);
    };
    this.x += this.speed * dt;
  }
}

// Player class inherits from GameEntities
class Player extends GameEntities {
  constructor(x = 252.5, y = 456.5, width, height, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {
    const item = this; // Neded this for closure!
    const tolerance = 25;
    allEnemies.forEach(function(enemy) {
      if (item.x < enemy.x + enemy.width - tolerance && item.x + item.width - tolerance > enemy.x &&
        item.y < enemy.y + enemy.height - tolerance && item.height - tolerance + item.y > enemy.y) {
          item.x = 252.5;
          item.y = 465;
      };
    });

  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width / 2, this.y);
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


const level = 'easy';
const numEnemies = level === 'hard' ? 12 : level === 'medium' ? 9 : 6;


const numOfEnemies = 2;
let enemy;
const allEnemies = [];

for (let i = 0; i < numOfEnemies; i++) {
  enemy = new Enemy(-100, 135, 100, 79, 'images/enemy-bug.png', 100, 3);
  allEnemies.push(enemy);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(252.5, 465);



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
