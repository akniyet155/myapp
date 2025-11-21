// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Карусель
let currentSlide = 0;
let carouselInterval;
let touchStartX = 0;
let touchEndX = 0;

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carousel = document.querySelector('.carousel');
    
    if (slides.length === 0) return;
    
    // Создание точек
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Свайп для карусели
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // Автоматическая смена слайдов
    carouselInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, 4000);
}

function handleSwipe() {
    const slides = document.querySelectorAll('.carousel-item');
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Свайп влево - следующий слайд
        goToSlide((currentSlide + 1) % slides.length);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Свайп вправо - предыдущий слайд
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Сброс таймера автопрокрутки
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, 4000);
}

// Навигация между страницами
function showPage(pageId) {
    const mainPage = document.getElementById('mainPage');
    const botsPage = document.getElementById('botsPage');
    const backArrow = document.getElementById('backArrow');
    
    if (pageId === 'bots') {
        mainPage.style.display = 'none';
        botsPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else {
        botsPage.style.display = 'none';
        mainPage.style.display = 'block';
        backArrow.classList.remove('visible');
    }
}

// Инициализация после загрузки DOM
window.addEventListener('DOMContentLoaded', function() {
    // Инициализация карусели
    initCarousel();
    
    // Обработчики кнопок категорий
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            if (category === 'search') {
                showPage('bots');
            } else {
                tg.showAlert('Эта категория скоро появится!');
            }
        });
    });

    // Кнопки "Создать Mini App"
    const createButtons = document.querySelectorAll('.create-btn');
    createButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tg.showAlert('Свяжитесь с нами для создания вашего Mini App! 🚀');
        });
    });

    // Кнопка "Назад"
    const backArrow = document.getElementById('backArrow');
    if (backArrow) {
        backArrow.addEventListener('click', () => {
            showPage('main');
        });
    }

    // Обработчики нижнего меню
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const appUrl = 'https://akniyet155.github.io/myapp/';
            const shareText = `Каталог ботов - найди своего помощника!`;
            
            tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`);
        });
    }

    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const contactUsername = 'akniyet155'; // Замените на ваш username
            tg.openTelegramLink(`https://t.me/${contactUsername}`);
        });
    }
});
