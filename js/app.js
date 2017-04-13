// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances
    // X and y enemies position and 'speed' is the
    // its speed measurement
    this.x = -1;
    this.y = -1;
    this.speed = -1;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x)  + (this.speed * dt); 
    if (this.x >= 505) {
        // if Enemy reaches the end, it reappears from front
        this.x = 0;
    }
};

// This method draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // two drawbox calls below used for visual detection
    // of Enemies dimension during development
    //drawBox(this.x, this.y + 77, 100, 67, "yellow");
    //drawBox(this.x, this.y, 101, 171, "black");
};

Enemy.prototype.setPoint = function(newX, newY, newSpeed) {
    this.x = newX;
    this.y = newY;
    this.speed = newSpeed;
};


// Player class that represents main player
var Player = function() {
    // Variables applied to Player
    // X and y enemies position and 'speed' is the
    // its speed measurement
    this.x = 200;
    this.y = 386;

    // The image/sprite for Player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // Score, Lives and variable to track game status
    this.score = 0;
    this.lives = 3;

    // 0 - means: Game Continues
    // 1 - means: Player lost all lives, Game Over
    // 2 - means: Player reached x Points, Winner
    this.gameStatus = 0;
};

Player.prototype.update = function(dt) {
    // Calls method to check for collisions
    this.checkCollisions();
    // Calls method to update Score and Lives
    this.renderScoreAndLives();
};

// This method checks whether Player has collision
// with enemies, and if yes resets Player's location
Player.prototype.checkCollisions = function() {
    for (ind = 0; ind < 3; ind++) {
      if (allEnemies[ind].x < (this.x + 18) + 66 && 
        allEnemies[ind].x + 100 > (this.x + 18) && 
        (allEnemies[ind].y + 77) < (this.y + 64) + 77 && 
        67 + (allEnemies[ind].y + 77) > (this.y + 64)) {
        
        // in case of collision, take away one life
        this.lives = this.lives - 1;
        if(this.lives === 0){
            this.gameStatus = 2;
        }
        // and reset Player's location
        this.reset();
      }
    }
};

// This method draws the Player Live and Score on the screen
Player.prototype.renderScoreAndLives = function() {
    document.getElementById("score").innerHTML = 'Score: ' + this.score + ', Lives: ' + this.lives;
};

// This method draws the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // two drawbox calls below used for visual detection
    // of Player's dimension during development
    //drawBox(this.x + 18, this.y + 64, 66, 77, "blue");
    //drawBox(this.x, this.y, 101, 171, "black");
};

// This method moves the Player depending on Key Pressed
Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case "left":
            if (this.x > 0) {
                this.x = this.x - 100;
            }
            break;
        case "right": 
            if (this.x < 400) {
                this.x = this.x + 100;
            }
            break;
        case "up": 
            this.y = this.y - 80;
            if (this.y <= 0) {
                this.score = this.score + 1;
                if(this.score == 3){
                    this.gameStatus = 1;
                }
                this.reset();
            }
            break;
        case "down":
            if (this.y < 380) {
                this.y = this.y + 80;    
            } 
            break;
    }
};

// This method resets Player location 
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 386;
};

// This method draws a a box around the Image
// was used during development to see borders
function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
enemy1.setPoint(0, 60, 20);
enemy2.setPoint(50,140, 50);
enemy3.setPoint(100,220, 50);

var player = new Player(); 
var allEnemies = [enemy1, enemy2, enemy3];


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
