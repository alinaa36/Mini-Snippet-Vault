# Mini "Snippet Vault"

**Snippet Vault** — це Full-stack сервіс для систематизації та швидкого доступу до корисних фрагментів коду, нотаток та команд.

---

## Технологічний стек

| Шар | Технології |
|-----|-----------|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS |
| **Backend** | NestJS, TypeScript, Mongoose |
| **Database** | MongoDB Atlas (з використанням Text Index для пошуку) |
| **Validation** | class-validator, class-transformer |

---

## Структура проєкту

Проєкт організований як **монорепозиторій**:

```
Mini-Snippet-Vault/
├── backend/    # REST API сервер на NestJS
└── frontend/   # Клієнтський додаток на Next.js
```

---

## Реалізований функціонал

### Backend (NestJS)
- **Full CRUD** — операції для сутності `Snippet`
- **Search & Filter** — пошук за `title`/`content` (query `q`) та фільтрація за тегами
- **Пагінація** — базова обробка `page` та `limit`
- **Валідація** — сувора перевірка вхідних даних через DTO
- **Обробка помилок** — коректні статус-коди 

### Frontend (Next.js)
- **Інтерфейс** — адаптивний дизайн 
- **Управління** — створення, редагування та видалення сніпетів 
- **UI States** — реалізовано стани `loading`, `error` та `empty`

---

## API Ендпоінти

| Метод | Шлях | Опис | Параметри |
|-------|------|------|-----------|
| `GET` | `/snippets` | Отримати список (з пагінацією та пошуком) | `q`, `tag`, `page`, `limit` |
| `GET` | `/snippets/:id` | Детальна інформація про сніпет | — |
| `POST` | `/snippets` | Створення нового запису | Body (JSON) |
| `PATCH` | `/snippets/:id` | Редагування існуючого запису | Body (JSON) |
| `DELETE` | `/snippets/:id` | Видалення із бази даних | — |
| `GET` | `/snippets/tags` | Отримати список усіх наявних тегів | — |

---

## Локальний запуск

### 1. Клонування

```bash
git clone https://github.com/alinaa36/Mini-Snippet-Vault.git
cd Mini-Snippet-Vault
```

### 2. Backend

```bash
cd backend
npm install
# Створіть .env 
npm run start:dev
```

### 3. Frontend

```bash
cd ../frontend
npm install
# Створіть .env
npm run dev
```

---

## Змінні оточення

### Backend (`.env`)

```env
MONGODB_URI=<URL підключення до MongoDB Atlas>
PORT=3001
CLIENT_URL=http://localhost:3000

```

### Frontend (`.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> Замість `http://localhost:3000` можна вказати посилання на задеплоєний Render-сервер.

---

## Деплой

| Сервіс | Посилання |
|--------|-----------|
| **Frontend** (Vercel) | https://mini-snippet-vault.onrender.com |
| **Backend** (Render) | https://mini-snippet-vault.vercel.app |