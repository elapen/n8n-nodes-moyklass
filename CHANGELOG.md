# Changelog

All notable changes to this project will be documented in this file.

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
