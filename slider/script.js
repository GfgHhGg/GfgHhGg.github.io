const wrap = document.querySelector('.wrap');
const lastClone = document.getElementById('lastClone');
const startClone = document.getElementById('startClone');

const size = -600;
let slide = 1;

const prew = document.getElementById('prew');
const next = document.getElementById('next');

next.onclick = () => {
   if (slide == 7) return;
   wrap.style.transition = '.7s';
   slide++;
   wrap.style.marginLeft = String(slide * size) + 'px';
}

prew.onclick = () => {
   if (slide == 0) return;
   wrap.style.transition = '.7s';
   slide--;
   wrap.style.marginLeft = String(slide * size) + 'px';
}

wrap.addEventListener('transitionend', () => {
   if (slide == 0) {
      slide = 6;
      wrap.style.transition = 'none';
      wrap.style.marginLeft = String(slide * size) + 'px';
   }
   if (slide == 7) {
      slide = 1;
      wrap.style.transition = 'none';
      wrap.style.marginLeft = String(slide * size) + 'px';
   }
});