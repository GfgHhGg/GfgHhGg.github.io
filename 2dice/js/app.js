"use strict";

var isModal = false;
var isSlickInit = false;
window.addEventListener('load', function () {
  $('.chat__tab').click(function () {
    if ($(this).hasClass('chat__tab_active')) return;
    $('.chat__tab_active').removeClass('chat__tab_active');
    $(this).addClass('chat__tab_active');
  });
  $('.counter').click(function (e) {
    var $self = $(this);
    var $trg = $(e.target);
    var sum = $self.find('.counter__total').html();

    if ($trg.hasClass('counter__btn-pls')) {
      $self.find('.counter__total').html(+sum + 100);
    } else if ($trg.hasClass('counter__btn-min') && sum > 100) {
      $self.find('.counter__total').html(sum - 100);
    } else if ($trg.hasClass('counter__jump')) {
      $self.find('.counter__total').html($trg.html());
    }
  });
  $('.choice').click(function (e) {
    var $trg = $(e.target);

    if ($trg.hasClass('choice__cube') && !$trg.hasClass('choice__cube_active')) {
      $('.choice__cube_active').removeClass('choice__cube_active');
      $trg.addClass('choice__cube_active');
    }
  });
  $('.open-modal').click(function (e) {
    isModal = true;
    $('.toggle').hide();
    $('header').addClass('header_fixed');
    $('#' + $(this).attr('data-modal')).addClass('modal_open');
  });
  $('.header__logo').click(function (e) {
    isModal = false;
    $('.toggle').show();
    $('header').removeClass('header_fixed');
    $('.modal_open').removeClass('modal_open');
  });
  $('.modal__tab').click(function (e) {
    if ($(this).hasClass('modal__tab_active')) return;
    $('.modal__tab_active').removeClass('modal__tab_active');
    $(this).addClass('modal__tab_active');
  });
  slickInit();
});
window.addEventListener('resize', function () {
  slickInit();
});

function slickInit() {
  if ($('body').width() <= 1070 && !isSlickInit) {
    isSlickInit = true;
    $('.page-content').slick({
      centerMode: true,
      variableWidth: true,
      slideToShow: 1,
      infinite: false,
      arrows: false,
      dots: true
    }).css('display', 'block');
  }

  if ($('body').width() > 1070 && isSlickInit) {
    isSlickInit = false;
    $('.page-content').slick('unslick').css('display', 'flex');
  }
}