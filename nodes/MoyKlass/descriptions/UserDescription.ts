import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
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
				name: 'Find',
				value: 'find',
				description: 'Найти ученика по телефону или имени',
				action: 'Найти ученика',
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
];

export const userFields: INodeProperties[] = [
	// ID field
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete', 'updateStatus', 'getTags', 'updateTags', 'updateAttribute'],
			},
		},
		description: 'ID ученика',
	},

	// Find fields
	{
		displayName: 'Поиск по',
		name: 'searchBy',
		type: 'options',
		options: [
			{
				name: 'Телефон',
				value: 'phone',
			},
			{
				name: 'Имя',
				value: 'name',
			},
			{
				name: 'Email',
				value: 'email',
			},
		],
		default: 'phone',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['find'],
			},
		},
		description: 'Критерий поиска ученика',
	},
	{
		displayName: 'Значение для поиска',
		name: 'searchValue',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['find'],
			},
		},
		description: 'Значение для поиска. Телефон: любой формат (87074632526, +7 707 463 25 26) - автоматически нормализуется до 77074632526. Имя: как есть. Email: как есть.',
		placeholder: '87074632526 или Кемелхан или email@example.com',
	},

	// Create/Update fields
	{
		displayName: 'Имя',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Полное имя ученика. Например: Иванов Петр Александрович или Арғымбаева Кемелхан',
		placeholder: 'Иванов Петр Александрович',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		description: 'Email ученика',
	},
	{
		displayName: 'Телефон',
		name: 'phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		description: 'Телефон ученика. Любой формат: 87074632526, +7 707 463 25 26, 8(707)463-25-26 - автоматически нормализуется до 77074632526',
		placeholder: '87074632526 или +7 707 463 25 26',
	},
	{
		displayName: 'Дата рождения',
		name: 'birthdate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		description: 'Дата рождения в формате YYYY-MM-DD',
	},

	// Additional fields for create/update
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'number',
				default: 0,
				description: 'Скидка ученика в процентах',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Комментарий',
			},
			{
				displayName: 'Источник создания',
				name: 'createSourceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadCreateSources',
				},
				default: '',
				description: 'Источник создания клиента',
			},
			{
				displayName: 'Источник рекламы',
				name: 'advSourceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadAdvSources',
				},
				default: '',
				description: 'Источник рекламы',
			},
			{
				displayName: 'Менеджер',
				name: 'managerId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadManagers',
				},
				default: '',
				description: 'Ответственный менеджер',
			},
			{
				displayName: 'Статус клиента',
				name: 'clientStateId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadClientStatuses',
				},
				default: '',
				description: 'Статус клиента',
			},
			{
				displayName: 'Филиалы',
				name: 'filials',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'loadFilials',
				},
				default: [],
				description: 'Филиалы ученика (можно выбрать несколько)',
			},
		],
	},

	// Custom Attributes Collection
	{
		displayName: 'Кастомные атрибуты',
		name: 'customAttributes',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Добавить атрибут',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		description: 'Дополнительные поля из вашей CRM MoyKlass. Для атрибутов типа "список" - введите текст, система автоматически найдет соответствующее значение.',
		options: [
			{
				name: 'attributes',
				displayName: 'Атрибуты',
				values: [
					{
						displayName: 'Атрибут',
						name: 'attributeId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'loadUserAttributes',
						},
						default: '',
						description: 'Выберите атрибут из вашей CRM',
					},
					{
						displayName: 'Значение',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Значение атрибута. Для полей типа "список" - введите название (например: "Русский язык"), система автоматически найдет соответствующий ID. Для multiselect - через запятую.',
						placeholder: 'Русский язык',
					},
				],
			},
		],
	},

	// Status fields
	{
		displayName: 'Новый статус',
		name: 'statusId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'loadClientStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateStatus'],
			},
		},
		description: 'Новый статус клиента',
	},
	{
		displayName: 'Status Reason ID',
		name: 'statusReasonId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateStatus'],
			},
		},
		description: 'ID причины смены статуса',
	},

	// Tags fields
	{
		displayName: 'Tag IDs',
		name: 'tagIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateTags'],
			},
		},
		description: 'ID тегов через запятую',
	},

	// Attribute fields
	{
		displayName: 'Attribute ID',
		name: 'attrId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateAttribute'],
			},
		},
		description: 'ID атрибута',
	},
	{
		displayName: 'Attribute Value',
		name: 'value',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateAttribute'],
			},
		},
		description: 'Значение атрибута',
	},
];

