function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.tail = [];
	this.tail_updated = false;
	this.alive = true;

	this.dir = function(xspeed, yspeed) {
		this.xspeed = xspeed;
		this.yspeed = yspeed;
	}

	this.eat = function(food) {
		if (this.x != food.x || this.y != food.y) {
			return false;
		}

		this.grow();

		return true;
	}

	this.grow = function() {
		this.tail[this.tail.length] = createVector(this.x, this.y);
		this.tail_updated = true;
	}

	this.check_box_collision = function(min_x, min_y, max_x, max_y) {
		if (this.x == min_x && this.xspeed == -1) {
			this.kill_snake();
		} else if (this.x == max_x - tile_scale && this.xspeed == 1) {
			this.kill_snake()
		} else if (this.y == min_y && this.yspeed == -1) {
			this.kill_snake();
		} else if (this.y == max_y - tile_scale && this.yspeed == 1) {
			this.kill_snake();
		}
	}

	this.check_self_collision = function() {
		for (var i = 0 ; i < this.tail.length ; i++) {
			if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
				this.kill_snake();
			}
		}
	}

	this.kill_snake = function() {
		this.alive = false;
		this.xspeed = 0;
		this.yspeed = 0;

		console.log("You died!")
	}

	this.update = function() {
		// update tail
		for (var i = this.tail.length-1 ; i > 0 ; i--) {
			if (this.tail_updated && i == this.tail.length-1) {
				this.tail_updated = false;
				continue;
			}
			this.tail[i] = this.tail[i-1];
		}
		if (this.tail.length > 0) {
			this.tail[0] = createVector(this.x, this.y);
		}

		// moving the head (in x and y dimension)
		this.x = this.x + this.xspeed * tile_scale;
		this.y = this.y + this.yspeed * tile_scale;

		// setting bounds for x and y
		this.x = constrain(this.x, 0, width-tile_scale-1);
		this.y = constrain(this.y, 0, height-tile_scale-1);
	}

	this.show = function() {
		fill(255);
		for (var i = 0 ; i < this.tail.length ; i++) {
			rect(this.tail[i].x, this.tail[i].y, tile_scale, tile_scale);
		}
		if (!this.alive) {
			fill(255, 0, 0);
		}
		rect(this.x, this.y, tile_scale, tile_scale);
	}
}