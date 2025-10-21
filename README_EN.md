# n8n-nodes-moyklass

![MoyKlass Logo](https://api.moyklass.com/logo.png)

Community node for n8n to work with **MoyKlass** CRM.

## Installation

### Install via Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-moyklass`
5. Click **Install**

### Manual Installation

For self-hosted n8n, add the package to environment variable:

```bash
export N8N_CUSTOM_EXTENSIONS="/path/to/n8n-nodes-moyklass"
```

## Configuration

### Getting API Key

1. Log in to MoyKlass CRM
2. Go to **Settings** → **Integrations**
3. Create a new API key
4. Copy the key

### Creating Credentials in n8n

1. In n8n, create a new connection of type **MoyKlass API**
2. Paste your API key
3. Save

## Features

The node supports the following resources:

### 📚 Main Resources

- **User** - manage students and leads
- **Payment** - work with payments
- **Invoice** - manage invoices
- **Manager** - manage employees
- **Lesson** - work with lessons
- **Class** - manage groups/classes
- **Join** - manage student enrollments
- **Task** - work with tasks
- **File** - manage files
- **Subscription** - manage subscription types
- **User Subscription** - manage student subscriptions
- **Comment** - work with comments
- **Lesson Record** - manage attendance records
- **Room** - manage rooms
- **Cashbox** - manage cashboxes
- **Bonus Program** - work with bonus program
- **Family** - manage student families

### 🏢 Company Dictionaries

- **Company** - get dictionaries:
  - Advertising sources
  - Creation sources
  - Status reasons
  - Branches
  - Student attributes
  - Courses
  - Join statuses
  - Client statuses
  - Join tags
  - Payment types
  - Roles
  - User tags

## Operations

Most resources support standard operations:

- **Get All** - get list of all records (with pagination support)
- **Get** - get single record by ID
- **Create** - create new record
- **Update** - update existing record
- **Delete** - delete record

Some resources have special operations:

- **User**: update status, manage tags, update attributes
- **Lesson**: update status, mark student attendance
- **Join**: update enrollment status
- **User Subscription**: update status, freeze subscription

## Usage Examples

### Example 1: Get All Students

```
Resource: User
Operation: Get All
Return All: true
Additional Fields:
  - Include Archive: false
```

### Example 2: Create New Student

```
Resource: User
Operation: Create
JSON Body:
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com"
}
```

### Example 3: Get Payments for Period

```
Resource: Payment
Operation: Get All
Additional Fields:
  - Date From: 2024-01-01
  - Date To: 2024-01-31
  - Limit: 100
```

### Example 4: Create Lesson

```
Resource: Lesson
Operation: Create
JSON Body:
{
  "classId": 123,
  "date": "2024-01-20",
  "beginTime": "10:00",
  "endTime": "11:30",
  "title": "Mathematics"
}
```

### Example 5: Mark Student Attendance

```
Resource: Lesson
Operation: Mark Student
ID: 12345
JSON Body:
{
  "type": "visit",
  "userId": 67890
}
```

## Pagination

For **Get All** operations, pagination is available:

- Set **Return All** to `false` to get only the first page
- Set **Return All** to `true` to automatically fetch all pages
- Use **Limit** in additional fields to control page size (max. 100)
- Use **Offset** for manual pagination

## API Limitations

⚠️ **Important:** MoyKlass API has a rate limit of **no more than 7 requests per second**.

Recommended to use:
- Adding delays between requests in loops
- Using batch processing where possible

## API Documentation

Full MoyKlass API documentation available at: https://api.moyklass.com

## Support

- 📧 Email: bekzat.zhm@gmail.com
- 🌐 Github: @elapen
- 📖 Knowledge Base: https://help.moyklass.com

## License

MIT

## Development

### Requirements

- Node.js >= 16.x
- npm >= 8.x

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

## Versions

### 1.0.0
- First release
- Support for all main MoyKlass API resources
- 139 API endpoints
- Pagination support
- Full CRUD operations support

