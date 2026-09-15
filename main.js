/* ===========================================================
   Vultur club — скрипты страницы
   1. Переключение языка RO / EN
   2. Мобильное меню
   3. Фильтр расписания по дисциплинам
   4. Подсветка текущего дня недели
   =========================================================== */

var lang = 'ro';

/* --- 1. Язык --------------------------------------------- */
function setLang(next){
  lang = next;
  document.documentElement.lang = next;

  document.querySelectorAll('[data-ro]').forEach(function(el){
    var val = el.getAttribute('data-' + next);
    if (val !== null) el.textContent = val;
  });

  document.querySelectorAll('.lang button').forEach(function(b){
    b.setAttribute('aria-pressed', String(b.dataset.lang === next));
  });
}

document.querySelectorAll('.lang button').forEach(function(b){
  b.addEventListener('click', function(){ setLang(b.dataset.lang); });
});

/* --- 2. Мобильное меню ----------------------------------- */
var burger = document.getElementById('burger');
var menu   = document.getElementById('menu');

burger.addEventListener('click', function(){
  var open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

menu.addEventListener('click', function(e){
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

/* --- 3. Фильтр расписания -------------------------------- */
var filterBtns = document.querySelectorAll('.filters button');
var rows       = document.querySelectorAll('#schedule tbody tr');
var emptyMsg   = document.getElementById('empty-msg');

function applyFilter(disc){
  var visibleRows = 0;

  rows.forEach(function(row){
    var slots = row.querySelectorAll('.slot');
    var matches = 0;

    slots.forEach(function(slot){
      var hit = (disc === 'all') || (slot.dataset.disc === disc);
      slot.classList.toggle('dim', !hit);
      if (hit) matches++;
    });

    var show = matches > 0;
    row.hidden = !show;
    if (show) visibleRows++;
  });

  emptyMsg.hidden = visibleRows > 0;

  filterBtns.forEach(function(b){
    b.setAttribute('aria-pressed', String(b.dataset.disc === disc));
  });
}

filterBtns.forEach(function(b){
  b.addEventListener('click', function(){ applyFilter(b.dataset.disc); });
});

/* --- 4. Сегодняшний день --------------------------------- */
/* getDay(): 0 — воскресенье, 1 — понедельник … 6 — суббота.
   В таблице data-day хранит то же число, воскресенья в расписании нет. */
function markToday(){
  var today = new Date().getDay();

  rows.forEach(function(row){
    if (Number(row.dataset.day) === today) row.classList.add('today');
  });
}

markToday();
