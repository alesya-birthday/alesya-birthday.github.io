// Обратный отсчет
function getWordForm(n, forms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 == 1) return forms[0];
    return forms[2];
}

function updateCountdown() {
    const eventDate = new Date('2025-06-29T15:00:00');
    const now = new Date();
    const diff = eventDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dayWord = getWordForm(days, ['день', 'дня', 'дней']);
    const hourWord = getWordForm(hours, ['час', 'часа', 'часов']);
    const minWord = getWordForm(minutes, ['минута', 'минуты', 'минут']);
    const secWord = getWordForm(seconds, ['секунда', 'секунды', 'секунд']);

    document.getElementById('countdown-text').innerHTML =
        `До праздника осталось: <b>${days}</b> ${dayWord} <b>${hours}</b> ${hourWord} <b>${minutes}</b> ${minWord} <b>${seconds}</b> ${secWord}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Инициализация карты
function initMap() {
    const location = { lat: 53.9045, lng: 27.5615 }; // Координаты Минска
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Место проведения'
    });
}

// Обработка формы RSVP
// document.getElementById('rsvp-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);
    
//     // Здесь должна быть логика отправки данных на сервер
//     alert('Спасибо за подтверждение! Мы свяжемся с вами в ближайшее время.');
//     this.reset();
// });

// Обработка поля аллергий
document.getElementById('allergies-select').addEventListener('change', function() {
    const detailsField = document.getElementById('allergies-details');
    detailsField.style.display = this.value === 'yes' ? 'block' : 'none';
});

// --- Новая анимация конфетти: взрывы в случайных местах по краям сайта ---
/*
function createConfettiBurst() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#1e88e5', '#64b5f6', '#e3f2fd', '#b0bec5'];
    const burstCount = 18 + Math.floor(Math.random() * 8);
    // Выбираем точку для взрыва: по краям, не в центре
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const x = side === 'left'
        ? Math.random() * 0.18 * window.innerWidth
        : window.innerWidth - Math.random() * 0.18 * window.innerWidth;
    const y = 60 + Math.random() * (window.innerHeight - 200);

    for (let i = 0; i < burstCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.zIndex = 1;
        confettiContainer.appendChild(confetti);

        // Вектор разлёта
        const angle = (2 * Math.PI * i) / burstCount + Math.random() * 0.2;
        const distance = 80 + Math.random() * 60;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        const animation = confetti.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) scale(${0.7 + Math.random() * 0.5})`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 700,
            easing: 'cubic-bezier(.37,0,.63,1)'
        });
        animation.onfinish = () => confetti.remove();
    }
}
*/

// Запуск взрывов конфетти с интервалом
window.addEventListener('load', () => {
    // setInterval(createConfettiBurst, 1800); // Закомментировано
});

// Инициализация карты при загрузке страницы
// window.addEventListener('load', initMap);

// --- Галерея: добавление фото в стиле полароид-коллажа ---
// Этот код больше не используется, так как галерея теперь в HTML
/*
const gallerySlider = document.getElementById('gallery-slider');
const galleryImages = [
  'img/gallery1.jpg',
  'img/gallery2.jpg',
  'img/gallery3.jpg',
  'img/gallery4.jpg'
];

galleryImages.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Фото с праздника';
  gallerySlider.appendChild(img);
}); 
*/

// --- Попап окно для фото --- 
const modal = document.getElementById("photo-modal");
const modalImg = document.getElementById("modal-image");
const closeButton = document.getElementsByClassName("close-button")[0];

// Получаем все изображения в галерее
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

// Закрываем модальное окно при клике на кнопку закрытия (x)
closeButton.onclick = function() {
  modal.style.display = "none";
}

// Закрываем модальное окно при клике вне изображения
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// --- Функции для форматирования имени и подстановки в поле формы ---
function formatNameForInput(name) {
  if (!name) return '';
  // ... existing code ...
}

// ... existing code ... 