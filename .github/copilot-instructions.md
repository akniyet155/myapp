# Telegram Mini App Development Guide

## Архитектура проекта

Это простое Telegram Mini App приложение с одностраничной архитектурой без сборщика - готово к загрузке на любой конструктор сайтов.

- **Frontend**: Vanilla JavaScript + HTML + CSS (без зависимостей)
- **API**: Telegram Web App API (`window.Telegram.WebApp`)
- **Deployment**: Статические файлы для любого хостинга

## Ключевые файлы

- `index.html` - главная страница с базовой разметкой и подключением Telegram SDK
- `app.js` - вся логика приложения и интеграция с Telegram
- `style.css` - стили с использованием CSS-переменных Telegram для тем

## Паттерны и конвенции

### Инициализация Telegram Web App

Всегда инициализируйте приложение в `DOMContentLoaded`:

```javascript
const tg = window.Telegram.WebApp;
tg.ready();  // Обязательно вызовите для готовности приложения
tg.expand(); // Расширить на весь экран
```

### Работа с темами

Используйте CSS-переменные Telegram вместо жестко заданных цветов:

```css
background-color: var(--tg-theme-bg-color, #ffffff);
color: var(--tg-theme-text-color, #000000);
```

Второй параметр - fallback для тестирования вне Telegram.

### Получение данных пользователя

```javascript
const user = tg.initDataUnsafe?.user;
// Содержит: id, first_name, last_name, username, language_code
```

### MainButton (нижняя кнопка)

```javascript
tg.MainButton.setText('Текст кнопки');
tg.MainButton.onClick(() => { /* действие */ });
tg.MainButton.show(); // или .hide()
```

## Команды разработки

Приложение не требует сборки. Просто откройте `index.html` в браузере для локального тестирования или загрузите все три файла на хостинг/конструктор сайтов.

## Тестирование

1. **Локально через браузер**: откройте `index.html` напрямую (некоторые Telegram API недоступны)
2. **На хостинге**: загрузите файлы на любой конструктор или хостинг с HTTPS
3. **Через Bot Father**: создайте Mini App через `/newapp` и укажите URL вашего сайта

## Отправка данных боту

Используйте `tg.sendData()` для отправки данных вашему боту:

```javascript
tg.sendData(JSON.stringify({ action: 'submit', data: {...} }));
```

После отправки приложение автоматически закроется.

## Безопасность

- `tg.initData` содержит подписанные данные от Telegram - валидируйте на сервере
- Никогда не доверяйте только клиентской проверке
- Все важные операции выполняйте через backend с проверкой `initData`

## Deployment

Приложение должно быть доступно по HTTPS. Варианты:

- **Vercel/Netlify**: автоматический deploy из git
- **GitHub Pages**: для статических сайтов
- **Собственный сервер**: nginx + certbot для SSL

Просто укажите URL в BotFather при создании Mini App.
