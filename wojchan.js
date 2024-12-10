const fps = 30;
const canvas = document.createElement('canvas');
canvas.width = 60;
canvas.height = 60;
canvas.style.position = 'fixed';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
canvas.style.imageRendering="pixelated";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let m = [];
let c = [window.innerWidth / 2, window.innerHeight / 2];
let state = 0;
window.addEventListener('mousemove', (e) => {m[0] = e.clientX;m[1] = e.clientY;});
const image = new Image(120,120);
image.src = "sprite.png";
const rend=(x,y)=>{ctx.drawImage(image, x, y, 60, 60, 0, 0, 60, 60)}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dx = m[0] - c[0];
  const dy = m[1] - c[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  canvas.style.transform="scale("+(String(Math.floor(Math.cos(angle)))[0] == "-" ? "1" : "-1")+", 1)"
  let spd=distance > 150 ? 8 : 4;
  canvas.style.left = c[0]-30+"px";
  canvas.style.top = c[1]-30+"px";
  rend(0, 60)
  state == 0 ? rend((Math.floor(c[0]+c[1]) + 1) % 4 * 60, 0) : rend(60, 0)
  if (distance > 150)rend(60, 60)
  state = distance > 15 ? 0 : 1;
  if (distance > 15) {
    c[0] += Math.cos(angle) * spd;
    c[1] += Math.sin(angle) * spd;
  }
  setTimeout(()=>{requestAnimationFrame(animate)}, 1000 / fps);
}
image.onload = animate();
