/**
 * A snake game based on the 10 minute coding challenge 
 *  done by The Coding Train in p5.js. Some alterations
 *  have been for own preferences on how the game should
 *  look like.
 *
 * TODO:
 *  - Add documentation for all three files
 *  - Enable restart for the game (or be happy
 *     with page-reaload as restart?)
 *  - Make it so that the snake doesn't collapse
 *     when you die (stop the updating). On the
 *     other hand this migh be a cool feature, but
 *     the updating should stop none the less.
 *  - Make the head a slightly different color?
 *  - Add score?
 *
 * Source:
 *  - https://www.youtube.com/watch?v=AaGK-fj-BAM&t=43s
 *  - https://p5js.org/
 **/

var s;
var food;

var x_tiles = 20;
var y_tiles = 20;
var tile_scale = 20;

// setup is predefined for p5
function setup() {
	createCanvas(tile_scale * x_tiles + 1, tile_scale * y_tiles + 1);
	frameRate(10); // REMOVE

	s = new Snake();
	place_food();
}

function place_food() {
	var col = floor(random(x_tiles))
	var row = floor(random(y_tiles))
	food = new SnakeFood(col * tile_scale, row * tile_scale);
}

// draw is predefined for p5
function draw() {
	background(51);

	// Updating inside draw (..bleuh)
	s.check_box_collision(0, 0, tile_scale * x_tiles, tile_scale * y_tiles);
	s.update();
	s.check_self_collision();
	// if food is eaten then it need to be replaced
	if (s.eat(food)) { 
		place_food();
	}

	// Show stuff
	food.show();
	s.show();
}

// keyPressed is predefined for p5
function keyPressed() {
	if (keyCode == UP_ARROW && s.yspeed != 1 && s.alive) {
		s.dir(0, -1);
	} else if (keyCode == DOWN_ARROW && s.yspeed != -1 && s.alive) {
		s.dir(0, 1);
	} else if (keyCode == RIGHT_ARROW && s.xspeed != -1 && s.alive) {
		s.dir(1, 0);
	} else  if (keyCode == LEFT_ARROW && s.xspeed != 1 && s.alive) {
		s.dir(-1, 0);
	}
}