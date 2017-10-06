function baseTest() {
	console.log('baseTest');
}

class baseObject {
	constructor(x, y, type, width, height) {
		this.pos = new Vector2(x, y);
		this.type = type;
		this.width = width;
		this.height = height;
		this.id = getRnd(0, 100000);
	}
	moveRight(val) {
		this.pos.Add(val, 0);
	}
	moveLeft(val) {
		this.pos.Add(-val, 0);
	}
	moveUp(val) {
		this.pos.Add(0, -val);
	}
	moveDown(val) {
		this.pos.Add(0, val);
	}
	Draw(width, height, color){
		DrawRect(this.pos.x - cellSize / 2, this.pos.y - cellSize / 2, width, height, color);
	}
	Update(speed) {

	}
	AlignToGrid() {
		this.pos.x = Math.round(this.pos.x / cellSize) * cellSize;
		this.pos.y = Math.round(this.pos.y / cellSize) * cellSize;
	}
}

class Player extends baseObject {
	constructor(x, y, type, width, height, color) {
		super(x, y, type, width, height);
		this.color = color;
	}
	Draw() {
		DrawRect(this.pos.x - this.width / 20, this.pos.y, this.width / 10, this.height, this.color);
		DrawArc(this.pos.x, this.pos.y, this.width / 2, this.color);
	}
	Update() {

	}
}

class Box extends baseObject {
	constructor(x, y, type, width, height, color) {
		super(x, y, type, width, height);
		this.color = color;
	}
	Update(speed) {
		
	}
	Draw() {
		DrawRect(this.pos.x - cellSize / 2, this.pos.y - cellSize / 2, this.width, this.height, this.color);
	}
}

class Mouse extends baseObject {
	constructor() {
		super(0, 0, 'Mouse');
		this.DragObj = undefined;
		this.mousePress = false;
	}
	SetDragObj(Obj) {
		this.DragObj = Obj;
	}
	DragRelease() {
		this.DragObj = undefined;
	}
	Press() {
		this.mousePress = true;
	}
	Up() {
		this.mousePress = false;
	}
	IsPress() {
		return this.mousePress;
	}
	Update() {}
	Draw() {}
}

class Camera extends baseObject {
	constructor(target, objects) {
		super(0, 0, 'Camera');
		this.target = target;
		this.objects = objects;
		this.deltaPos = new Vector2().Zero();
		this.mouseDeltaPos = new Vector2().Zero;
	}
	Update() {
		this.mouseDeltaPos = this.pos.DecV2(mouse.pos);
		// this.target.pos.SetV2(this.mouseDeltaPos);
		for (var i = 0; i < this.objects.length; i++) {
			if (this.target.id != this.objects[i].id) {
				this.objects[i].pos.AddV2(this.deltaPos);
			}
		}
		this.deltaPos = new Vector2().Zero();
	}
	setTarget(target) {
		this.deltaPos = this.pos.DecV2(target.pos);
		this.target = this;
		this.Update();
		this.target = target;
		this.deltaPos = new Vector2().Zero();
	}
	Draw() {}
	moveRight(val) {
		this.deltaPos.x = -val;
	}
	moveLeft(val) {
		this.deltaPos.x = val;
	}
	moveUp(val) {
		this.deltaPos.y = val;
	}
	moveDown(val) {
		this.deltaPos.y = -val;
	}
	ScaleUp(val) {
		Speed *= val;
		cellSize *= val;
		for (var i = 0; i < Objects.length; i++) {
			Objects[i].width *= val;
			Objects[i].height *= val;
			Objects[i].pos.Mul(val, val);
		}
	}
	ScaleDown(val) {
		Speed /= val;
		cellSize /= val;
		for (var i = 0; i < Objects.length; i++) {
			Objects[i].width /= val;
			Objects[i].height /= val;
			Objects[i].pos.Div(val, val);
		}
	}
}

function findObjecByType(type) {
	for (var i = 0; i < Objects.length; i++) {
		if (Objects[i].type === type) {
			return Objects[i];
			break;
		}
	}
}

function findObjecById(Id) {
	for (var i = 0; i < Objects.length; i++) {
		if (Objects[i].id === Id) {
			return Objects[i];
			break;
		}
	}
}