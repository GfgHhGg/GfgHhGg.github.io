"use strict";

$('.open-modal').click(function () {
  $('#modal-' + $(this).attr('data-modal')).show();
});
$('.modal-exit').click(function (e) {
  e.stopPropagation();

  if (e.target == this) {
    $('.modal').hide();
  }
});