// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * textures * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// classic

function classic () {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			var empty_blocks = [];
			
			for (var a = 1; a < (canvas_width >= canvas_height)?(canvas_width):(canvas_height); a++) {
				
				for (var b = 0; b < a * 2 + 1; b++) {
					
					c = 0;
					
					if (map[AI[i].positionX - a + b]) {

						if (map[AI[i].positionX - a + b][AI[i].positionY - a + c]) {

							if (!map[AI[i].positionX - a + b][AI[i].positionY - a + c].colored) {

								empty_blocks.push({
									x: AI[i].positionX - a + b,
									y: AI[i].positionY - a + c,
								});

							}

						}

					}
					
					c = 2 * a;
					
					if (map[AI[i].positionX - a + b]) {

						if (map[AI[i].positionX - a + b][AI[i].positionY - a + c]) {

							if (!map[AI[i].positionX - a + b][AI[i].positionY - a + c].colored) {

								empty_blocks.push({
									x: AI[i].positionX - a + b,
									y: AI[i].positionY - a + c,
								});

							}

						}

					}
					
				}
				
				for (var c = 0; c < a * 2 + 1; c++) {
						
					b = 0;
					
					if (map[AI[i].positionX - a + b]) {

						if (map[AI[i].positionX - a + b][AI[i].positionY - a + c]) {

							if (!map[AI[i].positionX - a + b][AI[i].positionY - a + c].colored) {

								empty_blocks.push({
									x: AI[i].positionX - a + b,
									y: AI[i].positionY - a + c,
								});

							}

						}

					}
				
					b = 2 * a;

					if (map[AI[i].positionX - a + b]) {

						if (map[AI[i].positionX - a + b][AI[i].positionY - a + c]) {

							if (!map[AI[i].positionX - a + b][AI[i].positionY - a + c].colored) {

								empty_blocks.push({
									x: AI[i].positionX - a + b,
									y: AI[i].positionY - a + c,
								});

							}

						}

					}
					
				}
					
				if (empty_blocks.length != 0) {

					break;

				}
				
			}

			var index = Math.floor(Math.random() * empty_blocks.length);

			AI[i].positionX = empty_blocks[index].x;

			AI[i].positionY = empty_blocks[index].y;

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}

}

// cloth

function cloth () {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			var x = 0; 
			
			var y = 0;
			
			do {

				if (AI[i].positionX == AI[i].goal_x && AI[i].positionY == AI[i].goal_y) {
					
					do {
					
						AI[i].goal_x = Math.floor(Math.random() * map.length);

						AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);
						
					} while (map[AI[i].goal_x][AI[i].goal_y].colored);
					
				}
				
				if (AI[i].positionX < AI[i].goal_x) {					
					x = 1;					
				} else if (AI[i].positionX > AI[i].goal_x) {					
					x = -1;					
				} else {					
					x = 0;					
				}
				
				if (AI[i].positionY < AI[i].goal_y) {					
					y = 1;					
				} else if (AI[i].positionY > AI[i].goal_y) {					
					y = -1;					
				} else {					
					y = 0;					
				}
				
				AI[i].positionX += x;

				AI[i].positionY += y;
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}

// wool

var _chasing_target_ = 0;

function wool () {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			var x = 0; 
			
			var y = 0;
			
			do {
				
				if (AI[i].AI_target) {
					
					if (AI[i].positionX == AI[i].goal_x && AI[i].positionY == AI[i].goal_y) {
					
						do {

							AI[i].goal_x = Math.floor(Math.random() * map.length);

							AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);

						} while (map[AI[i].goal_x][AI[i].goal_y].colored);
						
					}
					
				} else {
				
					AI[i].goal_x = AI[_chasing_target_].positionX;

					AI[i].goal_y = AI[_chasing_target_].positionY;

					if (AI[i].positionX == AI[i].goal_x && AI[i].positionY == AI[i].goal_y) {
						
						let tmp = _chasing_target_;
						
						AI[_chasing_target_].AI_target = false;

						do {

							_chasing_target_ = Math.floor(Math.random() * AI.length);

						} while (tmp == _chasing_target_);
						
						AI[_chasing_target_].AI_target = true;

					}
				
				}
					
				if (AI[i].positionX < AI[i].goal_x) {					
					x = 1;					
				} else if (AI[i].positionX > AI[i].goal_x) {					
					x = -1;					
				} else {					
					x = 0;					
				}
				
				if (AI[i].positionY < AI[i].goal_y) {					
					y = 1;					
				} else if (AI[i].positionY > AI[i].goal_y) {					
					y = -1;					
				} else {					
					y = 0;					
				}
				
				AI[i].positionX += x;

				AI[i].positionY += y;
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;
			
			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}

// sand

function sand () {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			var x = 0; 
			
			var y = 0;
					
			do {
						
				AI[i].goal_x = Math.floor(Math.random() * map.length);
					
				AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);
						
			} while (map[AI[i].goal_x][AI[i].goal_y].colored);
				
			AI[i].positionX = AI[i].goal_x;

			AI[i].positionY = AI[i].goal_y;

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}
		
	}
	
}

// glitch

function glitch (max_width , min_width , max_height , min_height , is_square) {
	
	if (is_square == undefined) {
		
		is_square = false;
		
	}
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			do {

				if (AI[i].positionX == AI[i].goal_x && AI[i].positionY == AI[i].goal_y) {
					
					// change goal
					
					var width = Math.floor(Math.random() * (max_width - min_width)) + min_width;
					
					var height = (is_square)?(height = width):(Math.floor(Math.random() * (max_height - min_height)) + min_height);
					
					// change brush position
					
					do {
					
						AI[i].positionX = Math.floor(Math.random() * map.length);

						AI[i].positionY = Math.floor(Math.random() * map[AI[i].positionX].length);
						
					} while (map[AI[i].positionX][AI[i].positionY].colored);
					
					AI[i].last_goal_x = AI[i].positionX;
					
					AI[i].last_goal_y = AI[i].positionY;
					
					AI[i].goal_x = Math.min(Math.max(AI[i].positionX + width * Math.pow(-1 , Math.floor(Math.random() * 2)) , 0) , map.length - 1)
					
					AI[i].goal_y = Math.min(Math.max(AI[i].positionY + height * Math.pow(-1 , Math.floor(Math.random() * 2)) , 0) , map[AI[i].goal_x].length - 1);
					
				} else {
				
					if (AI[i].positionX == AI[i].goal_x) {

						AI[i].positionX = AI[i].last_goal_x;

						if (AI[i].positionY < AI[i].goal_y) {

							AI[i].positionY += 1;

						} else if (AI[i].positionY > AI[i].goal_y) {

							AI[i].positionY -= 1;

						}

					} else if (AI[i].positionX < AI[i].goal_x) {

						AI[i].positionX += 1;

					} else if (AI[i].positionX > AI[i].goal_x) {

						AI[i].positionX -= 1;

					}
					
				}
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}

// left right march

function left_right_march () {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			do {

				
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * shapes * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// circles

function circles (max_radius , min_radius , max_width , min_width) {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			do {
				
				if (AI[i].path.length == 0) {
					
					do {

						AI[i].goal_x = Math.floor(Math.random() * map.length);

						AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);
						
					} while (map[AI[i].goal_x][AI[i].goal_y].colored);
					
					// generate path
					
					let radius = Math.floor(Math.random() * (max_radius - min_radius)) + min_radius;
	
					if (max_width == undefined && min_width == undefined) {
						
						max_width = radius * 2;
						
						min_width = radius * 2;
						
					}
					
					
					AI[i].path.push({
						x_coord: AI[i].goal_x,
						y_coord: AI[i].goal_y
					});
					
					var lower_bound = radius - Math.floor(Math.random() * (max_width - min_width)) - min_width;
					
					lower_bound *= lower_bound;
					
					for (var x = Math.max(0, AI[i].goal_x - radius); x <= Math.min(map.length - 1, AI[i].goal_x + radius); x++) {
							
						for (var y = Math.max(0, AI[i].goal_y - radius); y <= Math.min(map[x].length - 1, AI[i].goal_y + radius); y++) {

							var d2 = Math.pow(x - AI[i].goal_x, 2) + Math.pow(y - AI[i].goal_y, 2);
							
							if (lower_bound <= d2 && d2 <= radius * radius) {
								
								AI[i].path.push({
									x_coord: x,
									y_coord: y,
								});

							}

						}

					}
					
				}
		
				var l = AI[i].path.length - 1;
				
				if (map[AI[i].path[l].x_coord]) {
					
					if (map[AI[i].path[l].x_coord][AI[i].path[l].y_coord]) {

						AI[i].positionX = AI[i].path[l].x_coord;

						AI[i].positionY = AI[i].path[l].y_coord;
						
					}
					
				}
				
				AI[i].path.pop();
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}

// triangles

function triangle (max_radius , min_radius , max_width , min_width) {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			do {
				
				if (AI[i].path.length == 0) {
					
					do {

						AI[i].goal_x = Math.floor(Math.random() * map.length);

						AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);
						
					} while (map[AI[i].goal_x][AI[i].goal_y].colored);
					
					// generate path
					
					let radius = Math.floor(Math.random() * (max_radius - min_radius)) + min_radius;
	
					if (max_width == undefined && min_width == undefined) {
						
						max_width = radius * 2;
						
						min_width = radius * 2;
						
					}
					
					var width = Math.floor(Math.random() * (max_width - min_width)) + min_width;
					
					AI[i].path.push({
						x_coord: AI[i].goal_x,
						y_coord: AI[i].goal_y,
					});
					
					var new_coord = {
						x: AI[i].goal_x,
						y: AI[i].goal_y - radius,
						height: radius * 3 / 2,
					}
					
					for (var y = Math.floor(Math.max(0 , new_coord.y)); y <= Math.ceil(Math.min(map[0].length - 1 , new_coord.y + new_coord.height)); y++) {
						
						let max_x_extent = radius * Math.cos(Math.PI / 6) * (y - (AI[i].goal_y - radius)) / new_coord.height;
						
						for (var x = Math.floor(Math.max(0 , new_coord.x - max_x_extent)); x <= Math.ceil(Math.min(map.length - 1 , new_coord.x + max_x_extent)); x++) {
							
							if (x < new_coord.x - max_x_extent + width || x > new_coord.x + max_x_extent - width) {
							
								AI[i].path.push({
									x_coord: x,
									y_coord: y,
								});
								
							} else if (y < new_coord.y + width || y > new_coord.y + new_coord.height - width) {
								
								AI[i].path.push({
									x_coord: x,
									y_coord: y,
								});
								
							}
							
						}
						
					}
					
				}
		
				var l = AI[i].path.length - 1;
				
				if (map[AI[i].path[l].x_coord]) {
					
					if (map[AI[i].path[l].x_coord][AI[i].path[l].y_coord]) {

						AI[i].positionX = AI[i].path[l].x_coord;

						AI[i].positionY = AI[i].path[l].y_coord;
						
					}
					
				}
				
				AI[i].path.pop();
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}

// squares

// length is half of the full square length

function squares (max_length , min_length , max_width , min_width) {
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			do {
				
				if (AI[i].path.length == 0) {
					
					do {

						AI[i].goal_x = Math.floor(Math.random() * map.length);

						AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);
						
					} while (map[AI[i].goal_x][AI[i].goal_y].colored);
					
					// generate path
					
					let length = Math.floor(Math.random() * (max_length - min_length)) + min_length;
	
					if (max_width == undefined && min_width == undefined) {
						
						max_width = length * 2;
						
						min_width = length * 2;
						
					}
					
					AI[i].path.push({
						x_coord: AI[i].goal_x,
						y_coord: AI[i].goal_y,
					});
			
					var width = Math.floor(Math.random() * (max_width - min_width)) + min_width;
					
					for (var l = length - width, x, y; l <= length; l++) {
						
						if ((y = AI[i].goal_y - l) >= 0) {
							
							for (var j = -l; j <= l; j++) {
								
								x = AI[i].goal_x + j;
								
								if (x >= 0 && x < map.length) {
									
									AI[i].path.push({
										x_coord: x,
										y_coord: y,
									});
									
								}

							}
							
						}
						
						if ((y = AI[i].goal_y + l) < map[0].length) {
							
							for (var j = -l; j <= l; j++) {
								
								x = AI[i].goal_x + j;
								
								if (x >= 0 && x < map.length) {
									
									AI[i].path.push({
										x_coord: x,
										y_coord: y,
									});
									
								}

							}
							
						}
						
						if ((x = AI[i].goal_x - l) >= 0) {
							
							for (var j = -l; j <= l; j++) {
								
								y = AI[i].goal_y + j;
								
								if (y >= 0 && y < map[0].length) {
									
									AI[i].path.push({
										x_coord: x,
										y_coord: y,
									});
									
								}
								
							}
							
						}
						
						if ((x = AI[i].goal_x + l) < map.length) {
							
							for (var j = -l; j <= l; j++) {
								
								y = AI[i].goal_y + j;
								
								if (y >= 0 && y < map[0].length) {
									
									AI[i].path.push({
										x_coord: x,
										y_coord: y,
									});
									
								}
								
							}
							
						}
						
					}
					
				}
		
				var l = AI[i].path.length - 1;
				
				if (map[AI[i].path[l].x_coord]) {
					
					if (map[AI[i].path[l].x_coord][AI[i].path[l].y_coord]) {

						AI[i].positionX = AI[i].path[l].x_coord;

						AI[i].positionY = AI[i].path[l].y_coord;
						
					}
					
				}
				
				AI[i].path.pop();
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}

}

// gliphs

function spiral (turns , width , tolerance , initial_length) {
	
	if (initial_length == undefined) {
		
		initial_length = 0;
		
	}
	
	for (var i = 0; i < AI.length; i++) {

		for (var k = 0; k < brush_speed; k++) {
			
			do {
				
				if (AI[i].path.length == 0) {
					
					do {

						AI[i].goal_x = Math.floor(Math.random() * map.length);

						AI[i].goal_y = Math.floor(Math.random() * map[AI[i].goal_x].length);
						
					} while (map[AI[i].goal_x][AI[i].goal_y].colored);
					
					// generate path
					
					AI[i].path.push({
						x_coord: AI[i].goal_x,
						y_coord: AI[i].goal_y,
					});
					
					let x_dis = -1;
					
					let y_dis = 0;
					
					for (var a = 0; a < turns; a++) {
						
						for (var b = 0; b < (initial_length + tolerance * a) * width; b++) {
							
							if (a % 4 == 0) {

								x_dis++;

							} else if (a % 4 == 1) {

								y_dis++;

							} else if (a % 4 == 2) {

								x_dis--;

							} else if (a % 4 == 3) {

								y_dis--;

							}
							
							for (var c = 0; c < width; c++) {
										
								if (a % 4 == 0) {

									AI[i].path.push({
										x_coord: AI[i].goal_x + x_dis,
										y_coord: AI[i].goal_y + y_dis + c,
									});

								} else if (a % 4 == 1) {

									AI[i].path.push({
										x_coord: AI[i].goal_x + x_dis - c,
										y_coord: AI[i].goal_y + y_dis,
									});

								} else if (a % 4 == 2) {

									AI[i].path.push({
										x_coord: AI[i].goal_x + x_dis,
										y_coord: AI[i].goal_y + y_dis - c,
									});

								} else if (a % 4 == 3) {

									AI[i].path.push({
										x_coord: AI[i].goal_x + x_dis + c,
										y_coord: AI[i].goal_y + y_dis,
									});

								}
								
							}
							
						}
						
						if (a % 4 == 0) {

							x_dis += width;

							y_dis -= 1;

						} else if (a % 4 == 1) {

							x_dis += 1;

							y_dis += width;

						} else if (a % 4 == 2) {

							x_dis -= width;

							y_dis += 1;

						} else if (a % 4 == 3) {

							x_dis -= 1;

							y_dis -= width;

						}
						
					}
					
					AI[i].path.reverse();
					
				}
				
				var l = AI[i].path.length - 1;
				
				if (map[AI[i].path[l].x_coord]) {
					
					if (map[AI[i].path[l].x_coord][AI[i].path[l].y_coord]) {

						AI[i].positionX = AI[i].path[l].x_coord;

						AI[i].positionY = AI[i].path[l].y_coord;
						
					}
					
				}
				
				AI[i].path.pop();
				
			} while (map[AI[i].positionX][AI[i].positionY].colored);

			canvas.beginPath();

			canvas.fillStyle = AI[i].color;

			canvas.fillRect(AI[i].positionX , AI[i].positionY , 1 , 1);

			map[AI[i].positionX][AI[i].positionY].color = AI[i].color;

			if (!continuity) {

				map[AI[i].positionX][AI[i].positionY].colored = true;
				
			}

		}

	}
	
}




