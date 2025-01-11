// ==UserScript==
// @name         wojchan
// @namespace    woj-wojchan
// @version      2025-01-11
// @description  waifu follow mouse (real)
// @author       wojtekgame
// @icon         https://cdn.jsdelivr.net/gh/wojtekcodestoday/wojchan@master/icon.png
// @match        https://*/*
// @match        http://*/*
// @run-at       document-end
// ==/UserScript==

//wojtekgame 2024
(function wojchan() {
  const canvas = document.createElement('canvas');
  const grid = 30;
  canvas.id = "wojchan"
  canvas.width = canvas.height = (grid + 1) * 2;
  canvas.style = `position:fixed;pointer-events:none;image-rendering:pixelated;z-index:` + Number.MAX_VALUE
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  let canvas_pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouse = { ...canvas_pos };
  window.addEventListener('mousemove', (e) => mouse = { x: e.clientX, y: e.clientY });
  const image = new Image(grid * 3, grid * 3);
  image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuMWK1UgwAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAMAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAAgJMAAOgDAACAkwAA6AMAAFBhaW50Lk5FVCA1LjEuMQADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAAIj8MAz2cLbAAAAB5QTFRFAAAAAAAAAKLoLtkQP0jMa9lle/p1w8PD/v+/////nsJ6AAAAAAF0Uk5TAEDm2GYAAAIjSURBVFjD7Za/btswEId5U9a7ShbYMX0DwU8gQC/gId05lIC3bJm56QkC5G17RzfkndPQFNpsPhgGPt+Pf2yLn+TcpYCcrja6KWI/7k0T9iNMgfZgiHV8G3lfkV+hDyFynQu3UQbHEN9CF16Y37AHZakppPcftY0X9lvS7U+R+cScaruFDn6dIql2Ex08naJX7SbuTZ+EtzRhBzpHzFsiwB7kozERDbNrILlyFcI8D8fj/AkOgjNtZe4j11yv0IxlLhoy13QeXdPSn9M7+sGOhqNPlRxssnKdmwTVUeP/alxUmkghr0Xjanhc1zqa1lUj91YaK8PKv5HGVSFI2LSJPJqlfVL7ZDSK8CbtPIKeKzkwaSJjOrJp654cN4Nt+2MadyBUXdzGvWkK/ehoCtiLQHFSH7RR3BWsUxuYTReL6G6g8DnW4W0U031/K4ZuIzM79Pwai/hayExhm2Jtt5BZXBQPpd3CzOy5w0/swMJP2IF704E3xnzADnSAlL8H9WAWI1GoB8QiyalVXSfeGwb8K7K5BsG5XrJZjGititWKxpqS1nOLVasn/xhZ62jwSc0ta2/G0LMWzrj4ZJDqvYCtuRjdsBgXa00WZaFFnGsNTauRqDJybmpDsxjNWj5ZAyfrSU4nvRSCRWcUbCUr6euHTTR09ex549H0XvsLdqW/4Z652unrLvzDytcb+fH4ZemP9/Z73esr6+GFqzst4Zfn/z33b7L+EeX1zoUJAAAAAElFTkSuQmCC"
  //image.src = "https://cdn.jsdelivr.net/gh/wojtekcodestoday/wojchan@master/sprite.png";
  const rend = (x, y) => { ctx.drawImage(image, x * grid, y * grid, grid, grid, 0, 0, grid, grid) }
  let mv = 0;
  ctx.scale(2, 2)
  function anim() {
    const dx = mouse.x - canvas_pos.x;
    const dy = mouse.y - canvas_pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const flip = Math.cos(angle) < 0;
    ctx.clearRect(0, 0, grid*2, grid*2);
    let spd = dist > 150 ? 8 : 4;
    canvas.style.left = canvas_pos.x - grid + "px";
    canvas.style.top = canvas_pos.y - grid + "px";
    rend(0, 2);
    rend(dist > 15 ? mv == 3 || mv : 1, flip)
    spd == 8 && rend(!flip + 1, 2)
    if (dist > 15) {
      mv = (mv + 1) % 4;
      canvas_pos.x += Math.cos(angle) * spd;
      canvas_pos.y += Math.sin(angle) * spd;
    }
    setTimeout(() => requestAnimationFrame(anim), 70);
  }
  image.onload = anim;
})();