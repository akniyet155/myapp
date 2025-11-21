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
    
    // Убираем все классы
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    dots[currentSlide].classList.remove('active');
    
    // Определяем направление
    const oldSlide = currentSlide;
    currentSlide = index;
    
    // Применяем новые классы с эффектом сдвига
    if (oldSlide !== currentSlide) {
        slides[oldSlide].classList.add('prev');
    }
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
    const vpnPage = document.getElementById('vpnPage');
    const moviesPage = document.getElementById('moviesPage');
    const buildersPage = document.getElementById('buildersPage');
    const otherPage = document.getElementById('otherPage');
    const adsPage = document.getElementById('adsPage');
    const backArrow = document.getElementById('backArrow');
    
    // Скрываем все страницы
    mainPage.style.display = 'none';
    botsPage.style.display = 'none';
    vpnPage.style.display = 'none';
    moviesPage.style.display = 'none';
    buildersPage.style.display = 'none';
    otherPage.style.display = 'none';
    adsPage.style.display = 'none';
    
    // Показываем нужную страницу
    if (pageId === 'bots') {
        botsPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else if (pageId === 'vpn') {
        vpnPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else if (pageId === 'movies') {
        moviesPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else if (pageId === 'builders') {
        buildersPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else if (pageId === 'other') {
        otherPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else if (pageId === 'ads') {
        adsPage.style.display = 'block';
        backArrow.classList.add('visible');
    } else {
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
            } else if (category === 'vpn') {
                showPage('vpn');
            } else if (category === 'movies') {
                showPage('movies');
            } else if (category === 'builders') {
                showPage('builders');
            } else if (category === 'other') {
                showPage('other');
            } else if (category === 'ads') {
                showPage('ads');
            } else {
                tg.showAlert('Эта категория скоро появится!');
            }
        });
    });

    // Кнопки "Создать Mini App"
    const createButtons = document.querySelectorAll('.create-btn');
    createButtons.forEach(btn => {
        const icon = btn.querySelector('.create-icon');
        const text = btn.querySelector('.create-text');
        
        // Клик на иконку - раскрытие/сворачивание
        if (icon) {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('expanded');
            });
        }
        
        // Клик на текст - действие (здесь можно добавить свою логику)
        if (text) {
            text.addEventListener('click', (e) => {
                e.stopPropagation();
                if (btn.classList.contains('expanded')) {
                    // Уведомление о том, что раздел скоро будет
                    tg.showAlert('Раздел "Создать зеркало" скоро появится! 🚀');
                }
            });
        }
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

    // Info button для SubGram
    const subgramInfoBtn = document.getElementById('subgramInfo');
    if (subgramInfoBtn) {
        subgramInfoBtn.addEventListener('click', () => {
            tg.showAlert('SubGram — сервис для покупки/продажи мотивированных подписчиков Telegram. Увеличьте охват вашего канала с реальными активными пользователями! 📈');
        });
    }

    // Info button для BuyAd
    const buyadInfoBtn = document.getElementById('buyadInfo');
    if (buyadInfoBtn) {
        buyadInfoBtn.addEventListener('click', () => {
            tg.showAlert('Здесь ты можешь приобрести рекламу с оплатой за показы, которая будет отображаться в наших партнерских ботах.');
        });
    }
});
