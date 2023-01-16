const socket = io();

let mouse = {
  click: false,
  move: false,
  pos: { x: 0, y: 0 },
  pos_prev: { x: 0, y: 0 },
};

const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousedown", () => {
  mouse.click = true;
});

canvas.addEventListener("mouseup", () => {
  mouse.click = false;
});

canvas.addEventListener("mousemove", (ev) => {
  mouse.move = true;
  mouse.pos = { x: ev.clientX / width, y: ev.clientY / height };
});

socket.on("drawLine", (data) => {
  const line = data.line;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(line[0].x * width, line[0].y * height);
  ctx.lineTo(line[1].x * width, line[1].y * height);
  ctx.stroke();
});

function mainLoop() {
  if (mouse.click && mouse.move && mouse.pos_prev) {
    socket.emit("drawLine", { line: [mouse.pos, mouse.pos_prev] });
    mouse.move = false;
  }
  mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };

  setTimeout(mainLoop, 25);
}

mainLoop();
