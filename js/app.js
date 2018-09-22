/* App.js
 * This file contains the characters of the game. It is wrapped with
 * an IIFE which has the highest scope/global context (window) passed into
 * it similar to engine.js. Also emulating engine.js, is that this script
 * passes character and player back to the global scope to be used within
 * other script such as engine.js.
 */


var App = (function(global) {

    // Helper function to generate random interval.
    // found on stack overflow.
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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
        // var centerX = this.x *

        if (this.x < 0) {
            this.x = ctx.canvas.width;
        } else if (this.x > ctx.canvas.width) {
            this.x = 0;
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
        this.x = 101; // x; // 6/2 * 101 * 101 / 2; // x;
        this.y = 4 * 83 + 83 / 2;
        // this.direction = 'stop';
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.sprite = 'images/char-boy.png';
    };

    Player.prototype.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        // this.y = this.y * this.ySpeed + this.ySpeed / 2;

        if ( this.x < 0 ) {
            // console.log('1 .we got here');
            this.x = 0 ; //ctx.canvas.width; // this.xSpeed;
        } else if (this.x > ctx.canvas.width - 101) {
            // console.log('2. we got here');
            this.x = ctx.canvas.width - 101; //  this.xSpeed;
        }

        if ( this.y < 0 - 83 ) {
            this.y -= this.ySpeed;
        } else if ( this.y > ctx.canvas.height - 83 * 2) {
            this.y -= this.ySpeed; //  - 83;
        }
    };

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    /* Method that takes a direction as a string value for an argument then
     * moves the player accordingly to that argument.
     */
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

    /* Resets the Player back to it's initital state.
     */
    Player.prototype.reset = function() {
        this.x = 101;
        this.y = 4 * 83 + 83 / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player

    var allEnemies = [
        new Enemy(101 * 101 / 2, 0 * 83 + 83 / 2, getRandomInt(1, 5)),
        new Enemy(101 * 101 / 2, 1 * 83 + 83 / 2, getRandomInt(1, 5)),
        new Enemy(101 * 101 / 2, 2 * 83 + 83 / 2, getRandomInt(1, 5))
    ];

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


    global.allEnemies = allEnemies;

})(this);