"use strict";

$(document).ready(function () {
  var appSpecChange = false;

  if ($(window).width() <= 800) {
    appSpecChange = true;
    $('.app-spec__right').appendTo($('.app-spec'));
  }

  $(window).resize(function () {
    if ($(window).width() <= 800 && !appSpecChange) {
      appSpecChange = true;
      $('.app-spec__right').appendTo($('.app-spec'));
    } else if ($(window).width() > 800 && appSpecChange) {
      appSpecChange = false;
      $('.app-spec__right').appendTo($('.app-spec__top'));
    }
  });
  $('.open-modal').click(function () {
    $('#modal-' + $(this).attr('data-modal')).show();
  });
  $('.modal-exit').click(function (e) {
    e.stopPropagation();

    if (e.target == this) {
      $('.modal').hide();
    }
  });
  var burgerOpen = false;
  $('.burger-wrp').click(function (e) {
    var $menu = $('.burger-menu');

    if (burgerOpen) {
      burgerOpen = false;
      $($(this).children()[0]).removeClass('icomoon', 'ico-exit').addClass('burger');
      $menu.css('right', 'calc(100% + 40vw)');
    } else {
      burgerOpen = true;
      $($(this).children()[0]).removeClass('burger').addClass('icomoon ico-exit');
      $menu.css('right', 'calc(100% - 275px)');
    }
  });
  $('.lang-select-wrp').click(function () {
    $(this).toggleClass('lang-select-open');
  });
});