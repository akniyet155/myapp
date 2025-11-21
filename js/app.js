// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Карусель
let currentSlide = 0;
let carouselInterval;

// Инициализация карусели
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (slides.length === 0) return;
    
    // Показываем первый слайд
    slides[0].classList.add('active');
    
    // Создаем индикаторы
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Обработчики кнопок
    prevBtn.addEventListener('click', () => {
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(prevIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    });
    
    // Автопрокрутка
    carouselInterval = setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }, 4000);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (slides.length === 0) return;
    
    // Убираем активный класс
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Обновляем индекс
    currentSlide = index;
    
    // Добавляем активный класс
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Сброс таймера
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
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
            // Открываем бота к которому привязано приложение
            tg.openTelegramLink('https://t.me/Vpn_OYXbot');
        });
    }

    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            tg.openTelegramLink('https://t.me/Giolikong');
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
