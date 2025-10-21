# Руководство по публикации n8n-nodes-moyklass

Это руководство описывает процесс публикации community node в npm registry.

## Предварительные требования

1. **Аккаунт npm**
   - Зарегистрируйтесь на https://www.npmjs.com/
   - Подтвердите email адрес

2. **npm CLI настроен**
   ```bash
   npm login
   ```

3. **Проект собран и протестирован**
   ```bash
   npm install
   npm run build
   npm run lint
   ```

## Подготовка к публикации

### 1. Проверьте package.json

Убедитесь, что заполнены все необходимые поля:

```json
{
  "name": "n8n-nodes-moyklass",
  "version": "1.0.0",
  "description": "n8n community node для работы с CRM MoyKlass",
  "keywords": [
    "n8n-community-node-package",
    "n8n",
    "moyklass",
    "crm"
  ],
  "license": "MIT",
  "homepage": "https://api.moyklass.com",
  "author": {
    "name": "Ваше имя",
    "email": "your.email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/username/n8n-nodes-moyklass.git"
  }
}
```

### 2. Обновите версию

Используйте semantic versioning:

```bash
# Для патчей (багфиксы): 1.0.0 -> 1.0.1
npm version patch

# Для минорных версий (новые функции): 1.0.0 -> 1.1.0
npm version minor

# Для мажорных версий (breaking changes): 1.0.0 -> 2.0.0
npm version major
```

### 3. Обновите CHANGELOG.md

Добавьте описание изменений в новой версии:

```markdown
## [1.0.1] - 2024-10-22

### Fixed
- Исправлена ошибка в обработке пагинации
- Улучшена валидация API ключа

### Changed
- Обновлены зависимости
```

### 4. Проверьте файлы для публикации

Проверьте, что будет включено в пакет:

```bash
npm pack --dry-run
```

Убедитесь, что:
- ✅ Включены все необходимые файлы из `dist/`
- ✅ Включен `package.json`
- ✅ Включен `README.md`
- ✅ Включен `LICENSE`
- ❌ НЕ включены `.ts` файлы (только `.d.ts`)
- ❌ НЕ включены `node_modules/`
- ❌ НЕ включены конфиги разработки

## Публикация

### Первая публикация

```bash
npm publish
```

При публикации в первый раз npm может попросить подтверждение email.

### Обновление пакета

```bash
# 1. Обновите версию
npm version patch

# 2. Соберите проект
npm run build

# 3. Опубликуйте
npm publish
```

### Публикация бета-версии

Для тестирования перед официальным релизом:

```bash
# Установите бета-версию
npm version 1.1.0-beta.1

# Опубликуйте с тегом beta
npm publish --tag beta
```

Пользователи смогут установить бета-версию:
```bash
npm install n8n-nodes-moyklass@beta
```

## Проверка публикации

### 1. Проверьте на npm

Перейдите на страницу пакета:
```
https://www.npmjs.com/package/n8n-nodes-moyklass
```

### 2. Установите в тестовом n8n

```bash
# В директории n8n
npm install n8n-nodes-moyklass

# Или через UI в Settings → Community Nodes
```

### 3. Протестируйте функциональность

- Создайте тестовый workflow
- Проверьте все основные операции
- Убедитесь, что credentials работают
- Проверьте обработку ошибок

## Git и GitHub

### 1. Создайте репозиторий на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/n8n-nodes-moyklass.git
git push -u origin main
```

### 2. Создайте релиз

На GitHub:
1. Перейдите в **Releases** → **Create a new release**
2. Выберите тег версии (например, `v1.0.0`)
3. Заполните описание релиза
4. Прикрепите скомпилированные файлы (опционально)
5. Нажмите **Publish release**

### 3. Настройте автоматическую публикацию (опционально)

Создайте `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Добавьте `NPM_TOKEN` в Secrets репозитория.

## Продвижение

### 1. Добавьте в n8n Community Nodes

Убедитесь, что ваш пакет:
- Имеет тег `n8n-community-node-package` в keywords
- Соответствует стандартам n8n
- Хорошо документирован

### 2. Поделитесь с сообществом

- Создайте пост на форуме n8n: https://community.n8n.io/
- Поделитесь в социальных сетях
- Добавьте в список awesome-n8n

### 3. Создайте документацию

- Wiki на GitHub
- Видео-туториалы
- Примеры использования

## Поддержка пакета

### Обработка Issues

1. Отвечайте на вопросы пользователей
2. Исправляйте критические баги быстро
3. Планируйте новые функции на основе feedback

### Обновления

Регулярно обновляйте:
- Зависимости (особенно security updates)
- Документацию
- Примеры использования
- Совместимость с новыми версиями n8n

### Версионирование

Следуйте semantic versioning:
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): Новые функции (обратно совместимые)
- **PATCH** (1.0.0 → 1.0.1): Багфиксы

## Снятие с публикации

Если нужно удалить версию:

```bash
# Удалить конкретную версию (только в первые 72 часа)
npm unpublish n8n-nodes-moyklass@1.0.0

# Пометить версию как deprecated
npm deprecate n8n-nodes-moyklass@1.0.0 "This version has critical bugs"
```

⚠️ **Внимание:** Удаление пакетов с npm discouraged. Лучше опубликовать исправленную версию.

## Чеклист перед публикацией

- [ ] Код собирается без ошибок
- [ ] Все тесты проходят
- [ ] Линтер не показывает ошибок
- [ ] Версия обновлена
- [ ] CHANGELOG обновлен
- [ ] README актуален
- [ ] package.json заполнен корректно
- [ ] .npmignore настроен правильно
- [ ] Протестировано в n8n локально
- [ ] Git commits сделаны
- [ ] Git tags созданы

## Полезные команды

```bash
# Проверить какие файлы будут опубликованы
npm pack --dry-run

# Посмотреть информацию о пакете
npm view n8n-nodes-moyklass

# Посмотреть все версии
npm view n8n-nodes-moyklass versions

# Проверить устаревшие зависимости
npm outdated

# Обновить зависимости
npm update

# Проверить security issues
npm audit

# Исправить security issues
npm audit fix
```

## Дополнительные ресурсы

- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/creating-nodes/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

Удачи с публикацией! 🚀

