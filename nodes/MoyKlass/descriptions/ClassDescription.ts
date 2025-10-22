import { INodeProperties } from 'n8n-workflow';

export const classOperations: INodeProperties[] = [
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
				description: 'Обновить данные группы',
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
];

export const classFields: INodeProperties[] = [
	// ID field
	{
		displayName: 'Class ID',
		name: 'classId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['class'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID группы',
	},

	// Create/Update fields
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['class'],
				operation: ['create'],
			},
		},
		description: 'Название группы',
		placeholder: 'Английский для начинающих',
	},
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['class'],
				operation: ['update'],
			},
		},
		description: 'Название группы',
	},
	{
		displayName: 'Филиал',
		name: 'filialId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'loadFilials',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['class'],
				operation: ['create'],
			},
		},
		description: 'Филиал, к которому привязана группа',
	},
	{
		displayName: 'Филиал',
		name: 'filialId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'loadFilials',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['class'],
				operation: ['update'],
			},
		},
		description: 'Филиал, к которому привязана группа',
	},
	{
		displayName: 'Дата начала',
		name: 'beginDate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['class'],
				operation: ['create', 'update'],
			},
		},
		description: 'Дата начала занятий в формате YYYY-MM-DD',
		placeholder: '2025-10-01',
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
				resource: ['class'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Статус',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Открыта', value: 'opened' },
					{ name: 'Закрыта', value: 'closed' },
					{ name: 'Приостановлена', value: 'paused' },
				],
				default: 'opened',
				description: 'Статус группы',
			},
			{
				displayName: 'Курс',
				name: 'courseId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadCourses',
				},
				default: '',
				description: 'ID курса',
			},
			{
				displayName: 'Максимум учеников',
				name: 'maxStudents',
				type: 'number',
				default: 10,
				description: 'Максимальное количество учеников в группе',
			},
			{
				displayName: 'Тип оплаты',
				name: 'payType',
				type: 'options',
				options: [
					{ name: 'За уроки', value: 'lessons' },
					{ name: 'За месяц', value: 'month' },
					{ name: 'За абонемент', value: 'subscription' },
				],
				default: 'lessons',
				description: 'Тип оплаты',
			},
			{
				displayName: 'Комментарий',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Комментарий о группе',
			},
			{
				displayName: 'Цена',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'Цена обучения',
			},
			{
				displayName: 'Комментарий к цене',
				name: 'priceComment',
				type: 'string',
				default: '',
				description: 'Дополнительная информация о цене',
			},
			{
				displayName: 'Цвет',
				name: 'color',
				type: 'string',
				default: '',
				description: 'Цвет группы в календаре (например: #4caf50)',
				placeholder: '#4caf50',
			},
			{
				displayName: 'Онлайн оплата',
				name: 'onlinePayment',
				type: 'boolean',
				default: false,
				description: 'Доступна ли онлайн оплата',
			},
			{
				displayName: 'Отработка',
				name: 'workOff',
				type: 'boolean',
				default: true,
				description: 'Доступна ли отработка пропущенных занятий',
			},
			{
				displayName: 'Показывать даты',
				name: 'showDates',
				type: 'boolean',
				default: true,
				description: 'Показывать ли даты в расписании',
			},
			{
				displayName: 'Менеджеры',
				name: 'managerIds',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'loadManagers',
				},
				default: [],
				description: 'Менеджеры, ответственные за группу',
			},
			{
				displayName: 'Преподаватели для виджета',
				name: 'widgetsTeacherIds',
				type: 'string',
				default: '',
				description: 'ID преподавателей для виджета записи (через запятую)',
			},
		],
	},
];

