const scoreOut = document.getElementById('score');
const livesOut = document.getElementById('lives');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = [
   null,
   '#32FF02',
   '#FEFEFE'
];
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.scale(5, 5);
const player = {
   pos: {
      x: canvas.width / 5 / 2 - 15 / 2 | 0,
      y: canvas.height / 5 - 8 - 5
   },
   matrix: [
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   ],
   score: 0,
   speed: 2,
   isShot: false,
   lives: 3
}
const enemy = {
   matrix: [
      [0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
      [0, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2],
      [2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2],
      [0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0],
   ]
}
const army = {
   pos: {
      x: canvas.width / 5 / 2 - 11 * 14 / 2 | 0,
      y: 10,
   },
   matrix: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   ],
   direct: 1,
   isDrop: false,
   shotShance: 0.001
}

function BulletConstructor(x, y, dir, isPlayer, speed) {
   this.pos = {
      x: x,
      y: y
   };
   this.dir = dir;
   this.isPlayer = isPlayer;
   this.speed = speed;
}

BulletConstructor.prototype.matrix = [
   [2],
   [2],
   [2],
   [2],
   [2],
];

let bulletsNow = [];

let lBorder = 4;
let rBorder = 37;

function armyMove() {
   if ((army.pos.x > rBorder || army.pos.x < lBorder) && !army.isDrop) {
      army.isDrop = true;
      army.pos.y += 5;
      army.direct = -army.direct;
      stepInterval -= stepInterval / 5;
   } else {
      army.isDrop = false;
      army.pos.x += army.direct;
   }
}

function armyShot(m, pos) {
   outer: for (let col = 0; col < m[0].length; col++) {
      for (let row = m.length - 1; row >= 0; row--) {
         if (m[row][col] === 0) continue;
         if (Math.random() < army.shotShance) {
            bulletsNow.push(new BulletConstructor(pos.x + col * 14 + 7, pos.y + row * 14 + 7, 1, false, 1));
         }
         continue outer;
      }
   }
}

function bulletMove() {
   bulletsNow.forEach((bullet, index) => {
      if (bullet.isPlayer) playerBulletCollision(bullet.pos, index);
      else if (enemyBulletCollision(bullet.pos, index)) return;
      if (bullet.pos.y > 0 && bullet.pos.y < canvas.height / 5) {
         bullet.pos.y += bullet.speed * bullet.dir;
         drawMatrix(bullet.matrix, bullet.pos);
      } else {
         if (bullet.isPlayer) player.isShot = false;
         bulletsNow.splice(index, 1);
      }
   });
}

let lcol = 0;
let rcol = army.matrix[0].length - 1;

function checkArmyStructure(m) {
   outer: for (let i = lcol; i < m[0].length; i++) {
      for (let row = 0; row < m.length; row++) {
         if (m[row][i] !== 0) {
            break outer;
         }
         if (row === m.length - 1) {
            lBorder -= 14;
            lcol++;
         }
      }
   }
   outer: for (let i = rcol; i >= 0; i--) {
      for (let row = 0; row < m.length; row++) {
         if (m[row][i] !== 0) {
            break outer;
         }
         if (row === m.length - 1) {
            rBorder += 14;
            rcol--;
         }
      }
   }
}

function draw() {
   ctx.fillStyle = "#000";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   if (bulletsNow.length > 0) bulletMove();
   drawMatrix(player.matrix, player.pos);
   drawMatrix(army.matrix, army.pos, true);
}

function drawMatrix(matrix, offset, isArmy = false) {
   matrix.forEach((i, y) => {
      i.forEach((value, x) => {
         if (value !== 0) {
            if (isArmy) {
               drawMatrix(enemy.matrix, {
                  x: army.pos.x + x * 14,
                  y: army.pos.y + y * 14
               });
            } else {
               ctx.fillStyle = colors[value];
               ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
         }
      });
   });
}

function enemyBulletCollision(pos, index) {
   if (
      pos.y > player.pos.y - 4 &&
      pos.y < player.pos.y + player.matrix.length &&
      pos.x >= player.pos.x + 1 &&
      pos.x < player.pos.x + player.matrix[0].length - 1
   ) {
      bulletsNow.splice(index, 1);
      player.lives--;
      livesOut.innerHTML = player.lives;
      if (player.lives < 1) {
         playerReset();
         return true;
      }
      player.pos.x = 10;
   }
}

function playerBulletCollision(pos, index) {
   army.matrix.forEach((i, y) => {
      i.forEach((val, x) => {
         if (
            pos.x > army.pos.x + x * 14 - 1 &&
            pos.x < army.pos.x + (x + 1) * 14 - 3 &&
            pos.y > army.pos.y + y * 14 - 1 &&
            pos.y < army.pos.y + y * 14 + 9 &&
            val !== 0
         ) {
            bulletsNow.splice(index, 1);
            player.isShot = false;
            player.score += 10;
            scoreOut.innerHTML = player.score;
            stepInterval -= stepInterval / 100 * 3;
            army.matrix[y][x] = 0;
            army.shotShance += 0.00005;
            checkArmyStructure(army.matrix);
            return;
         }
      });
   });
}

function playerReset() {
   cancelAnimationFrame(requestId);
   player.pos.x = canvas.width / 5 / 2 - 15 / 2 | 0;
   player.score = 0;
   player.isShot = false;
   player.lives = 3;
   scoreOut.innerHTML = player.score;
   livesOut.innerHTML = player.lives;
   army.pos = {
      x: canvas.width / 5 / 2 - 11 * 14 / 2 | 0,
      y: 10,
   };
   army.matrix = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   ];
   army.direct = 1;
   army.isDrop = false;
   army.shotShance = 0.001
   bulletsNow = [];
   lBorder = 4;
   rBorder = 37;
   lcol = 0;
   rcol = army.matrix[0].length - 1;
   stepCounter = 0;
   stepInterval = 500;
   lastTime = 0;
   isleftArrowDown = false;
   isRightArrowDown = false;
   isSpaceDown = false;
}

function playerShot(x, y) {
   player.isShot = true;
   bulletsNow.push(new BulletConstructor(x, y, -1, true, 3))
}

let stepCounter = 0;
let stepInterval = 500;
let lastTime = 0;
let requestId;

function update(time = 0) {
   const deltaTime = time - lastTime;
   lastTime = time;
   stepCounter += deltaTime;
   if (stepCounter > stepInterval) {
      stepCounter = 0;
      armyMove();
   }
   if (isSpaceDown && !player.isShot) playerShot(player.pos.x + player.matrix[0].length / 2 | 0, player.pos.y, true);
   if (isleftArrowDown && player.pos.x > 0) player.pos.x -= player.speed;
   if (isRightArrowDown && player.pos.x < 175) player.pos.x += player.speed;
   armyShot(army.matrix, army.pos);
   draw();
   console.log(1);
   requestId = requestAnimationFrame(update);
}

let isleftArrowDown = false;
let isRightArrowDown = false;
let isSpaceDown = false;
window.addEventListener('keydown', e => {
   if (e.keyCode === 37) isleftArrowDown = true;
   if (e.keyCode === 39) isRightArrowDown = true;
   if (e.keyCode === 32) isSpaceDown = true;
});

window.addEventListener('keyup', e => {
   if (e.keyCode === 37) isleftArrowDown = false;
   if (e.keyCode === 39) isRightArrowDown = false;
   if (e.keyCode === 32) isSpaceDown = false;
});
update();