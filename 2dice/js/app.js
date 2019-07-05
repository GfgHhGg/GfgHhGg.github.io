"use strict";

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
  }
});