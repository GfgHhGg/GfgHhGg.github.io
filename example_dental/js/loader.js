document.body.onload = function () {
  setTimeout(function () {
    document.getElementById('preloader').style.visibility = 'hidden';
    document.getElementById('preloader').style.opacity = 0;
    document.body.style.overflowY = 'visible';
  }, 100);

}