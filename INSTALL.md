# Инструкция по установке n8n-nodes-moyklass

## Вариант 1: Установка через npm (рекомендуется)

### Предварительные требования
- n8n установлен и запущен
- Доступ к настройкам n8n

### Шаги установки

1. **Включите Community Nodes в n8n**
   
   Если вы используете самостоятельный хостинг n8n, убедитесь, что Community Nodes включены:
   
   ```bash
   export N8N_COMMUNITY_NODE_ALLOW_LIST=*
   ```

2. **Установите пакет через интерфейс n8n**
   
   - Откройте n8n в браузере
   - Перейдите в **Settings** → **Community Nodes**
   - Нажмите кнопку **Install**
   - Введите имя пакета: `n8n-nodes-moyklass`
   - Нажмите **Install**
   - Дождитесь завершения установки
   - Перезапустите n8n

3. **Проверьте установку**
   
   - Создайте новый workflow
   - Нажмите на "+" для добавления node
   - Найдите "MoyKlass" в списке доступных nodes
   - Если node появился - установка прошла успешно!

## Вариант 2: Ручная установка из исходников

### Предварительные требования
- Node.js версии 16.x или выше
- npm версии 8.x или выше
- Git

### Шаги установки

1. **Клонируйте репозиторий**
   
   ```bash
   git clone <repository-url>
   cd n8n-nodes-moyklass
   ```

2. **Установите зависимости**
   
   ```bash
   npm install
   ```

3. **Соберите проект**
   
   ```bash
   npm run build
   ```

4. **Создайте символическую ссылку**
   
   ```bash
   npm link
   ```

5. **Свяжите с n8n**
   
   Перейдите в директорию вашей установки n8n и выполните:
   
   ```bash
   cd ~/.n8n
   npm link n8n-nodes-moyklass
   ```

6. **Перезапустите n8n**
   
   ```bash
   n8n restart
   ```

## Вариант 3: Установка для Docker

Если вы используете n8n в Docker, добавьте следующие переменные окружения в ваш docker-compose.yml или команду запуска:

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_COMMUNITY_NODE_ALLOW_LIST=*
      - N8N_CUSTOM_EXTENSIONS=/data/custom
    volumes:
      - ~/.n8n:/home/node/.n8n
      - /path/to/n8n-nodes-moyklass:/data/custom/n8n-nodes-moyklass
```

Затем установите node внутри контейнера:

```bash
docker exec -it <container-name> sh
cd /data/custom/n8n-nodes-moyklass
npm install
npm run build
```

## Настройка после установки

1. **Получите API ключ MoyKlass**
   
   - Войдите в вашу CRM МойКласс
   - Перейдите в **Настройки** → **Интеграции**
   - Нажмите **Создать новый API ключ**
   - Скопируйте полученный ключ

2. **Создайте Credentials в n8n**
   
   - В n8n откройте **Credentials** (иконка ключа в левом меню)
   - Нажмите **+ New**
   - Найдите и выберите **MoyKlass API**
   - Вставьте ваш API ключ в поле **API Key**
   - Нажмите **Save**
   - Проверьте подключение кнопкой **Test**

3. **Создайте первый workflow**
   
   - Создайте новый workflow
   - Добавьте node **MoyKlass**
   - Выберите созданный ранее credential
   - Настройте нужную операцию
   - Запустите workflow

## Проверка установки

Для проверки правильности установки:

1. Создайте простой workflow с MoyKlass node
2. Выберите операцию **Company** → **Get Managers**
3. Запустите workflow
4. Если получены данные - установка прошла успешно!

## Устранение проблем

### Node не отображается в списке

- Убедитесь, что Community Nodes разрешены (`N8N_COMMUNITY_NODE_ALLOW_LIST=*`)
- Перезапустите n8n
- Проверьте логи n8n на наличие ошибок

### Ошибка при подключении к API

- Проверьте правильность API ключа
- Убедитесь, что у вас есть доступ к интернету
- Проверьте, что API ключ активен в МойКласс

### Ошибки при сборке

- Убедитесь, что у вас установлена правильная версия Node.js (>= 16.x)
- Очистите кэш: `npm cache clean --force`
- Удалите node_modules и установите заново: `rm -rf node_modules && npm install`

## Обновление

Для обновления node до новой версии:

### Через интерфейс n8n:
1. Перейдите в **Settings** → **Community Nodes**
2. Найдите n8n-nodes-moyklass
3. Нажмите **Update**

### Вручную:
```bash
npm update n8n-nodes-moyklass
```

## Удаление

Для удаления node:

### Через интерфейс n8n:
1. Перейдите в **Settings** → **Community Nodes**
2. Найдите n8n-nodes-moyklass
3. Нажмите **Uninstall**

### Вручную:
```bash
npm uninstall n8n-nodes-moyklass
```

## Поддержка

Если у вас возникли проблемы с установкой, пожалуйста:
- Проверьте документацию: https://docs.n8n.io/integrations/community-nodes/
- Создайте issue в репозитории проекта
- Напишите в поддержку МойКласс: support@moyklass.com

