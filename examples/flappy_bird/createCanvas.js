document.getElementById('createCanvas').innerHTML = '<canvas id="myCanvas" width="' + window.innerWidth + '" height="' + window.innerHeight + '"></canvas>';

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.font = '20px Arial';
var displayWidth = window.innerWidth;
var displayHeight = window.innerHeight;
var width = canvas.offsetWidth;
var height = canvas.offsetHeight;
const btn = document.getElementById('main');
var key = null;
var keyCode = null;
var frameDelay = 100;
var mouseX = 0;
var mouseY = 0;
var scrollX = 0;
var scrollY = 0;
var mode = 'simple';
var autoFlood = true;
var touches = null;
var angleMode = 'degree';
var mouseIsDown = false;
var mouseButton = null;
var disableRightClick = false;
var progressX = 0;
var progressY = 0;
var BACKSPACE = 8;
var TAB = 9;
var ENTER = 13;
var SHIFT = 16;
var CTRL = 17;
var ALT = 18;
var PAUSE = 19;
var CAPS = 20;
var ESC = 27;
var PAGEUP = 33;
var PAGEDOWN = 34;
var end = 35;
var home = 36;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var PRINT = 44;
var INSERT = 45;
var DELETE = 46;
var SELECT = 93;
var NUM0 = 96;
var NUM1 = 97;
var NUM2 = 98;
var NUM3 = 99;
var NUM4 = 100;
var NUM5 = 101;
var NUM6 = 102;
var NUM7 = 103;
var NUM8 = 104;
var NUM9 = 105;
var NUMLOCK = 144;
var SCROLLLOCK = 145;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function fill() {
  ctx.fillRect(0, 0, width, height);
}

function color(col) {
  ctx.fillStyle = col;
}

function log(mes) {
  console.log(mes);
}

function hex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function rect(x, y, width, height) {
  ctx.fillRect(x, y, width, height)
}

function frame(url, id, x, y, width, height) {
  if (document.getElementById(id) === null) {
    document.write('<div id="' + id + '" style="position:absolute; top: ' + y + "px; left: " + x + 'px"><iframe src="' + url + '" style="height:' + height + 'px; width: ' + width + 'px; position:relative;"></iframe></div>')
  } else {
    document.getElementById(id).innerHTML = '<iframe src="' + url + '" style="height:' + height + 'px; width: ' + width + 'px; position:relative;"></iframe>'
  }
}

function HTML(code, id, x, y, width, height) {
  if (document.getElementById(id) === null) {
    document.write('<div id="' + id + '"><div style="position:absolute; top: ' + y + "px; left: " + x + 'px; height:' + height + 'px; width: ' + width + 'px; max-width: "' + width + 'px;>' + code + '</div></div>')
  } else {
    document.getElementById(id).innerHTML = '<div style="position:absolute; top: ' + y + "px; left: " + x + 'px; height:' + height + 'px; width: ' + width + 'px; max-width: "' + width + 'px;>' + code + '</div>'
  }
}

function cursor(cursor) {
  document.body.style.cursor = cursor;
}

function PI() {
  return Math.PI;
}

function arc(x, y, r, sAngle, eAngle) {
  if (mode === 'simple') {
    ctx.beginPath();
  }
  if (angleMode === 'degree') {
    sAngle *= Math.PI / 180;
    eAngle *= Math.PI / 180;
  }
  ctx.arc(x, y, r, sAngle, eAngle);
  if (autoFlood) {
    ctx.fill();
  }
  if (mode === 'simple') {
    ctx.closePath();
  }
}

function stroke() {
  ctx.stroke();
}

function rectOutline(x, y, width, height) {
  ctx.strokeRect(x, y, width, height);
}

function ellipse(x, y, rX, rY, rotation, sAngle, eAngle) {
  if (mode === 'simple') {
    ctx.beginPath();
  }
  if (angleMode === 'degree') {
    rotation *= Math.PI / 180;
    sAngle *= Math.PI / 180;
    eAngle *= Math.PI / 180;
  }
  if (rotation === undefined || '' + rotation == 'NaN') {
    rotation = 0;
  }
  if (sAngle === undefined || '' + sAngle == 'NaN') {
    sAngle = 0;
  }
  if (eAngle === undefined || '' + eAngle == 'NaN') {
    eAngle = 2 * Math.PI;
  }
  ctx.ellipse(x, y, rX, rY, rotation, sAngle, eAngle);
  if (autoFlood) {
    ctx.fill();
  }
  if (mode === 'simple') {
    ctx.closePath();
  }
}

function flood() {
  ctx.fill();
}

function beginFence() {
  ctx.beginPath();
}

function endFence() {
  ctx.closePath();
}

function setMode(m) {
  if (m === 'simple') {
    mode = 'simple';
  } else if (m === 'complex') {
    mode = 'complex';
  } else {
    throw 'The 2 modes are \'simple\' and \'complex\'.'
  }
}

function touchX(touch) {
  return touch.clientX;
}

function touchY(touch) {
  return touch.clientY;
}

function resize(setWidth, setHeight) {
  canvas.setAttribute('width', setWidth);
  canvas.setAttribute('height', setHeight);
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
}

function round(num) {
  return Math.round(num);
}

function random(min, max) {
  return (Math.random() * (max - min)) + min;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function frameRate(fps) {
  return round(1000 / fps);
}

function setAngleMode(m) {
  if (m === 'degree') {
    mode = 'degree';
  } else if (m === 'radian') {
    mode = 'radian';
  } else {
    throw 'The 2 modes are \'degree\' and \'radian\'.'
  }
}

function strokeColor(col) {
  ctx.strokeStyle = col;
}

function toDeg(rad) {
  return rad * (180 / Math.PI);
}

function sin(num) {
  if (angleMode === 'degree') {
    num *= Math.PI / 180;
  }
  return Math.sin(num);
}

function cos(num) {
  if (angleMode === 'degree') {
    num *= Math.PI / 180;
  }
  return Math.cos(num);
}

function tan(num) {
  if (angleMode === 'degree') {
    num *= Math.PI / 180;
  }
  return Math.tan(num);
}

function csc(num) {
  if (angleMode === 'degree') {
    num *= Math.PI / 180;
  }
  return Math.csc(num);
}

function sec(num) {
  if (angleMode === 'degree') {
    num *= Math.PI / 180;
  }
  return Math.sec(num);
}

function cot(num) {
  if (angleMode === 'degree') {
    num *= Math.PI / 180;
  }
  return Math.cot(num);
}

function triangle(x, y, rX, rY, rotation) {
  if (rotation === undefined) {
    rotation = 0;
  }
  if (angleMode === 'degree') {
    rotation *= Math.PI / 180;
  }
  if (mode === 'simple') {
    ctx.beginPath();
  }
  ctx.moveTo((x - (rX / 2)), (y - (rY / 2)));
  ctx.lineTo((x + (rX / 2)), (y - (rY / 2)));
  ctx.lineTo(x, (y + (rY / 2)));
  ctx.lineTo((x - (rX / 2)), (y - (rY / 2)));
  if (autoFlood) {
    ctx.fill();
  }
  if (mode === 'simple') {
    ctx.closePath();
  }
}

function line(x1, y1, x2, y2) {
  if (mode === 'simple') {
    ctx.beginPath();
  }
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  if (autoFlood) {
    ctx.stroke();
  }
  if (mode === 'simple') {
    ctx.closePath();
  }
}

function fullscreen(m) {
  if (m === true) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function fence(x, y) {
  ctx.lineTo(x, y);
}

function startPoint(x, y) {
  ctx.moveTo(x, y);
}

function alpha(num) {
  ctx.globalAlpha = 1 - (num / 255);
}

function text(str, x, y, maxWidth) {
  ctx.fillText(str, x, y, maxWidth);
}

function font(f, size) {
  if (size === undefined) {
    size = 20;
  }
  ctx.font = '' + size + 'px ' + f;
}

function textAlign(xAlign, yAlign) {
  ctx.textAlign = xAlign;
  if (yAlign != undefined) {
    ctx.textBaseline = yAlign;
  }
}
