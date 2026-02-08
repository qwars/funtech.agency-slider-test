# funtech.agency-slider-test

Адаптивный слайдер карточек NFT для тестового задания на должность фронтенд-разработчика в [Funtech Agency](https://funtech.agency)

## Технологический стек

- **React** - основной фреймворк
- **Redux Toolkit** - управление состоянием
- **SCSS** - стилизация
- **Framer Motion** - анимации
- **Docker** - контейнеризация

## Функционал

- Адаптивная вёрстка (desktop / tablet / mobile)
- Слайдер с данными из публичного API CoinGecko
- Генерация случайных данных (таймер, ставка)
- Случайные изображения для карточек
- Корректная работа с асинхронной загрузкой данных

## Задача

Разработка адаптивной вёрстки страницы по макету Figma с интеграцией публичного API для отображения NFT карточек в слайдере.

## Запуск проекта

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки
yarn dev

# Сборка для продакшена
yarn build

# Запуск через Docker
docker build -t funtech-slider .
docker run -p 3000:3000 funtech-slider

# Запуск через Docker Compose
docker-compose up -d
docker-compose run --rm  funtech-slider yarn dev # lint, format и т.д.

```
