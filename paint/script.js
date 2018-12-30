var canvas = document.getElementById("canvas"),
   ctx = canvas.getContext("2d"),
   isMouseDown = false,
   isReplay = false,
   storage = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.onmousedown = function () {
   isMouseDown = true;
}
canvas.onmouseup = function () {
   storage.push('mouseup')
   isMouseDown = false;
   ctx.beginPath();
}

ctx.lineWidth = "20";
canvas.onmousemove = function (e) {
   if (isMouseDown && !isReplay) {
      storage.push([e.clientX, e.clientY]);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
   }
}

document.onkeydown = function (e) {
   if (e.keyCode == 67) {
      storage = [];
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   } else if (e.keyCode == 82) {
      repaint();
   }

}

function repaint() {
   isReplay = true;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   var timer = setInterval(function () {
      if (!storage.length) {
         clearInterval(timer);
         ctx.beginPath();
         isReplay = false;
         return;
      }
      var cord = storage.shift();
      var e = {
         clientX: cord['0'],
         clientY: cord['1']
      }
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
   }, 20);
}

// ctx.strokeRect( 50, 50, 300, 300 );