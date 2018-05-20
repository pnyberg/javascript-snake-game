function SnakeFood(x, y) {
	this.x = x;
	this.y = y;

	this.show = function() {
		fill(255, 0, 100);
		rect(food.x, food.y, tile_scale, tile_scale);
	}
}