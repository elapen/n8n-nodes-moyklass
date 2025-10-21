# 🔥 КРИТИЧНОЕ ИСПРАВЛЕНИЕ АВТОРИЗАЦИИ

## ✅ Проблема найдена и исправлена!

### ❌ Что было не так?

Версии **1.0.0 - 1.1.1** использовали **неправильную** авторизацию:

```typescript
// ❌ НЕПРАВИЛЬНО (старый код)
headers: {
  'x-api-key': '={{$credentials.apiKey}}'
}
```

**Проблема**: MoyKlass API такой метод авторизации **НЕ ПОДДЕРЖИВАЕТ**!  
**Результат**: Все подключения **не работали** ❌

---

## ✅ Что исправлено в v1.2.1?

Теперь используется **правильная** авторизация согласно документации MoyKlass API:

### Шаг 1: Получение токена
```http
POST https://api.moyklass.com/v1/company/auth/getToken
Content-Type: application/json

{
  "apiKey": "ваш_ключ_api"
}
```

### Шаг 2: Получаем access token
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2024-10-28T18:00:00Z",
  "level": "company"
}
```

### Шаг 3: Используем токен в запросах
```http
GET https://api.moyklass.com/v1/company/users
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **Теперь все работает!**

---

## 🔧 Что было сделано?

### 1. Создан TokenHelper
Новый модуль `helpers/TokenHelper.ts`:
- ✅ Автоматически получает токен при первом запросе
- ✅ Кеширует токен на 6 дней (из 7 возможных)
- ✅ Автоматически обновляет истекшие токены

### 2. Обновлены Credentials
Файл `credentials/MoyKlassApi.credentials.ts`:
- ✅ Упрощены (только хранят API key)
- ✅ Тест подключения через `/auth/getToken`
- ✅ Понятные ошибки при неправильном ключе

### 3. Обновлена Node
Файл `nodes/MoyKlass/MoyKlass.node.ts`:
- ✅ Получает токен через `getAccessToken()`
- ✅ Использует `x-access-token` в заголовках
- ✅ Все запросы работают корректно

---

## 📦 Что опубликовано?

### Версия 1.2.1 (текущая)
✅ Опубликована на NPM  
✅ Размер: 78.2 KB  
✅ Правильная авторизация  
✅ Чистая сборка

**Установка:**
```bash
npm install n8n-nodes-moyklass@1.2.1
```

---

## 🚀 Инструкция по обновлению

### 1. Обновите пакет
```bash
# Остановите n8n
n8n stop

# Обновите пакет
npm install n8n-nodes-moyklass@latest

# Запустите n8n
n8n start
```

### 2. Пересоздайте credentials

**Важно!** Старые credentials **не будут работать**. Нужно создать новые:

1. **Удалите** старые credentials MoyKlass API
2. **Создайте** новые credentials:
   - Имя: "MoyKlass API" (или любое)
   - API Key: ваш ключ из CRM (например: `Oul76YVXXQnH3YWWidkDaHyoUBGHCOyOO0oky7y6T1EJBAWnEi`)
   - API Base URL: оставьте `https://api.moyklass.com`
3. **Нажмите "Test"** - должно быть ✅
4. **Сохраните**

### 3. Обновите workflows

Откройте каждый workflow:
1. Откройте ноду MoyKlass
2. Выберите новые credentials
3. Сохраните workflow
4. Протестируйте!

---

## 🎯 Как получить API Key?

1. Откройте CRM MoyKlass
2. Перейдите: **Настройки → API**
3. Нажмите **"Создать ключ"**
4. Скопируйте ключ (выглядит как: `Oul76YVXXQnH3YWWidkDaHyoUBGHCOyOO0oky7y6T1EJBAWnEi`)
5. Вставьте в n8n credentials

---

## ✅ Проверка что все работает

### Test 1: Credentials
1. Откройте Credentials → MoyKlass API
2. Нажмите "Test"
3. Должно быть: ✅ "Credentials test successful"

### Test 2: Simple workflow
1. Создайте новый workflow
2. Добавьте ноду MoyKlass
3. Выберите: Resource = User, Operation = Get All
4. Запустите workflow
5. Должны увидеть список учеников ✅

---

## 📊 Технические детали

### Кеширование токенов

Токены кешируются в памяти:
```typescript
const tokenCache = new Map<string, TokenCache>();

interface TokenCache {
  token: string;      // access token
  expiresAt: number;  // timestamp когда истекает
}
```

- **Время жизни**: 6 дней (из 7 по API)
- **Ключ кеша**: `${apiKey}_${baseUrl}`
- **Обновление**: автоматическое при истечении

### Ограничения API

MoyKlass API имеет лимиты:
- ⏱️ **Максимум 7 запросов в секунду**
- ⏰ **Токен живет 7 дней**
- 🔄 **Рекомендуется** обновлять токен перед каждой сессией

---

## 🐛 Troubleshooting

### Ошибка: "Failed to authenticate"
**Причина**: Неправильный API Key  
**Решение**: Проверьте ключ в CRM → Настройки → API

### Ошибка: "401 Unauthorized"
**Причина**: Используются старые credentials (v1.0.0 - v1.1.1)  
**Решение**: Пересоздайте credentials

### Ошибка: "Too many requests"
**Причина**: Превышен лимит 7 запросов/сек  
**Решение**: Добавьте задержку между запросами

---

## 📝 Структура файлов

```
nodes/MoyKlass/
├── MoyKlass.node.ts          # Главный файл (использует TokenHelper)
├── helpers/
│   └── TokenHelper.ts        # ✨ НОВЫЙ! Управление токенами
├── descriptions/             # Описания ресурсов
├── operations/               # Операции с ресурсами
└── types/                    # TypeScript типы

credentials/
└── MoyKlassApi.credentials.ts # Упрощены (только API key)
```

---

## 🎉 Итог

### До (v1.0.0 - v1.1.1):
❌ Авторизация через `x-api-key`  
❌ Подключения не работали  
❌ Все запросы возвращали 401  

### После (v1.2.1):
✅ Правильная авторизация через токены  
✅ Подключения работают  
✅ Все запросы проходят успешно  

---

## 📚 Полезные ссылки

- 📦 [NPM Package](https://www.npmjs.com/package/n8n-nodes-moyklass)
- 💻 [GitHub Repository](https://github.com/elapen/n8n-nodes-moyklass)
- 📖 [MoyKlass API Docs](https://api.moyklass.com/v1/docs)
- 🔐 [Авторизация в API](https://api.moyklass.com/v1/docs#auth)

---

## 🙏 Спасибо!

Большое спасибо за обнаружение этой критичной проблемы!  
Теперь nода работает корректно и соответствует официальной документации API.

**Используйте версию 1.2.1 и наслаждайтесь работающей интеграцией!** 🚀

