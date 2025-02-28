//wojtekgame 2024
(function wojchan() {
  const canvas = document.createElement('canvas');
  const grid = 30;
  canvas.id = "wojchan"
  //for SOME reason the pet sprite is slightly weird and you can see this when you zoom in, so i added +1
  //for zIndex, it should be ontop of everything in the site, hopefully.
  canvas.width = canvas.height = (grid + 1) * 2;
  //STYLING, kinda obscure but it makes sense that this is then used in the minified code >-o
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
  ctx.imageSmoothingEnabled = false;
  let canvas_pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  //copy positions, dont go anywhere else
  let mouse = { ...canvas_pos };
  window.onmousemove=(e)=>mouse={ x: e.clientX, y: e.clientY };
  const image = new Image(grid * 3, grid * 3); //3x3 tiles
  //WOJCHAN SPRITE
  //image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuMWK1UgwAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAMAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAAgJMAAOgDAACAkwAA6AMAAFBhaW50Lk5FVCA1LjEuMQADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAAIj8MAz2cLbAAAAB5QTFRFAAAAAAAAAKLoLtkQP0jMa9lle/p1w8PD/v+/////nsJ6AAAAAAF0Uk5TAEDm2GYAAAIjSURBVFjD7Za/btswEId5U9a7ShbYMX0DwU8gQC/gId05lIC3bJm56QkC5G17RzfkndPQFNpsPhgGPt+Pf2yLn+TcpYCcrja6KWI/7k0T9iNMgfZgiHV8G3lfkV+hDyFynQu3UQbHEN9CF16Y37AHZakppPcftY0X9lvS7U+R+cScaruFDn6dIql2Ex08naJX7SbuTZ+EtzRhBzpHzFsiwB7kozERDbNrILlyFcI8D8fj/AkOgjNtZe4j11yv0IxlLhoy13QeXdPSn9M7+sGOhqNPlRxssnKdmwTVUeP/alxUmkghr0Xjanhc1zqa1lUj91YaK8PKv5HGVSFI2LSJPJqlfVL7ZDSK8CbtPIKeKzkwaSJjOrJp654cN4Nt+2MadyBUXdzGvWkK/ehoCtiLQHFSH7RR3BWsUxuYTReL6G6g8DnW4W0U031/K4ZuIzM79Pwai/hayExhm2Jtt5BZXBQPpd3CzOy5w0/swMJP2IF704E3xnzADnSAlL8H9WAWI1GoB8QiyalVXSfeGwb8K7K5BsG5XrJZjGititWKxpqS1nOLVasn/xhZ62jwSc0ta2/G0LMWzrj4ZJDqvYCtuRjdsBgXa00WZaFFnGsNTauRqDJybmpDsxjNWj5ZAyfrSU4nvRSCRWcUbCUr6euHTTR09ex549H0XvsLdqW/4Z652unrLvzDytcb+fH4ZemP9/Z73esr6+GFqzst4Zfn/z33b7L+EeX1zoUJAAAAAElFTkSuQmCC"
  image.src = "https://cdn.jsdelivr.net/gh/wojtekcodestoday/wojchan@master/sprite.png";
  //THIS IS INCASE YOU WANT TO USE A CUSTOM :D
  //image.src = "hazelchan.png";
  //basically drawImage is passing (image, x * 30, y * 30, 30, 30, 0, 0, 30, 30)
  const rend = (x, y) => { ctx.drawImage(image, x * grid, y * grid, grid, grid, 0, 0, grid, grid) }
  let mv = 0;
  ctx.scale(2, 2)
  //anim() makes the animation render as well as "walking" to the cursor
  const anim = () => {
    const dx = mouse.x - canvas_pos.x;
    const dy = mouse.y - canvas_pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const flip = Math.cos(angle) < 0;
    ctx.clearRect(0, 0, grid*2, grid*2);
    let spd = dist > 150 ? 8 : 4;
    canvas.style = `position:fixed;pointer-events:none;image-rendering:pixelated;z-index:${Number.MAX_VALUE};left:${canvas_pos.x - grid}px;top:${canvas_pos.y - grid}px`
    //shadow
    rend(0, 2);
    //walking or idling, (mv) is the walking cycle, it's third frame (4 in total),
    //it gets replaced by the idle animation (makes the animation more alive)
    rend(dist > 15 ? mv == 3 || mv : 1, flip)
    spd == 8 && rend(!flip + 1, 2)
    //goes to (speed) at the direction of (angle)
    if (dist > 15) {
      mv = (mv + 1) % 4;
      canvas_pos.x += Math.cos(angle) * spd;
      canvas_pos.y += Math.sin(angle) * spd;
    }
    //redo animation again in 70ms, just so it's not too slow but also not too fast
    setTimeout(() => requestAnimationFrame(anim), 70);
  }
  image.onload = anim;
})();