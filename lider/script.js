const $slider = $('.slider');
const $sliderBar = $('.slider__bar');
const $slideCount = $('.slider__item').length;
let slide = 1;

const $left = $('.slider__left');
const $right = $('.slider__right');

const transition = 0.6;

function autolist() {
   $sliderBar.css('transition', 'all ' + transition + 's');
   slide++;
   $sliderBar.css('left', (-slide * 100) + 'vw');
}
let timer = setInterval(autolist, 5000);

$slider.mouseenter(function () {
   clearInterval(timer);
});

$slider.mouseleave(function () {
   clearInterval(timer);
   timer = setInterval(autolist, 5000);
});

$sliderBar.css('width', ($slideCount * 100) + 'vw');

$left.click(function () {
   if (slide <= 0) return;
   $sliderBar.css('transition', 'all ' + transition + 's');
   slide--;
   $sliderBar.css('left', (-slide * 100) + 'vw');
});

$right.click(function () {
   if (slide >= $slideCount - 1) return;
   $sliderBar.css('transition', 'all ' + transition + 's');
   slide++;
   $sliderBar.css('left', (-slide * 100) + 'vw');
});

$sliderBar.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
   if (slide <= 0) {
      $sliderBar.css('transition', 'none');
      slide = $slideCount - 2;
   }
   if (slide >= $slideCount - 1) {
      $sliderBar.css('transition', 'none');
      slide = 1;
   }
   $sliderBar.css('left', (-slide * 100) + 'vw');
});


function paralax() {
   let s = window.pageYOffset / 2 - 100;
   $('.slider__item').css('background-position','0 ' + s + 'px')
}

window.onscroll = paralax;