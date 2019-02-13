let rng = document.getElementById('vis-range');
let rngInp = document.getElementById('vis-text');
let shift = 40;
let result = 300000;
let locRng = result;

function drowLine() {
   shift = (rng.value - 50) * 100 / 250;
   rng.style.background = "-webkit-linear-gradient(left,rgb(255, 107, 141) 0%,rgb(255, 107, 141) " + shift + "% ,rgb(231, 238, 246) " + shift + "% ,rgb(231, 238, 246) 100%)";
}

function printResult(res) {
   res += "";
   res = new Array(4 - res.length % 3).join("U") + res;
   res = res.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
   if ( (res.length - 1) % 4 == 0) {
      resultOut.innerHTML = "≈" + res.replace(' ', '');
   } else {
      resultOut.innerHTML = "≈" + res;
   }
}

rng.oninput = function () {
   if (rng.value * 2000 > locRng) {
      result += rng.value * 2000 - locRng;
   } else {
      result -= locRng - rng.value * 2000;
   }
   printResult(result);
   drowLine();
   rngInp.value = rng.value;
   locRng = rng.value * 2000;
};

rngInp.oninput = function () {
   if (rngInp.value >= 50 && rngInp.value <= 300) {
      rng.value = rngInp.value;
      if (rng.value * 2000 > locRng) {
         result += rng.value * 2000 - locRng;
      } else {
         result -= locRng - rng.value * 2000;
      }
      locRng = rng.value * 2000;
      printResult(result);
      drowLine();
   }
};

rngInp.onchange = function () {
   if (rngInp.value < 50 || rngInp.value > 300) {
      rngInp.value = rng.value;
   }
};

let chboxes = document.getElementsByName('options');
let resultOut = document.getElementById('result');
let radioFlor = document.getElementsByClassName('radioFlor');
let radioReg = document.getElementsByClassName('radioReg');



for (let i = 0; i < chboxes.length; i++) {
   chboxes[i].addEventListener('change', function () {
      if (chboxes[i].checked) {
         result += +chboxes[i].value;
      } else {
         result -= +chboxes[i].value;
      }
      printResult(result);
   });
};

for (let i = 0; i < 2; i++) {
   radioFlor[i].addEventListener('change', function (e) {
      if (radioFlor[i].value != 'no') {
         result += +radioFlor[i].value;
      } else {
         result -= +radioFlor[0].value;
      }
      printResult(result);
   });
   radioReg[i].addEventListener('change', function (e) {
      if (radioReg[i].value != 'no') {
         result += +radioReg[i].value;
      } else {
         result -= +radioReg[0].value;
      }
      printResult(result);
   });
};