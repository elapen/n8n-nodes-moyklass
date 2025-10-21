import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';

export class MoyKlass implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MoyKlass',
		name: 'moyKlass',
		icon: 'file:moyklass.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Работа с CRM MoyKlass',
		defaults: {
			name: 'MoyKlass',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'moyKlassApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.moyklass.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Ресурс',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User (Ученик)',
						value: 'user',
					},
					{
						name: 'Payment (Платеж)',
						value: 'payment',
					},
					{
						name: 'Invoice (Счет)',
						value: 'invoice',
					},
					{
						name: 'Manager (Сотрудник)',
						value: 'manager',
					},
					{
						name: 'Lesson (Урок)',
						value: 'lesson',
					},
					{
						name: 'Class (Группа)',
						value: 'class',
					},
					{
						name: 'Join (Запись в группу)',
						value: 'join',
					},
					{
						name: 'Task (Задача)',
						value: 'task',
					},
					{
						name: 'File (Файл)',
						value: 'file',
					},
					{
						name: 'Subscription (Вид абонемента)',
						value: 'subscription',
					},
					{
						name: 'User Subscription (Абонемент ученика)',
						value: 'userSubscription',
					},
					{
						name: 'Comment (Комментарий)',
						value: 'comment',
					},
					{
						name: 'Cashbox (Касса)',
						value: 'cashbox',
					},
					{
						name: 'Bonus Program (Бонусная программа)',
						value: 'bonusProgram',
					},
					{
						name: 'Family (Семья)',
						value: 'family',
					},
					{
						name: 'Company (Компания)',
						value: 'company',
					},
					{
						name: 'Room (Помещение)',
						value: 'room',
					},
					{
						name: 'Lesson Record (Отметка о посещении)',
						value: 'lessonRecord',
					},
				],
				default: 'user',
			},

			// User Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить всех учеников',
						action: 'Получить всех учеников',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить ученика по ID',
						action: 'Получить ученика',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать ученика',
						action: 'Создать ученика',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить данные ученика',
						action: 'Обновить ученика',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить ученика',
						action: 'Удалить ученика',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Обновить статус ученика',
						action: 'Обновить статус ученика',
					},
					{
						name: 'Get Tags',
						value: 'getTags',
						description: 'Получить теги ученика',
						action: 'Получить теги ученика',
					},
					{
						name: 'Update Tags',
						value: 'updateTags',
						description: 'Обновить теги ученика',
						action: 'Обновить теги ученика',
					},
					{
						name: 'Update Attribute',
						value: 'updateAttribute',
						description: 'Обновить атрибут ученика',
						action: 'Обновить атрибут ученика',
					},
				],
				default: 'getAll',
			},

			// Payment Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['payment'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все платежи',
						action: 'Получить все платежи',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить платеж по ID',
						action: 'Получить платеж',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать платеж',
						action: 'Создать платеж',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить платеж',
						action: 'Обновить платеж',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить платеж',
						action: 'Удалить платеж',
					},
				],
				default: 'getAll',
			},

			// Invoice Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все счета',
						action: 'Получить все счета',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить счет по ID',
						action: 'Получить счет',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать счет',
						action: 'Создать счет',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить счет',
						action: 'Обновить счет',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить счет',
						action: 'Удалить счет',
					},
				],
				default: 'getAll',
			},

			// Manager Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['manager'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить всех сотрудников',
						action: 'Получить всех сотрудников',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить сотрудника по ID',
						action: 'Получить сотрудника',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать сотрудника',
						action: 'Создать сотрудника',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить сотрудника',
						action: 'Обновить сотрудника',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить сотрудника',
						action: 'Удалить сотрудника',
					},
				],
				default: 'getAll',
			},

			// Lesson Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['lesson'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все уроки',
						action: 'Получить все уроки',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить урок по ID',
						action: 'Получить урок',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать урок',
						action: 'Создать урок',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить урок',
						action: 'Обновить урок',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить урок',
						action: 'Удалить урок',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Обновить статус урока',
						action: 'Обновить статус урока',
					},
					{
						name: 'Mark Student',
						value: 'markStudent',
						description: 'Отметить посещение/отработку ученика',
						action: 'Отметить ученика',
					},
				],
				default: 'getAll',
			},

			// Class Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['class'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все группы',
						action: 'Получить все группы',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить группу по ID',
						action: 'Получить группу',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать группу',
						action: 'Создать группу',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить группу',
						action: 'Обновить группу',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить группу',
						action: 'Удалить группу',
					},
				],
				default: 'getAll',
			},

			// Join Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['join'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все записи в группы',
						action: 'Получить все записи',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить запись по ID',
						action: 'Получить запись',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать запись в группу',
						action: 'Создать запись',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить запись',
						action: 'Обновить запись',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить запись',
						action: 'Удалить запись',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Обновить статус записи',
						action: 'Обновить статус записи',
					},
				],
				default: 'getAll',
			},

			// Task Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['task'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все задачи',
						action: 'Получить все задачи',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить задачу по ID',
						action: 'Получить задачу',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать задачу',
						action: 'Создать задачу',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить задачу',
						action: 'Обновить задачу',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить задачу',
						action: 'Удалить задачу',
					},
				],
				default: 'getAll',
			},

			// File Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['file'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все файлы',
						action: 'Получить все файлы',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить файл по ID',
						action: 'Получить файл',
					},
					{
						name: 'Upload',
						value: 'upload',
						description: 'Загрузить файл',
						action: 'Загрузить файл',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить файл',
						action: 'Удалить файл',
					},
				],
				default: 'getAll',
			},

			// Subscription Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['subscription'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все виды абонементов',
						action: 'Получить все абонементы',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить абонемент по ID',
						action: 'Получить абонемент',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать абонемент',
						action: 'Создать абонемент',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить абонемент',
						action: 'Обновить абонемент',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить абонемент',
						action: 'Удалить абонемент',
					},
				],
				default: 'getAll',
			},

			// User Subscription Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['userSubscription'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все абонементы учеников',
						action: 'Получить все абонементы учеников',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить абонемент ученика по ID',
						action: 'Получить абонемент ученика',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать абонемент ученика',
						action: 'Создать абонемент ученика',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить абонемент ученика',
						action: 'Обновить абонемент ученика',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить абонемент ученика',
						action: 'Удалить абонемент ученика',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Обновить статус абонемента',
						action: 'Обновить статус абонемента',
					},
					{
						name: 'Freeze',
						value: 'freeze',
						description: 'Заморозить/разморозить абонемент',
						action: 'Заморозить абонемент',
					},
				],
				default: 'getAll',
			},

			// Comment Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['comment'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все комментарии',
						action: 'Получить все комментарии',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить комментарий по ID',
						action: 'Получить комментарий',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать комментарий',
						action: 'Создать комментарий',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить комментарий',
						action: 'Обновить комментарий',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить комментарий',
						action: 'Удалить комментарий',
					},
				],
				default: 'getAll',
			},

			// Cashbox Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['cashbox'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все кассы',
						action: 'Получить все кассы',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить кассу по ID',
						action: 'Получить кассу',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать кассу',
						action: 'Создать кассу',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить кассу',
						action: 'Обновить кассу',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить кассу',
						action: 'Удалить кассу',
					},
				],
				default: 'getAll',
			},

			// Bonus Program Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['bonusProgram'],
					},
				},
				options: [
					{
						name: 'Get Levels',
						value: 'getLevels',
						description: 'Получить уровни бонусной программы',
						action: 'Получить уровни',
					},
					{
						name: 'Get Payments',
						value: 'getPayments',
						description: 'Получить бонусные платежи',
						action: 'Получить бонусные платежи',
					},
				],
				default: 'getLevels',
			},

			// Family Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['family'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все семьи',
						action: 'Получить все семьи',
					},
					{
						name: 'Get By User',
						value: 'getByUser',
						description: 'Получить семью по ID ученика',
						action: 'Получить семью по ученику',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать семью',
						action: 'Создать семью',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить семью',
						action: 'Обновить семью',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить семью',
						action: 'Удалить семью',
					},
				],
				default: 'getAll',
			},

			// Company Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['company'],
					},
				},
				options: [
					{
						name: 'Get Adv Sources',
						value: 'getAdvSources',
						description: 'Получить источники рекламы',
						action: 'Получить источники рекламы',
					},
					{
						name: 'Get Create Sources',
						value: 'getCreateSources',
						description: 'Получить источники создания',
						action: 'Получить источники создания',
					},
					{
						name: 'Get Status Reasons',
						value: 'getStatusReasons',
						description: 'Получить причины статусов',
						action: 'Получить причины статусов',
					},
					{
						name: 'Get Filials',
						value: 'getFilials',
						description: 'Получить филиалы',
						action: 'Получить филиалы',
					},
					{
						name: 'Get User Attributes',
						value: 'getUserAttributes',
						description: 'Получить атрибуты учеников',
						action: 'Получить атрибуты',
					},
					{
						name: 'Get Courses',
						value: 'getCourses',
						description: 'Получить курсы',
						action: 'Получить курсы',
					},
					{
						name: 'Get Join Statuses',
						value: 'getJoinStatuses',
						description: 'Получить статусы записей',
						action: 'Получить статусы записей',
					},
					{
						name: 'Get Client Statuses',
						value: 'getClientStatuses',
						description: 'Получить статусы клиентов',
						action: 'Получить статусы клиентов',
					},
					{
						name: 'Get Join Tags',
						value: 'getJoinTags',
						description: 'Получить теги записей',
						action: 'Получить теги записей',
					},
					{
						name: 'Get Payment Types',
						value: 'getPaymentTypes',
						description: 'Получить типы платежей',
						action: 'Получить типы платежей',
					},
					{
						name: 'Get Roles',
						value: 'getRoles',
						description: 'Получить роли',
						action: 'Получить роли',
					},
					{
						name: 'Get User Tags',
						value: 'getUserTags',
						description: 'Получить теги учеников',
						action: 'Получить теги учеников',
					},
				],
				default: 'getAdvSources',
			},

			// Room Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['room'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все помещения',
						action: 'Получить все помещения',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить помещение по ID',
						action: 'Получить помещение',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать помещение',
						action: 'Создать помещение',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить помещение',
						action: 'Обновить помещение',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить помещение',
						action: 'Удалить помещение',
					},
				],
				default: 'getAll',
			},

			// Lesson Record Operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['lessonRecord'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Получить все отметки о посещении',
						action: 'Получить все отметки',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Получить отметку по ID',
						action: 'Получить отметку',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Создать отметку',
						action: 'Создать отметку',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Обновить отметку',
						action: 'Обновить отметку',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Удалить отметку',
						action: 'Удалить отметку',
					},
				],
				default: 'getAll',
			},

			// ID field for operations that need it
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete', 'updateStatus', 'getTags', 'updateTags', 'updateAttribute', 'freeze', 'markStudent'],
					},
				},
				description: 'ID записи',
			},

			// User ID for specific operations
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['family'],
						operation: ['getByUser'],
					},
				},
				description: 'ID ученика',
			},

			// Additional fields for various operations
			{
				displayName: 'Дополнительные поля',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Добавить поле',
				default: {},
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Смещение для пагинации',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 100,
						description: 'Количество записей (макс. 100)',
					},
					{
						displayName: 'Include Archive',
						name: 'includeArchive',
						type: 'boolean',
						default: false,
						description: 'Включить архивные записи',
					},
					{
						displayName: 'Date From',
						name: 'dateFrom',
						type: 'string',
						default: '',
						description: 'Дата начала в формате YYYY-MM-DD',
					},
					{
						displayName: 'Date To',
						name: 'dateTo',
						type: 'string',
						default: '',
						description: 'Дата окончания в формате YYYY-MM-DD',
					},
				],
			},

			// Body for create/update operations
			{
				displayName: 'JSON Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						operation: ['create', 'update', 'updateStatus', 'updateTags', 'updateAttribute', 'freeze', 'markStudent'],
					},
				},
				description: 'Тело запроса в формате JSON',
			},

			// Return All option
			{
				displayName: 'Вернуть все результаты',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Вернуть все результаты или только первую страницу',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				// Build endpoint based on resource and operation
				let endpoint = '';
				let method: IHttpRequestMethods = 'GET';
				let body: IDataObject = {};
				let qs: IDataObject = {};

				// User operations
				if (resource === 'user') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/users';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const userId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/users/${userId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/users';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const userId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/users/${userId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const userId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/users/${userId}`;
						method = 'DELETE';
					} else if (operation === 'updateStatus') {
						const userId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/users/${userId}/status`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'getTags') {
						const userId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/users/${userId}/tags`;
					} else if (operation === 'updateTags') {
						const userId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/users/${userId}/tags`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'updateAttribute') {
						const userId = this.getNodeParameter('id', i) as string;
						const bodyData = JSON.parse(this.getNodeParameter('body', i) as string);
						const attrId = (bodyData as IDataObject).attrId as string;
						endpoint = `/v1/company/users/${userId}/attribute/${attrId}`;
						method = 'POST';
						body = bodyData;
					}
				}

				// Payment operations
				else if (resource === 'payment') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/payments';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const paymentId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/payments/${paymentId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/payments';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const paymentId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/payments/${paymentId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const paymentId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/payments/${paymentId}`;
						method = 'DELETE';
					}
				}

				// Invoice operations
				else if (resource === 'invoice') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/invoices';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const invoiceId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/invoices/${invoiceId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/invoices';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const invoiceId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/invoices/${invoiceId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const invoiceId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/invoices/${invoiceId}`;
						method = 'DELETE';
					}
				}

				// Manager operations
				else if (resource === 'manager') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/managers';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const managerId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/managers/${managerId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/managers';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const managerId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/managers/${managerId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const managerId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/managers/${managerId}`;
						method = 'DELETE';
					}
				}

				// Lesson operations
				else if (resource === 'lesson') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/lessons';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const lessonId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessons/${lessonId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/lessons';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const lessonId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessons/${lessonId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const lessonId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessons/${lessonId}`;
						method = 'DELETE';
					} else if (operation === 'updateStatus') {
						const lessonId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessons/${lessonId}/status`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'markStudent') {
						const lessonId = this.getNodeParameter('id', i) as string;
						const bodyData = JSON.parse(this.getNodeParameter('body', i) as string);
						const markType = (bodyData as IDataObject).type as string;
						const userId = (bodyData as IDataObject).userId as string;
						endpoint = `/v1/company/lessons/${lessonId}/mark/${markType}/${userId}`;
						method = 'POST';
						body = bodyData;
					}
				}

				// Class operations
				else if (resource === 'class') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/classes';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const classId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/classes/${classId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/classes';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const classId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/classes/${classId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const classId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/classes/${classId}`;
						method = 'DELETE';
					}
				}

				// Join operations
				else if (resource === 'join') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/joins';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const joinId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/joins/${joinId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/joins';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const joinId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/joins/${joinId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const joinId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/joins/${joinId}`;
						method = 'DELETE';
					} else if (operation === 'updateStatus') {
						const joinId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/joins/${joinId}/status`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					}
				}

				// Task operations
				else if (resource === 'task') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/tasks';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const taskId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/tasks/${taskId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/tasks';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const taskId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/tasks/${taskId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const taskId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/tasks/${taskId}`;
						method = 'DELETE';
					}
				}

				// File operations
				else if (resource === 'file') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/files';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const fileId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/files/${fileId}`;
					} else if (operation === 'upload') {
						endpoint = '/v1/company/files';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const fileId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/files/${fileId}`;
						method = 'DELETE';
					}
				}

				// Subscription operations
				else if (resource === 'subscription') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/subscriptions';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const subscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/subscriptions/${subscriptionId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/subscriptions';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const subscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/subscriptions/${subscriptionId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const subscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/subscriptions/${subscriptionId}`;
						method = 'DELETE';
					}
				}

				// User Subscription operations
				else if (resource === 'userSubscription') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/userSubscriptions';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const userSubscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userSubscriptions/${userSubscriptionId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/userSubscriptions';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const userSubscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userSubscriptions/${userSubscriptionId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const userSubscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userSubscriptions/${userSubscriptionId}`;
						method = 'DELETE';
					} else if (operation === 'updateStatus') {
						const userSubscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userSubscriptions/${userSubscriptionId}/status`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'freeze') {
						const userSubscriptionId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userSubscriptions/${userSubscriptionId}/freeze`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					}
				}

				// Comment operations
				else if (resource === 'comment') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/userComments';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const commentId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userComments/${commentId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/userComments';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const commentId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userComments/${commentId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const commentId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/userComments/${commentId}`;
						method = 'DELETE';
					}
				}

				// Cashbox operations
				else if (resource === 'cashbox') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/cashboxes';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const cashboxId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/cashboxes/${cashboxId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/cashboxes';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const cashboxId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/cashboxes/${cashboxId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const cashboxId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/cashboxes/${cashboxId}`;
						method = 'DELETE';
					}
				}

				// Bonus Program operations
				else if (resource === 'bonusProgram') {
					if (operation === 'getLevels') {
						endpoint = '/v1/company/bonusProgram/levels';
					} else if (operation === 'getPayments') {
						endpoint = '/v1/company/bonusProgram/payments';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					}
				}

				// Family operations
				else if (resource === 'family') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/families';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'getByUser') {
						const userId = this.getNodeParameter('userId', i) as string;
						endpoint = `/v1/company/families/member/${userId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/families';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const familyId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/families/${familyId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const familyId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/families/${familyId}`;
						method = 'DELETE';
					}
				}

				// Company operations (dictionaries)
				else if (resource === 'company') {
					if (operation === 'getAdvSources') {
						endpoint = '/v1/company/advSources';
					} else if (operation === 'getCreateSources') {
						endpoint = '/v1/company/createSources';
					} else if (operation === 'getStatusReasons') {
						endpoint = '/v1/company/statusReasons';
					} else if (operation === 'getFilials') {
						endpoint = '/v1/company/filials';
					} else if (operation === 'getUserAttributes') {
						endpoint = '/v1/company/userAttributes';
					} else if (operation === 'getCourses') {
						endpoint = '/v1/company/courses';
					} else if (operation === 'getJoinStatuses') {
						endpoint = '/v1/company/joinStatuses';
					} else if (operation === 'getClientStatuses') {
						endpoint = '/v1/company/clientStatuses';
					} else if (operation === 'getJoinTags') {
						endpoint = '/v1/company/joinTags';
					} else if (operation === 'getPaymentTypes') {
						endpoint = '/v1/company/paymentTypes';
					} else if (operation === 'getRoles') {
						endpoint = '/v1/company/roles';
					} else if (operation === 'getUserTags') {
						endpoint = '/v1/company/userTags';
					}
				}

				// Room operations
				else if (resource === 'room') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/rooms';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const roomId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/rooms/${roomId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/rooms';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const roomId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/rooms/${roomId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const roomId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/rooms/${roomId}`;
						method = 'DELETE';
					}
				}

				// Lesson Record operations
				else if (resource === 'lessonRecord') {
					if (operation === 'getAll') {
						endpoint = '/v1/company/lessonRecords';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						qs = { ...additionalFields };
					} else if (operation === 'get') {
						const recordId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessonRecords/${recordId}`;
					} else if (operation === 'create') {
						endpoint = '/v1/company/lessonRecords';
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'update') {
						const recordId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessonRecords/${recordId}`;
						method = 'POST';
						body = JSON.parse(this.getNodeParameter('body', i) as string);
					} else if (operation === 'delete') {
						const recordId = this.getNodeParameter('id', i) as string;
						endpoint = `/v1/company/lessonRecords/${recordId}`;
						method = 'DELETE';
					}
				}

				// Make the request
				responseData = await this.helpers.requestWithAuthentication.call(
					this,
					'moyKlassApi',
					{
						method,
						url: endpoint,
						body,
						qs,
						json: true,
					},
				);

				// Handle pagination for getAll operations
				if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
					
					if (returnAll && Array.isArray(responseData)) {
						let hasMore = responseData.length === (qs.limit as number || 100);
						let offset = (qs.limit as number || 100);
						
						while (hasMore) {
							const additionalData = await this.helpers.requestWithAuthentication.call(
								this,
								'moyKlassApi',
								{
									method: 'GET',
									url: endpoint,
									qs: { ...qs, offset },
									json: true,
								},
							);
							
							if (Array.isArray(additionalData) && additionalData.length > 0) {
								responseData.push(...additionalData);
								offset += additionalData.length;
								hasMore = additionalData.length === (qs.limit as number || 100);
							} else {
								hasMore = false;
							}
						}
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData as IDataObject);
				}

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ error: errorMessage });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

