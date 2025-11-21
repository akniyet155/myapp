// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Отслеживание текущей страницы для навигации
let currentPage = 'main';

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
    
    // Сохраняем текущую страницу
    currentPage = pageId;
    
    // Добавляем в историю браузера для поддержки системной кнопки назад
    if (pageId !== 'main') {
        window.history.pushState({ page: pageId }, '', `#${pageId}`);
    } else {
        window.history.pushState({ page: 'main' }, '', '#');
    }
    
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
        tg.BackButton.show();
    } else if (pageId === 'vpn') {
        vpnPage.style.display = 'block';
        tg.BackButton.show();
    } else if (pageId === 'movies') {
        moviesPage.style.display = 'block';
        tg.BackButton.show();
    } else if (pageId === 'builders') {
        buildersPage.style.display = 'block';
        tg.BackButton.show();
    } else if (pageId === 'other') {
        otherPage.style.display = 'block';
        tg.BackButton.show();
    } else if (pageId === 'ads') {
        adsPage.style.display = 'block';
        tg.BackButton.show();
    } else {
        mainPage.style.display = 'block';
        tg.BackButton.hide();
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

    // Кнопка "Назад" Telegram
    tg.BackButton.onClick(() => {
        showPage('main');
    });
    
    // Обработка системной кнопки "Назад" (Android/iOS)
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            // Переходим на сохраненную страницу без добавления в историю
            const pageId = event.state.page;
            currentPage = pageId;
            
            const mainPage = document.getElementById('mainPage');
            const botsPage = document.getElementById('botsPage');
            const vpnPage = document.getElementById('vpnPage');
            const moviesPage = document.getElementById('moviesPage');
            const buildersPage = document.getElementById('buildersPage');
            const otherPage = document.getElementById('otherPage');
            const adsPage = document.getElementById('adsPage');
            
            // Скрываем все
            mainPage.style.display = 'none';
            botsPage.style.display = 'none';
            vpnPage.style.display = 'none';
            moviesPage.style.display = 'none';
            buildersPage.style.display = 'none';
            otherPage.style.display = 'none';
            adsPage.style.display = 'none';
            
            // Показываем нужную
            if (pageId === 'bots') {
                botsPage.style.display = 'block';
                tg.BackButton.show();
            } else if (pageId === 'vpn') {
                vpnPage.style.display = 'block';
                tg.BackButton.show();
            } else if (pageId === 'movies') {
                moviesPage.style.display = 'block';
                tg.BackButton.show();
            } else if (pageId === 'builders') {
                buildersPage.style.display = 'block';
                tg.BackButton.show();
            } else if (pageId === 'other') {
                otherPage.style.display = 'block';
                tg.BackButton.show();
            } else if (pageId === 'ads') {
                adsPage.style.display = 'block';
                tg.BackButton.show();
            } else {
                mainPage.style.display = 'block';
                tg.BackButton.hide();
            }
        } else {
            // Если нет состояния, возвращаемся на главную
            showPage('main');
        }
    });

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

    // Info button для Funstat Bot
    const funstatInfoBtn = document.getElementById('funstatInfo');
    if (funstatInfoBtn) {
        funstatInfoBtn.addEventListener('click', () => {
            tg.showAlert('Этο τ℮ⅼełοց | iηƒοsτατ - Бoт ρазвлeқательнoй cтαтиcтики πo т℮легραммγ. Для προcмοтρα инφoρмαции oтπρавь @username/кοнтаkт/id/ссылкγ/cтиқ℮ρ/пост. B базе 1 020 526 976 пользοватeлeй, 51 893 812 чαтοв/каналов и 94 755 004 416 coοбщ℮ний');
        });
    }

    // Info button для Himera Bot
    const himeraInfoBtn = document.getElementById('himeraInfo');
    if (himeraInfoBtn) {
        himeraInfoBtn.addEventListener('click', () => {
            tg.showAlert('Dobro пожаловать в Himera Search! 📞 Поиск по Телефону, 🕵️‍♂️ Поиск по ФИО, 📷 Поиск по Фото, 🔍 Все виды поиска (Email/Паспорт/ИНН/VIN Авто), 📉 Тарифы со скидками, 🤖 Мои боты с 15% комиссией');
        });
    }

    // Info button для Vektor Bot
    const vektorInfoBtn = document.getElementById('vektorInfo');
    if (vektorInfoBtn) {
        vektorInfoBtn.addEventListener('click', () => {
            tg.showAlert('Добро пожаловать в поисковую систему Вектор. Исследуйте безграничные возможности вместе с нами, преобразуя открытые источники в полезные знания для поиска и экспериментов.');
        });
    }

    // Info button для Detectiv Bot
    const detectivInfoBtn = document.getElementById('detectivInfo');
    if (detectivInfoBtn) {
        detectivInfoBtn.addEventListener('click', () => {
            tg.showAlert('👋 Добро пожаловать в наш Телеграм-Бот поиска данных!\n🔸 Бот способен находить социальные сети привязанные к российским номерам и множество дополнительной информации\n\n📱 Введите российский номер формата: +7(911)22-33-444\n📧 Введите Email формата: denis@ya.ru\n🆔 Введите ссылку на ВКонтакте, Instagram, ok.ru, FaceBook');
        });
    }

    // Info button для Enigma Bot
    const enigmaInfoBtn = document.getElementById('enigmaInfo');
    if (enigmaInfoBtn) {
        enigmaInfoBtn.addEventListener('click', () => {
            tg.showAlert('🌟 Добро пожаловать в мир цифровых расследований!\n»»» Я - ваш личный помощник-детектив, объединяющий передовые технологии информационной безопасности и искусство OSINT разведки.\n\n🔍 В моём арсенале:\n• Анализ номеров телефонов и контактных данных\n• Исследование транспортных средств\n• Проверка документов\n• Поиск по базам данных\n\n⚡ Особенности работы:\n• Конфиденциальность каждого запроса\n• Использование только легальных методов\n• Оперативность и точность результатов');
        });
    }

    // Info button для Sherlock Bot
    const sherlockInfoBtn = document.getElementById('sherlockInfo');
    if (sherlockInfoBtn) {
        sherlockInfoBtn.addEventListener('click', () => {
            tg.showAlert('🕵️ «Шерлок». Если информация существует — я её найду.\n\n🕵️ Личность: ФИО\n📲 Контакты: телефон, email\n🚘 Транспорт: номер автомобиля, VIN\n💬 Социальные сети: VK, TikTok, Instagram, OK\n📟 Telegram: логин или ID\n📄 Документы: ВУ, паспорт, СНИЛС, ИНН\n🌐 Онлайн-следы: домен или IP\n🏚 Недвижимость: адрес, кадастровый номер\n🏢 Юр.лицо: ИНН, ОГРН\n📸 Поиск по фото');
        });
    }

    // Info button для Пранк бот
    const prankInfoBtn = document.getElementById('prankInfo');
    if (prankInfoBtn) {
        prankInfoBtn.addEventListener('click', () => {
            tg.showAlert('👋 Добро пожаловать!\n\n💣 SMS Boom (45 ₽) – отправка SMS с кодами от различных сервисов\n📵 PhoneCaLLer (375 ₽) – номер отправляется в 500+ ресурсов с просьбой о звонке\n🎉 Звонок-розыгрыш – разыгрыш заготовленной записью\n📩 Анонимное SMS (45 ₽) – анонимное SMS с вашим текстом\n📞 Анонимный звонок (69 ₽) – конференц-связь между двумя номерами\n📡 Статус абонента (20 ₽) – узнать, в сети ли абонент\n🤍 Белый список (749 ₽) – защита от розыгрышей\n\n🇷🇺 Работает только с номерами РФ (+7)');
        });
    }
});
