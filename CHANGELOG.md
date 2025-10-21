# Changelog

All notable changes to this project will be documented in this file.

## [1.6.2] - 2024-10-21

### 🔧 Critical Fix - Field Names for User Create/Update

#### Fixed
- **Client Status field** - Changed from `statusId` to `clientStateId` (API requirement)
- **Filials field** - Changed from `filialId` to `filials` and made it multi-select (API expects array)

#### What Was Wrong

**До v1.6.2:**
```javascript
// Отправляли
{
  "name": "Иван",
  "statusId": 309314,      // ❌ Неправильное название
  "filialId": 67247        // ❌ Неправильное название + не массив
}

// API игнорировал эти поля и использовал значения по умолчанию
```

**После v1.6.2:**
```javascript
// Отправляем
{
  "name": "Иван",
  "clientStateId": 309314,  // ✅ Правильно
  "filials": [67247]        // ✅ Правильно + массив
}

// API принимает значения!
```

#### Impact

До этого исправления:
- Статус клиента НЕ устанавливался при создании (использовался дефолтный)
- Филиал НЕ устанавливался при создании (использовался дефолтный)

#### What Changed

**Field Names:**
- `statusId` → `clientStateId` (для create/update user)
- `filialId` → `filials` (для create/update user)

**Field Type:**
- `filials` теперь `multiOptions` - можно выбрать несколько филиалов

**Note:** Поле `statusId` для операции `changeStatus` осталось без изменений (там это правильное название).

**Upgrade immediately if you need to set status or filial on user creation!** 🔥

## [1.6.1] - 2024-10-21

### 🔧 Critical Fix - Custom Attributes Update

#### Fixed
- **Custom attributes not updating** - Fixed API request format for user attributes
- **Silent failures** - Added debug information to see what's being sent and any errors

#### What Was Wrong

**API Request Format:**
```
До v1.6.1:
POST /v1/company/users/{userId}/attribute/{attrId}
Body: { "attributeId": 123, "valueId": 456 } ❌

После v1.6.1:
POST /v1/company/users/{userId}/attribute/{attrId}
Body: { "valueId": 456 } ✅
```

**Проблема:** 
- attributeId уже в URL, не нужен в теле запроса!
- Ошибки игнорировались - не было видно что не работает

#### Changes

**1. Исправлен формат для select/multiselect:**
```javascript
// select
{ "valueId": 123 }  // вместо { "attributeId": 5, "valueId": 123 }

// multiselect  
{ "valueIds": [1, 2, 3] }  // вместо { "attributeId": 8, "valueIds": [1, 2, 3] }
```

**2. Исправлен формат для остальных типов:**
```javascript
// text, number, phone, email, boolean
{ "value": "значение" }  // вместо { "attributeId": 10, "value": "значение" }
```

**3. Добавлен debug вывод:**
Теперь в ответе будет поле `_attributeDebug` с информацией:
```json
{
  "id": 123,
  "name": "Иван",
  "_attributeDebug": [
    "✓ Attribute 16447 updated (sent: {\"valueId\":123})",
    "⚠ Attribute 16449: value \"Неизвестно\" not found in available options",
    "✗ Attribute 16451: 400 - Invalid request"
  ]
}
```

**Легенда:**
- ✓ = успешно обновлен
- ⚠ = пропущен (значение не найдено)
- ✗ = ошибка API

#### Impact
До этого исправления custom attributes вообще не обновлялись при создании/обновлении ученика!

**Upgrade immediately if you use custom attributes!** 🔥

## [1.6.0] - 2024-10-21

### 🎨 No-Code UX for All Resources

#### Added - User-Friendly Fields for All Actions
Replaced JSON fields with normal input fields for all resource operations!

**Updated Resources:**
- ✅ **Contract** (Договоры) - name, number, date, description
- ✅ **Rate** (Тарифы) - name, price, description, isActive
- ✅ **Task Category** (Категории задач) - name, description, color
- ✅ **Subscription Grouping** (Группировки абонементов) - name, description
- ✅ **Class Attribute** (Атрибуты групп) - name, type, description
- ✅ **Busy Time** (Занятые времена) - beginTime, endTime, managerId, roomId, comment

#### Before vs After

**До v1.6.0 (JSON):**
```json
{
  "resource": "contract",
  "operation": "create",
  "bodyData": {
    "name": "Договор №123",
    "number": "123",
    "date": "2024-10-21"
  }
}
```

**После v1.6.0 (Normal Fields):**
```
Resource: Contract
Operation: Create
Название: Договор №123
Дополнительные поля:
  - Номер: 123
  - Дата: 2024-10-21
```

#### Benefits
- ❌ **Было:** JSON поле - нужно знать структуру API
- ✅ **Стало:** Удобные поля с подсказками
- ❌ **Было:** Легко ошибиться в формате
- ✅ **Стало:** Валидация и type-safety
- ❌ **Было:** Не понятно какие поля обязательные
- ✅ **Стало:** Явно указано что обязательно

#### Remaining JSON Resources
Следующие ресурсы пока используют JSON (будут обновлены в следующих версиях):
- invoice, manager, lesson, class, join, task, file, subscription, userSubscription, comment, cashbox, family, room, lessonRecord

**100% No-Code для основных операций!** 🎉

## [1.5.1] - 2024-10-21

### 🔧 Critical Fixes - API Compatibility

#### Fixed
1. **Name field format** - Removed incorrect name/surname split
   - ❌ **Было:** `fullName` разделялся на `surname` и `name`
   - ✅ **Стало:** Просто `name` как требует API
   - API принимает: `{ "name": "Иванов Петр Александрович" }`

2. **Balance field removed** - Read-only field causing errors
   - ❌ **Было:** Поле `balance` в дополнительных полях
   - ✅ **Стало:** Поле удалено (API возвращает его сам)
   - Balance только для чтения, не отправляется при создании

3. **Attribute value matching improved** - Better API compatibility
   - Поддержка разных форматов: `values`, `selectOptions`, `options`
   - Более надежное сопоставление значений для select/multiselect

#### What Changed

**Name field (simplified):**
```
До v1.5.1:
Input: "Иванов Петр Александрович"
Split: surname="Иванов", name="Петр Александрович"
Send: { "name": "Петр Александрович", "surname": "Иванов" }

После v1.5.1:
Input: "Иванов Петр Александрович"
Send: { "name": "Иванов Петр Александрович" } ✅
```

**Balance field:**
```
До v1.5.1:
{ "name": "...", "balance": 0 }
→ API игнорирует balance или возвращает ошибку

После v1.5.1:
{ "name": "..." }
→ API автоматически устанавливает balance: 0 ✅
```

**Attributes matching:**
```
До v1.5.1:
Искал только в поле "values"

После v1.5.1:
Ищет в "values" ИЛИ "selectOptions" ИЛИ "options" ✅
```

#### Migration Guide

**Если использовали fullName:**
```
До:
fullName: "Арғымбаева Кемелхан"

После:
name: "Арғымбаева Кемелхан"
```

**Если использовали balance:**
```
До:
additionalFields: { balance: 1000 }

После:
Просто удалите - API сам установит баланс
```

**Обновите свои workflow!**

## [1.5.0] - 2024-10-21

### 🎯 Smart Attribute Value Matching

#### Added - Automatic Value Matching for List Attributes
- **Умное сопоставление значений** - Автоматический поиск значений для атрибутов типа select/multiselect
- **Поддержка всех типов атрибутов**:
  - ✅ **select** - Автоматически находит ID по названию
  - ✅ **multiselect** - Поддержка нескольких значений через запятую
  - ✅ **boolean** - Умное преобразование (true, 1, yes, да → true)
  - ✅ **phone** - Автоматическая нормализация телефона
  - ✅ **email** - Автоматическое приведение к lowercase
  - ✅ **number/discount** - Преобразование в числовой тип
  - ✅ **text** - Как есть

#### Как это работает

**До v1.5.0:**
```
❌ Ошибка: атрибут "Язык обучения" = "Русский язык"
API требует: { "attributeId": 5, "valueId": 123 }
Вы отправляете: { "attributeId": 5, "value": "Русский язык" }
```

**После v1.5.0:**
```
✅ Успех: атрибут "Язык обучения" = "Русский язык"
Система автоматически:
1. Загружает список значений атрибута
2. Находит "Русский язык" → ID: 123
3. Отправляет: { "attributeId": 5, "valueId": 123 }
```

#### Примеры использования

**Select (одиночный выбор):**
```
Атрибут: Язык обучения
Значение: Русский язык
→ Система найдет valueId автоматически
```

**Multiselect (множественный выбор):**
```
Атрибут: Интересы
Значение: Математика, Физика, Программирование
→ Система найдет valueId для каждого значения
```

**Boolean:**
```
Значение: true / 1 / yes / да → true
Значение: false / 0 / no / нет → false
```

**Phone:**
```
Значение: 8 707 463 25 26 → 77074632526
```

#### Умный поиск
- Точное совпадение (case-insensitive)
- Частичное совпадение если точного не найдено
- Поиск в обе стороны (value в name и name в value)

**Примеры:**
```
"Русский язык" → найдет "Русский язык" ✅
"Русский" → найдет "Русский язык" ✅
"русский" → найдет "Русский язык" ✅
"РуССкиЙ яЗыК" → найдет "Русский язык" ✅
```

#### Безопасность
- Если значение не найдено в списке - атрибут пропускается
- Нет ошибок при несовпадении значений
- Продолжает обработку остальных атрибутов

**No-code friendly!** Теперь можно просто вводить текст - система сама разберется! 🎉

## [1.4.1] - 2024-10-21

### 🔧 Critical Bugfix - Phone Number Format

#### Fixed
- **Phone validation error** - Fixed phone number format to match MoyKlass API requirements
  - API requires: digits only, NO `+` sign, 10-15 characters
  - Pattern: `^[0-9]{10,15}$`
  - Example: `79001234567` (NOT `+79001234567`)

#### What Changed
**Before (v1.4.0):**
```
Input: 87074632526
Output: +77074632526 ❌
Error: pattern should match "^[0-9]{10,15}$"
```

**After (v1.4.1):**
```
Input: 87074632526
Output: 77074632526 ✅
Success!
```

#### Phone Normalization Logic
```
87074632526      → 77074632526 ✅
8 707 463 25 26  → 77074632526 ✅
+7(707)463-25-26 → 77074632526 ✅
7074632526       → 77074632526 ✅
```

- Removes all non-digit characters
- Replaces leading `8` with `7` (for 11-digit numbers)
- Adds `7` prefix for 10-digit numbers
- Validates length (10-15 digits)
- Returns digits only (NO `+`)

#### Affected Operations
- ✅ User: Create
- ✅ User: Update  
- ✅ User: Find (by phone)

**Upgrade immediately if you're getting phone validation errors!**

## [1.4.0] - 2024-10-21

### 🎉 Dynamic Custom Attributes

#### Added - Dynamic Attributes Loading
- **loadUserAttributes** - Load user custom fields from your CRM
- **loadClassAttributes** - Load class custom fields
- **loadUserTags** - Load user tags
- **Custom Attributes Collection** - Add unlimited custom attributes when creating/updating users
  - Select attribute from dropdown (loaded from your CRM)
  - Enter value for each attribute
  - All attributes updated automatically in one operation

#### How It Works
1. You add custom fields in MoyKlass CRM
2. Fields automatically appear in n8n dropdown
3. Select field, enter value
4. All saved automatically!

#### Use Case
```
Webhook → MoyKlass: Create User
  + Custom Attributes:
    - Language: {{ $json.language }}
    - Course: {{ $json.courseFormat }}
    - Period: {{ $json.coursePeriod }}
    - Closer: {{ $json.closer }}
    ... 10+ more fields!
  = All in ONE operation!
```

#### Before vs After
**Before (v1.3.0):**
- Create User
- Update Attribute #1 (separate operation)
- Update Attribute #2 (separate operation)
- ... 10 operations total

**After (v1.4.0):**
- Create User + 10 attributes = ONE operation!

#### Technical Details
- API: `POST /v1/company/users/{userId}/attribute/{attrId}` for each attribute
- Auto-refresh user data after updating all attributes
- Supports expressions: `{{ $json.field }}`

### Changed
- User create/update operations now support custom attributes collection
- Attributes are updated automatically after main operation

## [1.3.0] - 2024-10-21

### 🎉 Major UX Improvements - Maximum No-Code Experience

#### Added - Dynamic Lists (loadOptionsMethod)
- **Managers** - Select manager from list (instead of entering ID)
- **Courses** - Select course by name
- **Client Statuses** - Select status from list
- **Filials** - Select branch from list
- **Adv Sources** - Select advertising source
- **Create Sources** - Select creation source
- **Payment Types** - Select payment method
- **Cashboxes** - Select cashbox from list

#### Added - Smart User Operations
- **User: Find** - New operation to find users by phone/name/email (not just ID!)
- **Full Name Field** - Single field that auto-splits into surname and name
  - Format: "Фамилия Имя" → `surname: "Фамилия"`, `name: "Имя"`
  - Example: "Арғымбаева Кемелхан"
- **Auto Phone Normalization** - Any format → `+7XXXXXXXXXX`
  - `87074632526` → `+77074632526`
  - `8 707 463 25 26` → `+77074632526`

#### Added - New Module
- `helpers/LoadOptionsHelper.ts` - Dynamic list loading from MoyKlass API

#### Changed - User Resource
- **Breaking (UI only)**: Replaced separate `name` and `surname` fields with single `fullName` field for create operation
- All ID fields replaced with dropdown lists:
  - `managerId` → "Менеджер" (dropdown)
  - `statusId` → "Статус клиента" (dropdown)
  - `filialId` → "Филиал" (dropdown)
  - `createSourceId` → "Источник создания" (dropdown)
  - `advSourceId` → "Источник рекламы" (dropdown)

#### Changed - Payment Resource
- `paymentTypeId` → "Тип платежа" (dropdown)
- `cashboxId` → "Касса" (dropdown)
- `managerId` → "Менеджер" (dropdown)

#### Improved
- 🚀 Better UX: dropdowns instead of text fields with IDs
- 🔍 Better search: by phone/name/email instead of ID only
- 📞 Phone validation: auto-normalization to `+7` format
- ✏️ Name handling: smart split of full name
- 🇷🇺 🇰🇿 Better localization: Russian field names

### Use Cases
- **Webhook Integration**: Parse `clientName: "Surname Name"` → auto-split
- **Phone Search**: Find user by any phone format
- **Easy Setup**: Select manager/course/status from lists!

## [1.2.1] - 2024-10-21

### Fixed
- Removed unnecessary build artifacts from npm package
- Reduced package size from 94.5KB to 78.2KB

## [1.2.0] - 2024-10-21

### 🔥 CRITICAL FIX - Authentication

**BREAKING CHANGE**: Fixed authentication to use proper MoyKlass API flow.

#### What was wrong (v1.0.0 - v1.1.1)?
- Used `x-api-key` header directly
- This method is NOT supported by MoyKlass API
- **All connections were failing!** ❌

#### What's fixed?
- ✅ Proper token-based authentication
- ✅ POST `/v1/company/auth/getToken` to obtain access token
- ✅ Use `x-access-token` header for all requests
- ✅ Token caching (6 days, API allows 7)
- ✅ Automatic token refresh

### Added
- `helpers/TokenHelper.ts` - Token management module
- Token caching mechanism
- Automatic token renewal
- Proper credentials test using `/auth/getToken` endpoint

### Changed
- **CRITICAL**: Authentication method changed from `x-api-key` to `x-access-token`
- Credentials simplified (only store API key)
- All API requests now use access tokens
- Updated credentials placeholder with example key format

### Migration Required
1. Delete old credentials
2. Create new credentials with the same API key
3. Test connection (should pass ✅)
4. Update workflows to use new credentials

**Why?** Old credentials used wrong auth method and will not work.

## [1.1.1] - 2024-10-21

### Fixed
- Removed backup files from npm package
- Reduced package size from 155KB to 76KB (-51%)

## [1.1.0] - 2024-10-21

### Added
- **No-Code Interface for User Resource**
  - Separate fields for Name, Surname, Patronymic, Email, Phone, Birthdate
  - Collection of additional fields: Balance, Discount, Comment, Manager ID, etc.
  - User-friendly fields for status, tags, and attributes updates

- **No-Code Interface for Payment Resource**
  - Separate fields for User ID, Sum, Date
  - Additional fields: Comment, Payment Type ID, Cashbox ID, Manager ID, Invoice ID

- **New Resources from OpenAPI**
  - Contract (Договоры) - `/v1/company/contracts`
  - Rate (Тарифы) - `/v1/company/rates`
  - Task Category (Категории задач) - `/v1/company/taskCategories`
  - Subscription Grouping (Группировки абонементов) - `/v1/company/subscriptionGroupings`
  - Class Attribute (Атрибуты групп) - `/v1/company/classAttributes`
  - Busy Time (Занятые времена) - `/v1/company/busyTimes`

### Changed
- **Modular Architecture**: Split main file (1695 lines) into modules
  - `descriptions/` - Resource and operation descriptions (< 400 lines each)
  - `operations/` - Operation handlers (< 400 lines each)
  - `types/` - TypeScript types and interfaces
  - Main file reduced to 403 lines (-76%)

- **Improved Credentials**
  - Added custom API Base URL field
  - Better description with instructions on how to get API Key
  - Added placeholder for key format
  - Changed test endpoint to more reliable `/v1/company/filials`
  - Added link to API documentation

### Improved
- Code maintainability and readability
- Package structure and organization
- Documentation in field descriptions
- Connection testing

## [1.0.0] - 2024-10-20

### Added
- Initial release
- Support for 18 resource types
- Basic CRUD operations
- Integration with MoyKlass CRM API
- Pagination support
- Authentication via API key

### Resources
- User (Ученик)
- Payment (Платеж)
- Invoice (Счет)
- Manager (Сотрудник)
- Lesson (Урок)
- Class (Группа)
- Join (Запись в группу)
- Task (Задача)
- File (Файл)
- Subscription (Вид абонемента)
- User Subscription (Абонемент ученика)
- Comment (Комментарий)
- Cashbox (Касса)
  - Bonus Program (Бонусная программа)
- Family (Семья)
- Company (Компания)
- Room (Помещение)
- Lesson Record (Отметка о посещении)
