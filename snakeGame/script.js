var canvas = document.getElementById("canvas"),
   ctx = canvas.getContext("2d"),
   score = 0,
   snake = [{
         'x': 200,
         'y': 200
      },
      {
         'x': 220,
         'y': 200
      },
      {
         'x': 240,
         'y': 200
      }
   ],
   fruit = [],
   timer,
   direction = 3,
   scoreOut = document.getElementById('scoreOut'),
   theEnd = document.getElementById('theEnd'),
   isKey = true;

startGame();

document.onkeydown = function (e) {
   if (e.keyCode == 37 && direction != 3 && isKey) {
      direction = 1;
   } else if (e.keyCode == 38 && direction != 4 && isKey) {
      direction = 2;
   } else if (e.keyCode == 39 && direction != 1 && isKey) {
      direction = 3;
   } else if (e.keyCode == 40 && direction != 2 && isKey) {
      direction = 4;
   } else if (e.keyCode == 82) {
      restartGame();
   }
   isKey = false;
}

function snakeMove() {
   timer = setInterval(function () {
      ctx.clearRect(snake[0].x, snake[0].y, 20, 20);
      snake.splice(0, 1);
      eatFruit();
      if (direction == 1) {
         snake.push({
            'x': snake[snake.length - 1].x - 20,
            'y': snake[snake.length - 1].y
         });
      } else if (direction == 2) {
         snake.push({
            'x': snake[snake.length - 1].x,
            'y': snake[snake.length - 1].y - 20
         });
      } else if (direction == 3) {
         snake.push({
            'x': snake[snake.length - 1].x + 20,
            'y': snake[snake.length - 1].y
         });
      } else if (direction == 4) {
         snake.push({
            'x': snake[snake.length - 1].x,
            'y': snake[snake.length - 1].y + 20
         });
      }
      snakeDraw();
      scoreOut.innerHTML = score;
      if (die()) {
         return;
      } else {
         isKey = true;
      }
   }, 200)
}

function die() {
   var head = snake[0];
   for (let i = 4; i < snake.length; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
         ctx.clearRect(0, 0, 1200, 800);
         clearInterval(timer);
         theEnd.style.zIndex = 1;
         return true;
      }
   }
   return false;
}

function eatFruit() {
   var head = snake[snake.length - 1];
   for (let i = 0; i < 3; i++) {
      if (head.x == fruit[i].x && head.y == fruit[i].y) {
         snake.push({
            'x': fruit[i].x,
            'y': fruit[i].y
         })
         fruit.splice(i, 1);
         score += 1;
         doFrit();
         break;
      }
   }
}

function doFrit() {
   ctx.fillStyle = "rgb(87, 218, 228)";
   while (fruit.length < 3) {
      var fruitX = Math.floor(Math.random() * 60),
         fruitY = Math.floor(Math.random() * 40);
      for (let i = 0; i < snake.length; i++) {
         if (snake[i].x == fruitX * 20 && snake[i].y == fruitY * 20) {
            doFrit();
            return;
         }
      }
      fruit.push({
         'x': fruitX * 20,
         'y': fruitY * 20
      })
      ctx.fillRect(fruitX * 20, fruitY * 20, 20, 20);
   }
}

function snakeDraw() {
   ctx.fillStyle = "rgb(83, 224, 79)";
   for (let i = 0; i < snake.length; i++) {
      var x = snake[i].x,
         y = snake[i].y;
      if (x == 1200) {
         x = 0;
         snake[i].x = 0;
      } else if (x == -20) {
         x = 1180;
         snake[i].x = 1180;
      } else if (y == 800) {
         y = 0;
         snake[i].y = 0;
      } else if (y == -20) {
         y = 780;
         snake[i].y = 780;
      }
      ctx.fillRect(x, y, 20, 20);
   }
}

function startGame() {
   doFrit();
   snakeMove();
   snakeDraw();
}

function restartGame() {
   isKey = true;
   ctx.clearRect(0, 0, 1200, 800);
   theEnd.style.zIndex = -1;
   score = 0;
   snake = [{
         'x': 200,
         'y': 200
      },
      {
         'x': 220,
         'y': 200
      },
      {
         'x': 240,
         'y': 200
      }
   ]
   fruit = [];
   direction = 3;
   clearInterval(timer);
   startGame();
}