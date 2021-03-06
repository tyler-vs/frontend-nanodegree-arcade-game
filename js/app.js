/* App.js
 * This file contains the characters of the game. It is wrapped with
 * an IIFE which has the highest scope/global context (window) passed into
 * it similar to engine.js. Also emulating engine.js, is that this script
 * passes character and player back to the global scope to be used within
 * other script such as engine.js.
 */


var App = (function(global) {

    // Keeps track of the players total score.
    var score = 0;

    // Helper function to generate random interval.
    // found on stack overflow.
    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var block = {
        width: 101,
        height: 83, // art assets is 101, 171 so 171/2 = ~83.
    };

    // Enemies our player must avoid
    var Enemy = function(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;

        // Speed
        this.xSpeed = speed;

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
        this.x += this.xSpeed + dt;


        // Check for a wall collision
        if (this.x > ctx.canvas.width) {
            // Randomize the speed again
            this.xSpeed = getRandomInt(1,5);
            // Position back to the left side and add
            // an negative offset so it re-appears
            // offscreen.
            this.x = 0 + -block.width;
        }

        // Check for collision with player)
        if ( this.x < player.x + 101  &&
             this.x + 101  > player.x &&
             // Reduce the total width and divide by 2 (like a circle radius)
             // for better collision detection.
             this.y < player.y + ((83 - 20) / 2) &&
             this.y + ((83 - 20) / 2) > player.y ) {

            // The objects are touching
            // console.log('touching');
            player.reset();
        }

    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Now write your own player class
    // This class requires an update(), render() and
    // a handleInput() method.

    // Player constructor function.
    var Player = function() {
        this.x = 101 * 2;
        this.y = 4 * 83 + 83 / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.sprite = 'images/char-boy.png';
    };

    // Method that updates the x and y coordinates of the player.
    Player.prototype.update = function() {

        // Update x and y for player position.
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Check to make sure that is the player does not
        // go out beyond the top or bottom of the canvas.
        if (this.x < 0 || this.x > ctx.canvas.width - 101) {
            this.x -= this.xSpeed;
        }

        if (this.y < -83 || this.y > ctx.canvas.height - (83 * 2)) {
            this.y -= this.ySpeed;
        }

        // Check for winning conditions
        if (this.y < 83) {
            // Update the score
            score++;
            // Winning conditionals
            if (score === 3) {
                myModal.updateModalContent(`You Win! Hurray, you scored: ${score} many time(s).`);
                myModal.showModal();
            }
            // Reset the player (also prevents "re-scoring")
            this.reset();
        }

        // Reset the speed so that player moves in a step
        // instead of continously as the Enemies do.
        this.xSpeed = 0;
        this.ySpeed = 0;
    };

    // Draw the character sprite onto the canvas. Pretty sure the x and
    // y will refer to the top, left coords of the sprite image.
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Method that takes a direction as a string value for an argument then
    // moves the player accordingly to that argument.
    Player.prototype.handleInput = function(direction) {
        // If a key pressed other than the ones being sought for in the
        // `allowedKeys` object then undefined will be passed so we ingore
        // those key movements.
        if (direction === undefined) {
            return;
        }

        // combination of if..else statements to determine the x and y coordinates
        // of where the player should move to next.
        if ( direction === 'up' ) {
            this.xSpeed = 0;
            this.ySpeed = -83;
        } else if ( direction === 'down' ) {
            this.xSpeed = 0;
            this.ySpeed = 83;
        } else if ( direction === 'right' ) {
            this.xSpeed = 101;
            this.ySpeed = 0;
        } else if ( direction === 'left' ) {
            this.xSpeed = -101;
            this.ySpeed = 0;
        } else if ( direction === 'stop' ) {
            this.xSpeed = 0;
            this.ySpeed = 0;
        }

        // Update the player here! (Instead of from within engine.js)
        this.update();
    };

    // Player.prototype.checkCollision = function() {};

    // Resets the Player back to it's initital state.
    Player.prototype.reset = function() {
        this.x = 101 * 2;
        this.y = 4 * 83 + 83 / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    var allEnemies = [
        new Enemy(101 * 101 / 2, 0 * 83 + 83 / 2, getRandomInt(1, 5)),
        new Enemy(101 * 101 / 2, 1 * 83 + 83 / 2, getRandomInt(1, 5)),
        new Enemy(101 * 101 / 2, 2 * 83 + 83 / 2, getRandomInt(1, 5))
    ];

    // Place the player object in a variable called player
    var player = new Player();

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

    // Add `allEnemeies` and `player` to the global object to
    // be used outside of this app.js script.
    global.allEnemies = allEnemies;
    global.player = player;





    class Modal {

      constructor() {
        this.hideButtonEl = document.querySelector('.js-modal-hide');
        this.modalEl = document.querySelector('.js-modal');
        this.modalWindowEl = document.querySelector('.js-modal-window');
        this.modalContentEl = document.querySelector('.modal__content .lead');

        // this.modalContent = this.modalContentEl.

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateModalContent = this.updateModalContent.bind(this);

        this.addEventListeners();
      }

      addEventListeners() {
        this.hideButtonEl.addEventListener('click', this.hideModal);
        this.modalEl.addEventListener('click', this.hideModal);
        this.modalWindowEl.addEventListener('click', this.blockClicks);
      }

      blockClicks (evt) {
        evt.stopPropagation();
      }

      showModal() {
        this.modalEl.classList.add('modal--active');
      }

      hideModal() {
        this.modalEl.classList.remove('modal--active');
      }

      updateModalContent(str) {
        this.modalContentEl.textContent = str;
      }
    }

    var myModal = new Modal();



})(this);