var input = document.getElementById('input'),
   numbers = document.querySelectorAll('.num'),
   operationsBtn = document.querySelectorAll('.op'),
   clearBtns = document.querySelectorAll('.clear-btns'),
   decBtn = document.getElementById('decimal'),
   MemoryCurrentNum = 0,
   MemoryNewNum = false,
   MemoryPendingOperation = '';

document.onkeypress = function (e) {
   if (e.keyCode >= 48 && e.keyCode <= 57) {
      numPress(e.key);
   } else if (e.keyCode == 42 || e.keyCode == 45 || e.keyCode == 43 || e.keyCode == 92 || e.keyCode == 47 || e.keyCode == 61) {
      operations(e.key);
   } else if (e.keyCode == 13) {
      operations('=');
   } else if (e.keyCode == 46) {
      dec();
   }
};
document.onkeydown = function (e) {
   if (e.keyCode == 46 || e.keyCode == 8) {
      clear('del');
   }
};

for (var i = 0; i < numbers.length; i++) {
   number = numbers[i];
   number.addEventListener('click', function (e) {
      numPress(e.target.textContent);
   });
};

for (var i = 0; i < operationsBtn.length; i++) {
   operation = operationsBtn[i];
   operation.addEventListener('click', function (e) {
      operations(e.target.textContent);
   });
};

for (var i = 0; i < clearBtns.length; i++) {
   clearBtn = clearBtns[i];
   clearBtn.addEventListener('click', function (e) {
      clear(e.srcElement.id)
   });
};

decBtn.addEventListener('click', dec);

function numPress(num) {
   if (MemoryNewNum) {
      input.value = num;
      MemoryNewNum = false;
   } else {
      if (input.value === '0') {
         input.value = num;
      } else {
         input.value += num;
      };
   };
};

function operations(op) {
   var localOperMemory = input.value;
   if (MemoryNewNum && MemoryPendingOperation !== '=') {
      input.value = MemoryCurrentNum;
   } else {
      MemoryNewNum = true;
      if (MemoryPendingOperation === '+') {
         MemoryCurrentNum += parseFloat(localOperMemory);
      } else if (MemoryPendingOperation === '-') {
         MemoryCurrentNum -= parseFloat(localOperMemory);
      } else if (MemoryPendingOperation === '/') {
         MemoryCurrentNum /= parseFloat(localOperMemory);
      } else if (MemoryPendingOperation === '*') {
         MemoryCurrentNum *= parseFloat(localOperMemory);
      } else {
         MemoryCurrentNum = parseFloat(localOperMemory);
      }
      input.value = MemoryCurrentNum;
      MemoryPendingOperation = op;
   };
};

function clear(id) {
   console.log(id);
   if (id === 'ce') {
      input.value = '0';
      MemoryNewNum = true;
   } else if (id === 'c') {
      input.value = '0';
      MemoryCurrentNum = 0;
      MemoryNewNum = true;
      MemoryPendingOperation = '';
   } else if (id === 'del') {
      if (input.value.length !== 1) {
         input.value = input.value.substring(0, input.value.length - 1);
      } else {
         input.value = 0;
      }
   };
};

function dec() {
   var localDecMemory = input.value;

   if (MemoryNewNum) {
      localDecMemory = "0.";
      MemoryNewNum = false;
   } else {
      if (localDecMemory.indexOf(".") == -1) {
         localDecMemory += '.';
      }
      input.value = localDecMemory;
   };
};