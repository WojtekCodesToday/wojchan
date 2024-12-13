//wojtekgame 2024
(function wojchan() {
  const canvas = document.createElement('canvas');
  const grid = 30;
  canvas.id="wojchan"
  //for SOME reason the pet sprite is slightly weird and you can see this when you zoom in, so i added +1
  //for zIndex, it should be ontop of everything in the site, hopefully.
  canvas.width = canvas.height = 61;
  canvas.style.position = 'fixed';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = String(Number.MAX_VALUE);
  canvas.style.imageRendering = "pixelated";
  //adds itself to the page, opens a context to render simple 2d graphics,
  //nothing special if used canvas before,
  //and disabling imageSmoothingEnabled should make the canvas no longer blurry when scaled twice (30x30 => 60x60)
  //the pet should be at the CENTER of the page (canvas_pos), (mouse) copies the same position.
  //YOU CAN CHANGE THE SRC TO ANYTHING AS LONG AS IT FITS IN AN 90x90 SPRITESHEET :D
  // (here using the one from the gh repository)
  //rend() uses the spritesheet, one grid is 30x30 pixels and this renders one of them.
  //then it should present the moving animation
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled=false;
  let canvas_pos = {x:window.innerWidth / 2, y:window.innerHeight / 2};
  let mouse = {...canvas_pos};
  window.addEventListener('mousemove', (e) => {mouse.x=e.clientX;mouse.y=e.clientY});
  const image = new Image(grid*3, grid*3);
  image.src = "https://cdn.jsdelivr.net/gh/wojtekcodestoday/wojchan@master/sprite.png";
  const rend = (x, y) => { ctx.drawImage(image, x * grid, y * grid, grid, grid, 0, 0, grid, grid) }
  let mv = 0;

  //anim() makes the animation render as well as "walking" to the cursor
  const anim=()=>{
    const dx = mouse.x - canvas_pos.x;
    const dy = mouse.y - canvas_pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const flip=Math.cos(angle) < 0;
    ctx.clearRect(0, 0, 61,61);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(2,2)
    let spd = dist > 150 ? 8 : 4;
    canvas.style.left = canvas_pos.x - 30 + "px";
    canvas.style.top = canvas_pos.y - 30 + "px";
    rend(0, 2);
    mv = (mv + 1) % 4;
    //walking or idling, (mv) is the walking cycle, it's third frame (4 in total),
    //it gets replaced by the idle animation (makes the animation more alive)
    dist > 15 ? rend(mv == 3 || mv, flip) : rend(1, 0)
    dist > 150 && rend(!flip+1, 2)
    //goes to (speed) at the direction of (angle)
    if (dist > 15) {
      canvas_pos.x += Math.cos(angle) * spd;
      canvas_pos.y += Math.sin(angle) * spd;
    }
    //redo animation again in 70ms, just so it's not too slow but also not too fast
    setTimeout(() => requestAnimationFrame(anim), 70);
  }
  image.onload = anim();
})();