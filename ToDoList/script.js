var out = document.getElementById('taskList'),
   taskInp = document.getElementById('taskInp'),
   desc = document.getElementById('desc'),
   taskList = [];

if (localStorage.getItem('loaclTaskList') !== null) {
   taskList = JSON.parse(localStorage.getItem('loaclTaskList'));
   createList();
}

function addTask() {
   if (taskInp.value != "") {
      document.getElementById('warn').style.display = "none";
      var temp = {};
      temp.title = taskInp.value;
      temp.check = false;
      temp.description = desc.value;
      taskList.push(temp);
      taskInp.value = "";
      desc.value = "";
      addToList();
   } else {
      document.getElementById('warn').style.display = "block";
   }
}

function clearForm() {
   taskInp.value = "";
   desc.value = "";
}

function addToList() {
   var temp = taskList[taskList.length - 1];
   out.insertAdjacentHTML("afterbegin", "<div class='tascBlock' id='" + String(taskList.length - 1) + "'><b><p class='title'>" + taskList.length + ") " + temp.title + "</p></b><pre><p class='descText'>" + temp.description + "</p></pre><input type='checkbox' class='chbox'><span class='clearBlockIcon' title='Delete this tasc?'>&#10006;</span><div>");
   localStorage.setItem('loaclTaskList', JSON.stringify(taskList));
}

// last 
function createList() {
   out.innerHTML = '';
   for (let i = 0; i < taskList.length; i++) {
      var temp = taskList[i];
      out.insertAdjacentHTML("afterbegin", "<div class='tascBlock' id='" + i + "'><b><p class='title'>" + String(i + 1) + ") " + temp.title + "</p></b><pre><p class='descText'>" + temp.description + "</p></pre><input type='checkbox' class='chbox'><span class='clearBlockIcon' title='Delete this tasc?'>&#10006;</span><div>");
      if (temp.check) {
         document.getElementById(i).style.backgroundColor = 'rgba(43, 206, 51, 0.5)';
         document.getElementById(i).children[2].checked = true;
      }
   }
}

out.onclick = function (e) {
   if (e.target.id != 'taskList' && e.target.className != 'clearBlockIcon') {
      var i = 0;
      while (e.path[i].className != 'tascBlock') {
         i++;
      }
      if (!taskList[e.path[i].id].check) {
         e.path[i].style.backgroundColor = 'rgba(43, 206, 51, 0.5)';
         taskList[e.path[i].id].check = true;
         e.path[i].children[2].checked = true;
      } else {
         e.path[i].style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
         taskList[e.path[i].id].check = false;
         e.path[i].children[2].checked = false;
      }
      localStorage.setItem('loaclTaskList', JSON.stringify(taskList));
   } else if (e.target.className == 'clearBlockIcon') {
      taskList.splice(e.path[1].id, 1);
      localStorage.setItem('loaclTaskList', JSON.stringify(taskList));
      createList();
   }
}

taskInp.onkeydown = function (e) {
   if (e.keyCode == 13) {
      e.preventDefault();
      addTask();
      return false;
   }
}