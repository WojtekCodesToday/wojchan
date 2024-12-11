(function wojchan() {
  const c = document.createElement('canvas');
  c.width = c.height = 61;
  c.style.position = 'fixed';
  c.style.pointerEvents = 'none';
  c.style.zIndex = String(Number.MAX_VALUE);
  c.style.imageRendering = "pixelated";
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled=false;
  let m = [];
  let cs = [window.innerWidth / 2, window.innerHeight / 2];
  let state = 0;
  window.addEventListener('mousemove', (e) => { m = [e.clientX, e.clientY] });
  const image = new Image(180, 120);
  image.src = "https://raw.githubusercontent.com/WojtekCodesToday/wojchan/refs/heads/master/sprite.png";
  const rend = (x, y) => { ctx.drawImage(image, x * 30, y * 30, 30, 30, 0, 0, 30, 30) }
  let mv = 0;
  function animate() {
    const dx = m[0] - cs[0];
    const dy = m[1] - cs[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const flip=Math.cos(angle) < 0;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(2,2)
    let spd = dist > 150 ? 8 : 4;
    c.style.left = cs[0] - 30 + "px";
    c.style.top = cs[1] - 30 + "px";
    rend(0, 2);
    mv = (mv + 1) % 4;
    state == 0 ? rend(mv == 3 ? 1 : mv, flip) : rend(1, 0)
    dist > 150 && rend(!flip+1, 2)
    state = dist > 15 ? 0 : 1;
    if (dist > 15) {
      cs[0] += Math.cos(angle) * spd;
      cs[1] += Math.sin(angle) * spd;
    }
    setTimeout(() => { requestAnimationFrame(animate) }, 70);
  }
  image.onload = animate();
})();