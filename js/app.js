/* App.js
 * This file contains the characters of the game. It is wrapped with
 * an IIFE which has the highest scope/global context (window) passed into
 * it similar to engine.js. Also emulating engine.js, is that this script
 * passes character and player back to the global scope to be used within
 * other script such as engine.js.
 */


var App = (function(global) {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // // Setup the canvas
    // var canvas = document.getElementsByTagName('canvas')[0];
    // if (!canvas) {
    //     throw new Error(`No canvas found: ${canvas}.`);
    // }


    // Enemies our player must avoid
    var Enemy = function(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;

        //
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

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player

    var allEnemies = [
        new Enemy(101 * 101 / 2, 0 * 83 + 83 / 2, getRandomInt(1, 5)),
        new Enemy(101 * 101 / 2, 1 * 83 + 83 / 2, getRandomInt(1, 5)),
        new Enemy(101 * 101 / 2, 2 * 83 + 83 / 2, getRandomInt(1, 5))
    ];



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