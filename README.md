## Стек

### [Клиент](./src)
- TypeScript
- React
- Redux Toolkit (RTK Query)
- CSS Modules, SCSS
- Vite

### [Сервер](./server)
- TypeScript
- Express
- lowdb

---

## Запуск проекта

- `npm install` - установка зависимостей
- `npm run dev` - запуск dev проекта
- `npm run server` - запуск dev сервера
- `npm run dev:server` - запуск dev проекта с сервером

---

## Скрипты

- `npm run dev` - запуск dev проекта
- `npm run dev:server` - запуск dev проекта с сервером
- `npm run server` - запуск dev сервера
- `npm run build` - сборка в prod режиме в папку dist
- `npm run preview` - предпросмотр prod сборки
- `npm run lint` - проверка ts файлов линтером
- `npm run prepare` - прекоммит хуки с husky

---

## Архитектура проекта

В проекте использовалась архитектурная методология для фронтенд проектов - **Feature-Sliced Design**

Документация методологии - [Feature-Sliced Design (FSD)](https://feature-sliced.design/ru/docs)

---

## Линтинг и форматирование

В проекте используется eslint для проверки typescript кода.
Для форматирования используется prettier.

##### Скрипты для запуска линтеров и форматирования
- `npm run lint` - проверка ts файлов линтером с правилами из prettier

---

## pre-commit хуки
В прекоммит хуках происходит проверка линтинга и форматирования измененных файлов, конфиг
находится в [/.husky](./.husky)

---

## Работа с состоянием проекта

Взаимодействие с данными осуществляется с помощью менеджера состояния redux toolkit.

Запросы на сервер отправляются с применением [RTK query](./src/shared/api/rtkApi.ts).

---

## Сущности (entities) по FSD

- [Flight](./src/entities/Flight)

---

## Фичи (features) по FSD

- [SearchFlights](./src/features/SearchFlights)
