"use strict";

$('.chat__tab').click(function () {
  if ($(this).hasClass('chat__tab_active')) return;
  $('.chat__tab_active').removeClass('chat__tab_active');
  $(this).addClass('chat__tab_active');
});