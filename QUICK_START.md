# Быстрый старт с n8n-nodes-moyklass

Это краткое руководство поможет вам быстро начать работать с MoyKlass в n8n.

## 📦 Установка (5 минут)

### Вариант A: Через интерфейс n8n (рекомендуется)

1. Откройте n8n
2. **Settings** → **Community Nodes** → **Install**
3. Введите: `n8n-nodes-moyklass`
4. Нажмите **Install** и дождитесь завершения
5. Перезапустите n8n

### Вариант B: Через командную строку

```bash
cd ~/.n8n
npm install n8n-nodes-moyklass
n8n restart
```

## 🔑 Настройка API ключа (2 минуты)

1. **Получите API ключ в MoyKlass:**
   - Войдите в CRM МойКласс
   - **Настройки** → **Интеграции** → **API**
   - **Создать новый ключ** → Скопируйте

2. **Добавьте в n8n:**
   - В n8n: **Credentials** (иконка ключа) → **New**
   - Выберите **MoyKlass API**
   - Вставьте API ключ
   - **Save** → **Test** (должно быть ✓)

## 🚀 Первый workflow (3 минуты)

### Пример: Получить список учеников

1. Создайте новый workflow
2. Добавьте node **MoyKlass**
3. Настройте:
   - **Credentials:** выберите созданный ранее
   - **Resource:** `User (Ученик)`
   - **Operation:** `Get All`
   - **Return All:** `true`
4. Нажмите **Execute Node**
5. Готово! Вы должны увидеть список учеников

## 📝 Популярные операции

### Создать нового ученика

```
Resource: User (Ученик)
Operation: Create
JSON Body:
{
  "name": "Иван Петров",
  "phone": "+79001234567",
  "email": "ivan@example.com"
}
```

### Получить платежи за месяц

```
Resource: Payment (Платеж)
Operation: Get All
Additional Fields:
  - Date From: 2024-01-01
  - Date To: 2024-01-31
```

### Создать урок

```
Resource: Lesson (Урок)
Operation: Create
JSON Body:
{
  "classId": 123,
  "date": "2024-01-20",
  "beginTime": "10:00",
  "endTime": "11:30",
  "title": "Математика"
}
```

### Записать ученика в группу

```
Resource: Join (Запись в группу)
Operation: Create
JSON Body:
{
  "userId": 456,
  "classId": 123,
  "statusId": 1
}
```

## 💡 Полезные советы

### 1. Пагинация

Для больших списков используйте:
- **Return All:** `true` - получить все записи автоматически
- **Limit:** `100` - контролировать размер страницы

### 2. Фильтрация по датам

Все списочные операции поддерживают фильтры:
```
Additional Fields:
  - Date From: YYYY-MM-DD
  - Date To: YYYY-MM-DD
```

### 3. Использование данных из предыдущих nodes

В JSON Body можно использовать выражения:
```json
{
  "userId": "={{$json.id}}",
  "name": "={{$json.firstName}} {{$json.lastName}}"
}
```

### 4. Обработка ошибок

Включите **Continue On Fail** в настройках node для обработки ошибок.

## 🎯 Готовые сценарии

### Автоматическое создание задач для новых лидов

```
1. Webhook → получить данные лида
2. MoyKlass (User → Create) → создать лида
3. MoyKlass (Task → Create) → создать задачу менеджеру
```

### Ежедневный отчет по платежам

```
1. Schedule (каждый день в 9:00)
2. MoyKlass (Payment → Get All) → вчерашние платежи
3. Aggregate → подсчитать сумму
4. Email → отправить отчет
```

### Синхронизация расписания

```
1. Schedule (каждый час)
2. MoyKlass (Lesson → Get All) → уроки на неделю
3. Google Calendar → создать события
```

## 🔍 Доступные ресурсы

| Ресурс | Операции |
|--------|----------|
| **User** (Ученик) | Get All, Get, Create, Update, Delete, Update Status |
| **Payment** (Платеж) | Get All, Get, Create, Update, Delete |
| **Invoice** (Счет) | Get All, Get, Create, Update, Delete |
| **Lesson** (Урок) | Get All, Get, Create, Update, Delete, Update Status |
| **Class** (Группа) | Get All, Get, Create, Update, Delete |
| **Join** (Запись) | Get All, Get, Create, Update, Delete, Update Status |
| **Task** (Задача) | Get All, Get, Create, Update, Delete |
| **Manager** (Сотрудник) | Get All, Get, Create, Update, Delete |
| **File** (Файл) | Get All, Get, Upload, Delete |
| **Subscription** (Абонемент) | Get All, Get, Create, Update, Delete |
| **Comment** (Комментарий) | Get All, Get, Create, Update, Delete |
| **Room** (Помещение) | Get All, Get, Create, Update, Delete |
| **Cashbox** (Касса) | Get All, Get, Create, Update, Delete |
| **Family** (Семья) | Get All, Get By User, Create, Update, Delete |
| **Company** (Справочники) | Get Filials, Get Courses, Get Statuses и др. |

## ⚠️ Важные ограничения

- **Rate Limit:** Максимум 7 запросов в секунду
- **Pagination Limit:** Максимум 100 записей за один запрос
- **Date Format:** Только YYYY-MM-DD

## 📚 Дальнейшее изучение

1. **Полная документация:** [README.md](./README.md)
2. **Примеры workflows:** [examples/README.md](./examples/README.md)
3. **API документация:** https://api.moyklass.com
4. **n8n документация:** https://docs.n8n.io

## 🆘 Помощь

**Проблемы с установкой?**
- Проверьте [INSTALL.md](./INSTALL.md)

**Не работает операция?**
- Проверьте API ключ
- Посмотрите примеры в [examples/](./examples/)
- Проверьте формат данных в JSON Body

**Нужна поддержка?**
- 📧 Email: support@moyklass.com
- 💬 Telegram: @moyklass_support
- 🌐 База знаний: https://help.moyklass.com

---

**Готово!** Теперь вы можете автоматизировать работу с MoyKlass через n8n 🎉

**Следующий шаг:** Посмотрите [готовые примеры workflows](./examples/README.md) для вдохновения!

