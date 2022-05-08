document.addEventListener('keydown', function (e) {
  key = e.key;
  keyCode = e.keyCode;
})

document.addEventListener('keyup', function (e) {
  key = e.key;
  keyCode = e.keyCode;
})

try {
  document.addEventListener('keydown', onKeyPress);
} catch (error) {}

document.addEventListener('mousedown', function (e) {
  mouseIsDown = true;
  if (e.button == 0) {
    mouseButton = 'left';
  } else if (e.button == 1) {
    mouseButton = 'middle';
  } else if (e.button == 2) {
    mouseButton = 'right';
  }
})

document.addEventListener('mouseup', function (e) {
  mouseIsDown = false;
  if (e.button == 0) {
    mouseButton = 'left';
  } else if (e.button == 1) {
    mouseButton = 'middle';
  } else if (e.button == 2) {
    mouseButton = 'right';
  }
})

try {
  document.addEventListener('click', onClick);
} catch (error) {}

document.addEventListener('mousemove', function (e) {
  mouseX = event.clientX + window.pageXOffset;
  mouseY = event.clientY + window.pageYOffset;
});

try {
  document.addEventListener('mousemove', onMouseMove);
} catch (error) {}

function frame() {
  try {
    onFrame();
  } catch (error) {}

  setTimeout(frame, frameDelay);
}

frame();

try {
  document.addEventListener('mouseup', onMouseUp);
} catch (error) {}

try {
  document.addEventListener('mousedown', onMouseDown);
} catch (error) {}

try {
  window.addEventListener('pagehide', onPageHide);
} catch (error) {}

try {
  window.addEventListener('pageshow', onPageShow);
} catch (error) {}

try {
  window.addEventListener('focus', onFocus);
} catch (error) {}

try {
  window.addEventListener('blur', onUnfocus);
} catch (error) {}

document.addEventListener('wheel', function (e) {
  scrollX = e.deltaX;
  scrollY = e.deltaY;
  progressX = window.pageXOffset;
  progressY = window.pageYOffset;
});

try {
  document.addEventListener('wheel', onScroll);
} catch (error) {}

try {
  document.addEventListener('keyup', onKeyRelease);
} catch (error) {}

document.addEventListener('touchstart', function (e) {
 touches = e.touches;
})

document.addEventListener('touchmove', function (e) {
  touches = e.touches;
})

document.addEventListener('touchend', function (e) {
  touches = e.touches
})


try {
  document.addEventListener('touchstart', onTouch);
} catch (error) {}

try {
  document.addEventListener('touchmove', onTouchMove);
} catch (error) {}

try {
  document.addEventListener('touchend', onTouchEnd);
} catch (error) {}

window.addEventListener('resize', function (e) {
  displayWidth = window.innerWidth;
  displayHeight = window.innerHeight;
})

try {
  window.addEventListener('resize', onPageResize);
} catch (error) {}

document.addEventListener('contextmenu', function (e) {
  if (disableRightClick) {
    e.preventDefault();
  }
})

document.addEventListener('fullscreenchange', function (e) {
  if (document.fullscreenElement) {
    try {
      onFullscreen(e);
    } catch (error) {}
  } else {
    try {
      onFullscreenExit(e);
    } catch (error) {}
  }
})