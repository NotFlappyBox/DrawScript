frameDelay = frameRate(60)
var birdY = height / 2
var birdYVel = 0;
var start = false;
var pipes = new Array(0)
disableRightClick = true;
var die = false;
var pipeTick = 180;
var score = 0;
var dieTick = 0;
var gameOver = false;
var dieFade = 0;
var gravity = 1;
var jump = [new Audio('jump.wav'), new Audio('jump.wav'), new Audio('jump.wav')]
jump[0].volume = 0.25;
jump[1].volume = 0.25;
jump[2].volume = 0.25;
var jumpTime = 0;
var loading = true;
var loadStep = 0;
var loadAmount = 6;
jump[0].onloadeddata = function() {
  loadStep++;
  if (loadStep >= loadAmount) {
    loading = false;
  }
}
jump[1].onloadeddata = function() {
  loadStep++;
  if (loadStep >= loadAmount) {
    loading = false;
  }
}
jump[2].onloadeddata = function() {
  loadStep++;
  if (loadStep >= loadAmount) {
    loading = false;
  }
}
var scoreSound = new Audio('score.wav');
scoreSound.volume = 0.5;
scoreSound.onloadeddata = function() {
  loadStep++;
  if (loadStep >= loadAmount) {
    loading = false;
  }
}
var dieSound = new Audio('die.wav');
dieSound.onloadeddata = function() {
  loadStep++;
  if (loadStep >= loadAmount) {
    loading = false;
  }
}
var faster = new Audio('faster.wav');
faster.volume = 0.5;
faster.onloadeddata = function() {
  loadStep++;
  if (loadStep >= loadAmount) {
    loading = false;
  }
}
var speed = 3;
log(isMobile)

function onFrame() {
  color('#2986cc')
  fill()
  color('#8fce00')
  rect(0, height - 40, width, 40)
  if (loading) {
    color('#ffffff')
    textAlign('center', 'middle')
    font('Arial', 50)
    text('Loading...', width / 2, height / 2)
  } else {
    for (let i in pipes) {
      pipes[i].draw()
    }
    color('yellow')
    rect(200, birdY, 40, 40)
    birdY -= birdYVel
    if (birdY >= height - 80 && !die) {
      birdY = height - 80
      birdYVel = 15 * gravity
      dieSound.play();
      die = true;
    } else if (birdY < 0) {
      birdYVel = 0;
      birdY = 0;
    } else {
      birdYVel -= gravity * gravity;
    }
    if (birdY >= (height / 2) + 40 && !start) {
      birdYVel = 15 * gravity;
      jump[jumpTime].play();
      jumpTime++;
      if (jumpTime >= 3) {
        jumpTime = 0;
      }
    }
    for (let i in pipes) {
      if (pipes[i].getX() <= 240 && pipes[i].getX() + 60 >= 200 && !die) {
        if (birdY < pipes[i].getY() - 95 || birdY + 40 > pipes[i].getY() + 95) {
          birdYVel = 15 * gravity;
          dieSound.play();
          die = true;
        }
      }
    }
    for (let i in pipes) {
      if (pipes[i].getX() + 30 <= 220 && !pipes[i].isPassed()) {
        score += 1;
        pipes[i].pass();
        if (score % 6 == 0) {
          speed += 0.8;
          faster.play();
        } else {
          scoreSound.play();
        }
      }
    }
    if (start) {
      if (pipeTick >= 180) {
        pipeTick = 0;
        pipes.push(new Pipe(width + 30, random(95, height - 135)))
      }
      pipeTick++;
    }
    color('#ffffff')
    font('Arial', 50)
    textAlign('center', 'middle');
    if (!start) {
      if (!isMobile) {
        text('Press space to start', width / 2, height / 2)
      } else {
        text('Tap to start', width / 2, height / 2)
      }
    }
    alpha(dieFade)
    textAlign('center', 'top');
    text('' + score, width / 2, 80)
    if (die) {
      if (!gameOver) {
        dieTick++;
        if (dieTick >= 60) {
          gameOver = true;
        }
      } else {
        dieFade += 20;
        if (dieFade > 255) {
          dieFade = 255;
        }
        textAlign('center', 'middle')
        alpha(255 - dieFade)
        text('Your Score: ' + score, width / 2, height / 2)
        alpha(0)
      }
    }
  }
}

function onKeyPress() {
  if (key == ' ' && !die && !loading) {
    start = true;
    birdYVel = 15 * gravity;
    jump[jumpTime].play();
    jumpTime++;
    if (jumpTime >= 3) {
      jumpTime = 0;
    }
  } else if (key == ' ' && gameOver) {
    start = false;
    die = false;
    score = 0;
    dieTick = 0;
    birdY = height / 2;
    dieFade = 0;
    gameOver = false;
    pipes = new Array(0);
    pipeTick = 180;
    birdYVel = 0;
    speed = 3;
  }
}

function onTouch() {
  if (!die && !loading) {
    start = true;
    birdYVel = 15 * gravity;
    jump[jumpTime].play();
    jumpTime++;
    if (jumpTime >= 3) {
      jumpTime = 0;
    }
  } else if (gameOver) {
    start = false;
    die = false;
    score = 0;
    dieTick = 0;
    birdY = height / 2;
    dieFade = 0;
    gameOver = false;
    pipes = new Array(0);
    pipeTick = 180;
    birdYVel = 0;
    speed = 3;
  }
}

class Pipe {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.passed = false;
  }
  
  draw() {
    color('#0bce00')
    rect(this.x, this.y + 95, 60, height - (this.y + 135))
    rect(this.x, 0, 60, this.y - 95)
    if (!die) {
      this.x -= speed;
    }
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  pass() {
    this.passed = true;
  }

  isPassed() {
    return this.passed;
  }
}

function onClick() {
  fullscreen(true);
}

function onPageResize() {
  resize(displayWidth, displayHeight);
}
