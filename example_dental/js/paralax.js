(function() {

    var scroll = function () {
        var s = window.pageYOffset;
        s /= 1.8;
        var y = 250;
        var c = y + s;
        document.getElementById('leftParalax').style.top = c + 'px';
    };
    
    window.addEventListener('scroll', function (e) {
        scroll();
    });
})();
(function() {

    var scroll = function () {
        var s = window.pageYOffset;
        s /= 9;
        var y = 650;
        var c = y + s;
        document.getElementById('centerParalax').style.top = c + 'px';
    };

    window.addEventListener('scroll', function (e) {
        scroll();
    });
})();
(function() {

    var scroll = function () {
        var s = window.pageYOffset;
        s /= 2;
        var y = 550;
        var c = y + s;
        document.getElementById('rightParalax').style.top = c + 'px';
    };

    window.addEventListener('scroll', function (e) {
        scroll();
    });
})();
(function() {

  var scroll = function () {
      var s = window.pageYOffset;
      s /= 6;
      var y = -400;
      var c = y + s;
      document.getElementById('bottomParalax').style.top = c + 'px';
  };

  window.addEventListener('scroll', function (e) {
      scroll();
  });
})();