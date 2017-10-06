function mathTest() {
	console.log('mathTest');
}

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	Zero() {
		return new Vector2(0, 0);
	}
	SetV2(val) {
		this.x = val.x;
		this.y = val.y;
	}
	Set(x, y) {
		this.x = x;
		this.y = y;
	}
	Add(x, y) {
		this.x += x;
		this.y += y;
	}
	AddV2(val) {
		this.x += val.x;
		this.y += val.y;
	}
	MulV2(val) {
		this.x *= val.x;
		this.y *= val.y;
	}
	DivV2(val) {
		this.x /= val.x;
		this.y /= val.y;
	}
	Div(x, y) {
		this.x /= x;
		this.y /= y;
	}
	Mul(x, y) {
		this.x *= x;
		this.y *= y;
	}

	DecV2(val) {
		return new Vector2(this.x - val.x, this.y - val.y);
	}
	V2Equals(val) {
		if (this.x == val.x & this.y == val.y) {
			return true;
		} else {
			return false;
		}
	}
}

function posIntersection(pos, obj) {
	if ((pos.x >= obj.x - cellSize / 2 & pos.x <= obj.x + cellSize / 2) &
			(pos.y <= obj.y + cellSize / 2 & pos.y >= obj.y - cellSize / 2)) {
		return true;
	} else {
		return false;
	}
}

function objectOnScreen(objPos) {
	if ((objPos.x > -cnvWidth / 2 - cellSize & objPos.x < cnvWidth / 2 + cellSize) &
		objPos.y > -cnvHeight / 2 - cellSize & objPos.y < cnvHeight / 2 + cellSize)			
	{
		return true;
	} else {
		return false;
	}
}

function objectOnScreenCount() {
	let count = 0;
	for (var i = 0; i < Objects.length; i++) {
		if (objectOnScreen(Objects[i].pos)) {
			count++;
		}
	}
	return count;
}

function AlignToGrid(pos) {
	let x = Math.round(pos.x / cellSize) * cellSize;
	let y = Math.round(pos.y / cellSize) * cellSize;
	return new Vector2(x, y);
}

function getUniqueAlignedPos() {
	let canPlace = true;
	let pos = new Vector2().Zero();
	do {
		canPlace = true;
		pos.x = getRnd(-cnvWidth * 10, cnvWidth * 10);
		pos.y = getRnd(-cnvHeight * 10, cnvHeight * 10);
		pos = AlignToGrid(pos);
		for (var i = 0; i < Objects.length; i++) {
			if (pos.V2Equals(Objects[i].pos)) {
				canPlace = false;
				break;
			}
		}
	}	while(!canPlace);
	return pos;
}

function objectsIntersection(obj1, obj2) {
	
}

function getUniquePos() {
	let canPlace = true;
	let pos = new Vector2().Zero();
	do {
		canPlace = true;
		pos.x = getRnd(-cnvWidth * 10, cnvWidth * 10);
		pos.y = getRnd(-cnvHeight * 10, cnvHeight * 10);
		for (var i = 0; i < Objects.length; i++) {
			if (posIntersection(pos, Objects[i].pos)) {
				canPlace = false;
				break;
			}
		}
	}	while(!canPlace);
	return pos;
}