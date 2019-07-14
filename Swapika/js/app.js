"use strict";

$(document).ready(function () {
  $('.reviews-slider').slick({
    arrows: false,
    dots: true,
    centerMode: true,
    variableWidth: true
  });
  $('.news-slider').slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    responsive: [{
      breakpoint: 1170,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $('.arrow-abs').on('click', function () {
    $(this).parent().find('.currency-wrp').toggleClass('show');
    $(this).toggleClass('to-top');
  });
  $('.burger-opener').on('click', function () {
    $('.menu').toggleClass('show');
    $('.burger-opener').toggleClass('show');
  }); // currency-tab

  $('.currency_give').first().addClass('active-give');
  $('.currency_give').on('click', function () {
    $('.currency_give').removeClass('active-give');
    $(this).addClass('active-give');
  }); // currency-tab

  $('.currency_take').first().addClass('active-take');
  $('.currency_take').on('click', function () {
    $('.currency_take').removeClass('active-take');
    $(this).addClass('active-take');
  });
});