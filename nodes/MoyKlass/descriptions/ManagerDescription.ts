import { INodeProperties } from 'n8n-workflow';

export const managerOperations: INodeProperties[] = [
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
				description: 'Обновить данные сотрудника',
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
];

export const managerFields: INodeProperties[] = [
	// ID field
	{
		displayName: 'Manager ID',
		name: 'managerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID сотрудника',
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
				resource: ['manager'],
				operation: ['create'],
			},
		},
		description: 'Полное имя сотрудника',
		placeholder: 'Иванов Иван Иванович',
	},
	{
		displayName: 'Имя',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['update'],
			},
		},
		description: 'Полное имя сотрудника',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['create', 'update'],
			},
		},
		description: 'Email сотрудника',
	},
	{
		displayName: 'Телефон',
		name: 'phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['create', 'update'],
			},
		},
		description: 'Телефон сотрудника',
		placeholder: '+7 900 123-45-67',
	},
	{
		displayName: 'Филиалы',
		name: 'filials',
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'loadFilials',
		},
		default: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['create'],
			},
		},
		description: 'Филиалы, к которым привязан сотрудник (обязательное поле)',
	},
	{
		displayName: 'Филиалы',
		name: 'filials',
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'loadFilials',
		},
		default: [],
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['update'],
			},
		},
		description: 'Филиалы, к которым привязан сотрудник',
	},
	{
		displayName: 'Роли',
		name: 'roles',
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'loadRoles',
		},
		default: [],
		displayOptions: {
			show: {
				resource: ['manager'],
				operation: ['create', 'update'],
			},
		},
		description: 'Роли сотрудника (Администратор, Менеджер, Преподаватель)',
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
				resource: ['manager'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Активен',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Включен ли сотрудник (может заходить в систему)',
			},
			{
				displayName: 'В штате',
				name: 'isStaff',
				type: 'boolean',
				default: true,
				description: 'Является ли сотрудник штатным',
			},
			{
				displayName: 'Работает',
				name: 'isWork',
				type: 'boolean',
				default: true,
				description: 'Работает ли сотрудник в данный момент',
			},
			{
				displayName: 'Заблокирован',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Заблокирован ли доступ сотруднику',
			},
			{
				displayName: 'Отправлять уведомления',
				name: 'sendNotifies',
				type: 'boolean',
				default: true,
				description: 'Отправлять ли уведомления сотруднику',
			},
			{
				displayName: 'Комментарий',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Комментарий о сотруднике',
			},
			{
				displayName: 'Цвет',
				name: 'color',
				type: 'string',
				default: '',
				description: 'Цвет сотрудника в календаре (например: #ffcdd2)',
				placeholder: '#ffcdd2',
			},
			{
				displayName: 'Дата рождения',
				name: 'birthDate',
				type: 'string',
				default: '',
				description: 'Дата рождения в формате YYYY-MM-DD',
				placeholder: '1990-01-15',
			},
			{
				displayName: 'Дата начала работы',
				name: 'startDate',
				type: 'string',
				default: '',
				description: 'Дата начала работы в формате YYYY-MM-DD',
			},
			{
				displayName: 'Дата окончания работы',
				name: 'endDate',
				type: 'string',
				default: '',
				description: 'Дата окончания работы в формате YYYY-MM-DD',
			},
			{
				displayName: 'Номер договора',
				name: 'contractNumber',
				type: 'string',
				default: '',
				description: 'Номер трудового договора',
			},
			{
				displayName: 'Дата договора',
				name: 'contractDate',
				type: 'string',
				default: '',
				description: 'Дата трудового договора в формате YYYY-MM-DD',
			},
			{
				displayName: 'Паспортные данные',
				name: 'passportData',
				type: 'string',
				default: '',
				description: 'Паспортные данные сотрудника',
			},
			{
				displayName: 'ИНН',
				name: 'inn',
				type: 'string',
				default: '',
				description: 'ИНН сотрудника',
			},
			{
				displayName: 'Филиал для зарплаты',
				name: 'salaryFilialId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadFilials',
				},
				default: '',
				description: 'Филиал, к которому привязана зарплата',
			},
			{
				displayName: 'ID тарифа',
				name: 'rateId',
				type: 'string',
				default: '',
				description: 'ID тарифа оплаты сотрудника',
			},
			{
				displayName: 'Длительность смены (часы)',
				name: 'shiftDuration',
				type: 'number',
				default: 8,
				description: 'Длительность рабочей смены в часах',
			},
			{
				displayName: 'Краткое описание',
				name: 'shortDescription',
				type: 'string',
				default: '',
				description: 'Краткое описание сотрудника',
			},
			{
				displayName: 'Полное описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Полное описание сотрудника',
			},
			{
				displayName: 'Дополнительные контакты',
				name: 'additionalContacts',
				type: 'string',
				default: '',
				description: 'Дополнительные контакты (JSON)',
			},
		],
	},
];

