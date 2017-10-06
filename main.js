var cnv;
var ctx;
var cnvWidth;
var cnvHeight;
var mouse;
var cam;
var cellSize = 25;
var Speed = 500;
var cnvCenter;
var cnvLeft;
var cnvRight;
var cnvTop;
var cnvBottom;
var dirPress = new Array(4);
var Objects = new Array();

function onLoad() {
	cnv = document.getElementById('cnvs');
	ctx = cnv.getContext('2d');
	cnv.addEventListener('mousemove', mouseMove, false);
  cnv.addEventListener('mousedown', mouseDown, false);
  cnv.addEventListener('mouseup', mouseUp, false);
  document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	cnvWidth = cnv.width;
	cnvHeight = cnv.height;
	cnvCenter = new Vector2(Math.round(cnvWidth / 2), Math.round(cnvHeight / 2));
	cnvLeft = -cnvWidth / 2;
	cnvRight = cnvWidth / 2;
	cnvTop = -cnvHeight / 2;
	cnvBottom = cnvHeight / 2;
	ctx.translate(cnvCenter.x, cnvCenter.y);
	Objects.push(new Player(0, 0, 'Player1', cellSize, cellSize, '#090'));
	Objects.push(new Player(50, 100, 'Player2', cellSize, cellSize, '#900'));
	mouse = new Mouse();
	cam = new Camera(Objects[0], Objects);
	
}

function mouseMove(e) {
	mouse.pos.Set(
		e.pageX - 8 - cnvCenter.x, 
		e.pageY - 50 - cnvCenter.y);
}

function mouseDown(e) {
	mouse.Press();
	for (var i = 0; i < Objects.length; i++) {
		if (posIntersection(mouse.pos, Objects[i].pos) &
				Objects[i].id != cam.target.id) {
			mouse.SetDragObj(Objects[i]);
			break;
		}
	}
}

function mouseUp(e) {
	mouse.Up();
	if (mouse.DragObj) {
		// mouse.DragObj.AlignToGrid();
	}
	mouse.DragRelease();
}

function keyDownHandler(e) {
	let Scale = 1.2;
  if (e.keyCode == 39) {dirPress[0] = true;}
  if (e.keyCode == 37) {dirPress[1] = true;}
  if (e.keyCode == 38) {dirPress[2] = true;}
  if (e.keyCode == 40) {dirPress[3] = true;}
  if (e.keyCode == 49) {cam.setTarget(findObjecByType('Player1'));}
  if (e.keyCode == 50) {cam.setTarget(findObjecByType('Player2'));}
  if (e.keyCode == 51) {cam.setTarget(cam);}
  if (e.keyCode == 187) {cam.ScaleUp(Scale);}
  if (e.keyCode == 189) {cam.ScaleDown(Scale);}
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {dirPress[0] = false;}
  if (e.keyCode == 37) {dirPress[1] = false;}
  if (e.keyCode == 38) {dirPress[2]	= false;}
  if (e.keyCode == 40) {dirPress[3] = false;}
}

function Render(step) {
	ctx.clearRect(cnvLeft, cnvTop, cnvWidth, cnvHeight);
	for (var i = Objects.length - 1; i >= 0; i--) {
		if (objectOnScreen(Objects[i].pos))	
		{
			ctx.beginPath();
			Objects[i].Draw();
			ctx.closePath();
		}
	}
	ctx.fillStyle = 'White';
	DrawText(cnvLeft + 5, cnvTop + 25, 'Object displey:' + objectOnScreenCount());
}

function Update(dt) {
	if (dirPress[0]){cam.moveRight(Speed * dt);}
	if (dirPress[1]){cam.moveLeft(Speed * dt);}
	if (dirPress[2]){cam.moveUp(Speed * dt);}
	if (dirPress[3]){cam.moveDown(Speed * dt);}
	cam.Update();
	if (mouse.DragObj) {
		mouse.DragObj.pos.SetV2(new Vector2(
			mouse.pos.x,
			mouse.pos.y));
	}
	// if (mouse.IsPress()) {
	// 	Objects.push(new Box(mouse.pos.x, mouse.pos.y, 'Box', cellSize, cellSize, '#333'));
	// }
	for (var i = 0; i < Objects.length; i++) {
		Objects[i].Update(Speed / 100);
	}
}

var last = performance.now(),
	  step = 1 / 120,
	  dt = 0,
	  now;
var frame = () => {
  now = performance.now();
  dt = dt + Math.min(1, (now - last) / 1000);
  while(dt > step) {
    dt = dt - step;
    Update(step);
  }
  last = now;
  Render(dt);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);