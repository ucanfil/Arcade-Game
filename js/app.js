const players = document.querySelector("ul");
const start = document.querySelector("#start");
const gameIntro = document.querySelector("#game-intro");
const gameLevels = document.querySelectorAll(".game-level");


let level = "";
let numEnemies = {
  'Hard': 5,
  'Medium': 3,
  'Easy': 2
};


// Clicking start button removes the intro page
start.addEventListener("click", function () {
  gameIntro.style.display = "none";
});

// Adding an event listener to player selection which sets player objects sprite value
players.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    player.sprite = e.target.firstElementChild.getAttribute("src");
  } else if (e.target.nodeName === "IMG") {
    player.sprite = e.target.getAttribute("src");
  };
});

gameLevels.forEach(item => item.addEventListener("click", function (e) {
  level = e.target.textContent;
  newEnemies();
})
);

// Our base class for game entitites
class GameEntities {
  constructor(x, y, width, height, sprite = 'images/enemy-bug.png') {
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
  constructor(x, y, width = 100, height = 79, sprite, speed = 100, num = 3) {
    super(x, y, width, height, sprite);
    this.speed = Math.max(100, Math.random() * speed * 100);
    this.num = num;
  }

  render() {
    super.render();
  };

  update(dt) {
    if (this.x > 505 + this.width) {
      this.x = -100 - Math.floor(Math.random() * this.num) * 100;
      this.y = 135 + Math.floor(Math.random() * this.num) * 83;
      this.speed = Math.max(100, Math.random() * this.num * 100);
    };
    this.x += this.speed * dt;
  }
}

// Player class inherits from GameEntities
class Player extends GameEntities {
  constructor(x = 252.5, y = 456.5, width = 70, height = 88, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/char-boy.png';
    this.level = "";
  }

  update(dt) {
    const player1 = this; // Needed this for closure!
    const tolerance = 25;
    allEnemies.forEach(function(enemy) {
      if (player1.x < enemy.x + enemy.width - tolerance && player1.x + player1.width - tolerance > enemy.x &&
        player1.y < enemy.y + enemy.height - tolerance && player1.height - tolerance + player1.y > enemy.y) {
          player1.x = 252.5;
          player1.y = 465;
      };
    });
  };

  render() {
    super.render();
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
        this.y > 50 ? this.y -= 83 : this.y;
        break;
      case 'down':
        this.y < 456.5 ? this.y += 83 : this.y;
        break;
    }
  }
};

// Gem class extends on GameEntities
class Gem extends GameEntities {
  constructor(x, y, width = 100, height = 114, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/Gem Green.png';
    this.x = 50.5 + Math.floor(Math.random() * 5) * 101;
    this.y = 135 + Math.floor(Math.random() * 3) * 83;
    this.count = 0;
  };

  render() {
    super.render();
  };

  update() {
    const tolerance = 25;
    const gem1 = this;
    if (this.x < player.x + player.width - tolerance && this.x + this.width - tolerance > player.x &&
      this.y < player.y + player.height - tolerance && this.height - tolerance + this.y > player.y) {
        this.count++;
        this.x = -300;
        this.y = -300;
        setTimeout(function() {
            gem1.x = 50.5 + Math.floor(Math.random() * 5) * 101;
            gem1.y = 135 + Math.floor(Math.random() * 3) * 83;
        }, 3000);
    };

    if (this.count >= 10 && player.y === 50) {
      console.log("Congrats");
    }
  };
};

class Heart extends Gem {
  constructor(x, y, width = 91, height = 91, sprite) {
    super(x, y, width, height, sprite);
    this.sprite = 'images/Heart.png';
  }

  render() {
    if (gem.count % 4 === 0 && gem.count !== 0) {
      super.render();
    };
  };

  update() {
    const tolerance = 25;
    const heart1 = this;
    if (this.x < player.x + player.width - tolerance && this.x + this.width - tolerance > player.x &&
      this.y < player.y + player.height - tolerance && this.height - tolerance + this.y > player.y) {
      this.count++;
      this.x = -300;
      this.y = -300;
    };
  };
};

// Instantiating objects
const player = new Player(252.5, 465);
const gem = new Gem();
const heart = new Heart();

// Instantiating enemies
const allEnemies = [];

function newEnemies() {
  let enemy;
  let speedFactor = {
    'Hard': 1000,
    'Medium': 800,
    'Easy': 600,
  };
  for (let i = 0; i < numEnemies[level]; i++) {
    enemy = new Enemy(-100, 135, 100, 79, 'images/enemy-bug.png', speedFactor[level], 3);
    allEnemies.push(enemy);
  }
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});