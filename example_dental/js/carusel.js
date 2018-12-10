document.getElementById("caruselLeftBtn").onclick = leftShift;
document.getElementById("caruselRightBtn").onclick = rightShift;

var sliderItem = document.getElementsByClassName('slider__item');
var slider = document.getElementById('slider');
var ItemNumText = document.getElementById('sliderItemNum');   
var shift = 570;
var itemNum = 0;

function rightShift() {
  shift = shift - 570;
  if( shift < -2850 ) {
    shift = 570;
  }
  slider.style.left = shift + 'px';

  itemNum = itemNum + 1;
  sliderItem[itemNum - 1].className = "slider__item slider__item-opacity";
  if (itemNum > 6) {
    itemNum = 0;
  }
  sliderItem[itemNum].className = "slider__item";

  ItemNumText.textContent = itemNum + 1;
};

function leftShift() {
  shift = shift + 570;
  if( shift > 570 ) {
    shift = -2850;
  }
  slider.style.left = shift + 'px';

  itemNum = itemNum - 1;
  sliderItem[itemNum + 1].className = "slider__item slider__item-opacity";
  if (itemNum < 0) {
    itemNum = 6;
  }
  sliderItem[itemNum].className = "slider__item";
  
  ItemNumText.textContent = itemNum + 1;
};