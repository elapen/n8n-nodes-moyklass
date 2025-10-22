# Changelog

All notable changes to this project will be documented in this file.

## [1.7.1] - 2025-10-22

### Fixed
- Исправлен Comments API: теперь использует правильный endpoint `/v1/company/userComments`
- Добавлены нормальные поля для Comments вместо JSON
  - Основные: userId, comment (обязательные)
  - Дополнительные: showToUser, lessonId, classId, managerId
- Все операции протестированы и работают: Get All, Get, Create, Update, Delete

## [1.7.0] - 2025-10-22

### Added
- 🎉 **Крупное UX улучшение**: No-Code интерфейс для популярных ресурсов
- **Manager** (Сотрудники): полноценные поля вместо JSON
  - Основные поля: name, email, phone, filials, roles
  - 20+ дополнительных полей: enabled, isStaff, birthDate, contract, passport, INN, color и др.
  - Удобный выбор ролей и филиалов из списков
- **Class** (Группы): удобные поля для создания/обновления групп
  - Основные: name, filialId, beginDate
  - Дополнительные: status, courseId, maxStudents, payType, price, color, managerIds и др.
- **Lesson** (Уроки): поля для работы с уроками
  - Основные: classId, date
  - Дополнительные: topic, description, teacherId, roomId, duration
- **Join** (Записи в группы): поля для записи учеников
  - Основные: userId, classId
  - Дополнительные: beginDate, comment, statusId
- Добавлен `loadRoles` метод для загрузки ролей сотрудников

### Technical
- Созданы описания и операции для Manager, Class, Lesson, Join
- Все ресурсы интегрированы в главный файл MoyKlass.node.ts
- Сохранена обратная совместимость с существующими workflow

## [1.6.3] - 2025-10-22

### Fixed
- Исправлена передача кастомных атрибутов типа select/multiselect (список)
  - API MoyKlass возвращает варианты значений в поле `variants`
  - AttributeHelper обновлён для поддержки поля `variants`
  - Теперь атрибуты типа "список" корректно преобразуются из текста в valueId
- Подтверждена корректная работа полей filials, clientStateId и comment

## [1.6.2] - Previous release

### Added
- Support for additional resources and operations

## [1.6.0-1.6.1] - Previous releases

### Added
- Multiple resources and operations support
- Enhanced attribute handling
- Better error messages

## [1.5.0] - Previous release

### Added
- Custom attributes support for users
- Payment operations
- Better phone number normalization

## [1.4.0] - Previous release

### Added
- User search functionality
- Enhanced user operations

## [1.3.0] - Previous release

### Added
- Multiple new resources
- Company operations

## [1.2.0] - Previous release

### Added
- Basic CRUD operations
- Authentication improvements

## [1.1.0] - Previous release

### Added
- Initial user and payment support

## [1.0.0] - Initial release

### Added
- Basic MoyKlass API integration
- Authentication support
- User and payment basic operations
