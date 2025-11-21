// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

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
});
