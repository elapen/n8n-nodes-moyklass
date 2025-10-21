# Release Notes v1.1.0

## 🎉 Основные изменения

### ✨ Улучшения интерфейса (No-Code)

**Проблема:** Пользователям приходилось работать с JSON для создания и редактирования записей, что неудобно для no-code платформы.

**Решение:** Добавлены удобные поля для всех операций создания/редактирования:

#### User (Ученики)
- ✅ Отдельные поля: Имя, Фамилия, Отчество, Email, Телефон, Дата рождения
- ✅ Коллекция дополнительных полей: Balance, Discount, Comment, Manager ID и т.д.
- ✅ Удобные поля для обновления статуса, тегов и атрибутов

#### Payment (Платежи)
- ✅ Отдельные поля: User ID, Сумма, Дата
- ✅ Дополнительные поля: Comment, Payment Type ID, Cashbox ID, Manager ID, Invoice ID

#### Остальные ресурсы
- ✅ Для сложных ресурсов сохранен JSON интерфейс, но с улучшенной документацией

### 🏗️ Архитектурные улучшения

**Проблема:** Главный файл был 1695 строк, что затрудняло поддержку и расширение.

**Решение:** Разбит на модульную структуру:

```
nodes/MoyKlass/
├── MoyKlass.node.ts (390 строк - главный файл)
├── descriptions/
│   ├── ResourceList.ts
│   ├── CommonDescriptions.ts
│   ├── UserDescription.ts
│   ├── PaymentDescription.ts
│   └── NewResourcesDescription.ts
├── operations/
│   ├── UserOperations.ts
│   ├── PaymentOperations.ts
│   └── GenericOperations.ts
└── types/
    └── index.ts
```

**Преимущества:**
- 📦 Каждый модуль < 400 строк
- 🔧 Легко расширять и поддерживать
- 🧪 Проще тестировать
- 📖 Лучше читаемость кода

### 🆕 Новые ресурсы из OpenAPI

Добавлены недостающие ресурсы согласно официальной документации API:

1. **Contract (Договоры)** - `/v1/company/contracts`
2. **Rate (Тарифы)** - `/v1/company/rates`
3. **Task Category (Категории задач)** - `/v1/company/taskCategories`
4. **Subscription Grouping (Группировки абонементов)** - `/v1/company/subscriptionGroupings`
5. **Class Attribute (Атрибуты групп)** - `/v1/company/classAttributes`
6. **Busy Time (Занятые времена)** - `/v1/company/busyTimes`

Все новые ресурсы поддерживают стандартные CRUD операции:
- Get All
- Get (by ID)
- Create
- Update
- Delete

### 🔐 Улучшения Credentials

**Изменения:**
- ✅ Добавлено поле для custom API Base URL
- ✅ Улучшено описание с инструкцией где получить API Key
- ✅ Добавлен placeholder для формата ключа
- ✅ Изменен тестовый endpoint на более надежный (`/v1/company/filials`)
- ✅ Добавлена ссылка на документацию API

**Инструкция подключения:**
1. Откройте настройки CRM MoyKlass
2. Перейдите в раздел "Интеграции" → "API-ключ"
3. Скопируйте ключ и вставьте в поле "API Key"
4. Оставьте Base URL по умолчанию (если не используете свой домен)

### 📝 Полный список изменений

#### Добавлено
- No-code поля для User (create/update)
- No-code поля для Payment (create/update)
- 6 новых ресурсов из OpenAPI спецификации
- Поддержка custom API Base URL
- Модульная архитектура кода

#### Улучшено
- Credentials с лучшим UX
- Документация в описаниях полей
- Структура кода (1695 строк → модули < 400 строк)
- Тестирование подключения

#### Исправлено
- Проблемы с подключением через credentials
- Отсутствующие endpoints из OpenAPI

## 🚀 Миграция с v1.0.0

Существующие workflows продолжат работать без изменений. Новые возможности доступны сразу после обновления.

### Breaking Changes
❌ Нет breaking changes

### Рекомендации
✅ Обновите существующие workflows на использование новых no-code полей для User и Payment
✅ Проверьте credentials и при необходимости пересоздайте подключение

## 📊 Статистика

- Строк кода в главном файле: 1695 → 390 (-77%)
- Новых ресурсов: +6
- Новых no-code полей: +15 для User, +5 для Payment
- Новых модулей: 9

## 🙏 Благодарности

Спасибо всем пользователям за обратную связь! Ваши предложения помогли сделать эту ноду лучше.

## 📖 Документация

- [Документация MoyKlass API](https://api.moyklass.com/v1/docs)
- [GitHub Repository](https://github.com/elapen/n8n-nodes-moyklass)
- [NPM Package](https://www.npmjs.com/package/n8n-nodes-moyklass)

## 🐛 Сообщить о проблеме

Нашли баг или есть предложение? [Создайте issue на GitHub](https://github.com/elapen/n8n-nodes-moyklass/issues)

