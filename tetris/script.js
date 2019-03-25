const bestScoreBlock = document.getElementById('bestScore');
let bestRes = localStorage.getItem("bestscore");
if (bestRes != null) {
   bestScoreBlock.innerHTML = bestRes * 10;
} else {
   bestRes = -1;
}


const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

const scoreBlock = document.getElementById('score');
const lastScoreBlock = document.getElementById('lastScore');

ctx.scale(20, 20);

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, cnv.width, cnv.height);

function arenaSweep() {
   rowCounter = 1;
   outer: for (let y = arena.length - 1; y > 0; y--) {
      for (let x = 0; x < arena[y].length; x++) {
         if (arena[y][x] === 0) {
            continue outer;
         }
      }
      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      y++;
      player.score += rowCounter;
      updateScore();
      checkBestScore();
      rowCounter * 2;
   }
}

function collide(arena, player) {
   const [m, o] = [player.matrix, player.pos];
   for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; x++) {
         if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
            return true;
         }
      }
   }
   return false;
}

function createMatrix(w, h) {
   const matrix = [];
   while (h--) {
      matrix.push(new Array(w).fill(0))
   }
   return matrix;
}

function generatePieces() {
   const pieces = 'ILJOTZS';
   let type = pieces[pieces.length * Math.random() | 0];
   switch (type) {
      case 'T':
         return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
         ];
      case 'J':
         return [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0],
         ];
      case 'L':
         return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
         ];
      case 'O':
         return [
            [4, 4],
            [4, 4],
         ];
      case 'Z':
         return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
         ];
      case 'S':
         return [
            [0, 7, 7],
            [7, 7, 0],
            [0, 0, 0],
         ];
      case 'I':
         return [
            [0, 0, 0, 0],
            [6, 6, 6, 6],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
         ];
   }
}

let nowPieces = [];
let nextPieces = generatePieces();


const cnvNext = document.getElementById("nextPiece");
const ctxNext = cnvNext.getContext("2d");

ctxNext.fillStyle = '#000';
ctxNext.fillRect(0, 0, cnvNext.width, cnvNext.height);
ctxNext.scale(50, 50);

function createPieces() {
   nowPieces = nextPieces;
   nextPieces = generatePieces();

   ctxNext.fillStyle = '#000';
   ctxNext.fillRect(0, 0, cnvNext.width, cnvNext.height);

   drawMatrix(nextPieces, {
      x: cnvNext.width / 50 / 2 - nextPieces.length / 2,
      y: cnvNext.height / 50 / 2 - nextPieces.length / 2
   }, ctxNext);

   return nowPieces;
}

function draw() {
   ctx.fillStyle = "#000";
   ctx.fillRect(0, 0, cnv.width, cnv.height);

   drawMatrix(arena, {
      y: 0,
      x: 0
   });
   drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset, context = ctx) {
   matrix.forEach((row, y) => {
      row.forEach((value, x) => {
         if (value !== 0) {
            context.fillStyle = colors[value];
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
         }
      });
   });
}

function merge(arena, player) {
   player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
         if (value !== 0) {
            arena[y + player.pos.y][x + player.pos.x] = value;
         }
      });
   });
}

function playerDrop() {
   player.pos.y++;
   if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      playerReset();
      arenaSweep();
   }
   dropCounter = 0;
}

function playerMove(d) {
   player.pos.x += d;
   if (collide(arena, player)) {
      player.pos.x -= d;
   }
}

function playerReset() {
   player.matrix = createPieces();
   player.pos.y = 0;
   player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
   if (collide(arena, player)) {
      if (player.score > bestRes) {
         bestRes = player.score * 20;
         localStorage.setItem('bestscore', bestRes);
      }
      lastScoreBlock.innerHTML = player.score * 10;
      arena.forEach(row => row.fill(0));
      player.score = 0;
      updateScore();
      dropInterval = 1000;
   }
}

function playerRotate(dir) {
   const pos = player.pos.x;
   let offset = 1;
   rotate(player.matrix, dir);
   while (collide(arena, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
         rotate(player.matrix, !dir);
         player.pos.x = pos;
         return;
      }
   }
}

function rotate(m, dir) {
   for (let y = 1; y < m.length; y++) {
      for (let x = 0; x < y; x++) {
         [
            m[x][y],
            m[y][x]
         ] = [
            m[y][x],
            m[x][y]
         ]
      }
   }
   if (dir) {
      m.forEach(row => row.reverse());
   } else {
      m.reverse();
   }
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
   const deltaTime = time - lastTime;
   lastTime = time;
   dropCounter += deltaTime;
   if (dropCounter > dropInterval) {
      playerDrop();
   }
   draw();
   requestAnimationFrame(update);
}

function checkBestScore() {
   if (player.score > bestRes) {
      bestRes = player.score;
      localStorage.setItem("bestscore", bestRes)
      bestScoreBlock.innerHTML = bestRes * 10;
   }
}

function updateScore() {
   scoreBlock.innerHTML = player.score * 10;
   if (player.score % 5 === 0 && player.score) {
      dropInterval -= dropInterval / 10;
      console.log(dropInterval);
   }
}

const colors = [
   null,
   'red',
   'green',
   'blue',
   'violet',
   'pink',
   'purple',
   'orange',
];

const arena = createMatrix(12, 20);

const player = {
   pos: {
      x: 0,
      y: 0
   },
   matrix: null,
   score: 0,
}

document.addEventListener('keydown', e => {
   const k = e.keyCode;
   switch (k) {
      case 37:
         playerMove(-1);
         break;
      case 39:
         playerMove(1);
         break;
      case 40:
         playerDrop();
         break;
      case 65:
         playerRotate(true);
         break;
      case 68:
         playerRotate(false);
         break;
   }
});

playerReset();
updateScore();
update();