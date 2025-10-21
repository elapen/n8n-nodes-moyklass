import { INodeProperties } from 'n8n-workflow';
import { getBasicOperations, getIdField } from './CommonDescriptions';

// Contract
export const contractOperations: INodeProperties[] = [
	getBasicOperations('contract', 'договоры'),
	getIdField('contract'),
];

export const contractFields: INodeProperties[] = [
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create'],
			},
		},
		description: 'Название договора',
		placeholder: 'Договор №123',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Номер',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Номер договора',
			},
			{
				displayName: 'Дата',
				name: 'date',
				type: 'string',
				default: '',
				description: 'Дата договора (YYYY-MM-DD)',
				placeholder: '2024-10-21',
			},
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Описание договора',
			},
		],
	},
];

// Rate
export const rateOperations: INodeProperties[] = [
	getBasicOperations('rate', 'тарифы'),
	getIdField('rate'),
];

export const rateFields: INodeProperties[] = [
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['create'],
			},
		},
		description: 'Название тарифа',
		placeholder: 'Стандартный тариф',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Цена',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'Цена тарифа',
			},
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Описание тарифа',
			},
			{
				displayName: 'Активен',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Активен ли тариф',
			},
		],
	},
];

// Task Category
export const taskCategoryOperations: INodeProperties[] = [
	getBasicOperations('taskCategory', 'категории задач'),
	getIdField('taskCategory'),
];

export const taskCategoryFields: INodeProperties[] = [
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['taskCategory'],
				operation: ['create'],
			},
		},
		description: 'Название категории задач',
		placeholder: 'Обучение',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['taskCategory'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Описание категории',
			},
			{
				displayName: 'Цвет',
				name: 'color',
				type: 'string',
				default: '',
				description: 'Цвет категории (hex)',
				placeholder: '#FF0000',
			},
		],
	},
];

// Subscription Grouping
export const subscriptionGroupingOperations: INodeProperties[] = [
	getBasicOperations('subscriptionGrouping', 'группировки абонементов'),
	getIdField('subscriptionGrouping'),
];

export const subscriptionGroupingFields: INodeProperties[] = [
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['subscriptionGrouping'],
				operation: ['create'],
			},
		},
		description: 'Название группировки абонементов',
		placeholder: 'Групповые занятия',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscriptionGrouping'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Описание группировки',
			},
		],
	},
];

// Class Attribute
export const classAttributeOperations: INodeProperties[] = [
	getBasicOperations('classAttribute', 'атрибуты групп'),
	getIdField('classAttribute'),
];

export const classAttributeFields: INodeProperties[] = [
	{
		displayName: 'Название',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['classAttribute'],
				operation: ['create'],
			},
		},
		description: 'Название атрибута группы',
		placeholder: 'Уровень сложности',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['classAttribute'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Тип',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Текст', value: 'text' },
					{ name: 'Число', value: 'number' },
					{ name: 'Список', value: 'select' },
					{ name: 'Множественный выбор', value: 'multiselect' },
					{ name: 'Да/Нет', value: 'boolean' },
				],
				default: 'text',
				description: 'Тип атрибута',
			},
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Описание атрибута',
			},
		],
	},
];

// Busy Time
export const busyTimeOperations: INodeProperties[] = [
	getBasicOperations('busyTime', 'занятые времена'),
	getIdField('busyTime'),
];

export const busyTimeFields: INodeProperties[] = [
	{
		displayName: 'Время начала',
		name: 'beginTime',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['busyTime'],
				operation: ['create'],
			},
		},
		description: 'Время начала (YYYY-MM-DD HH:mm:ss)',
		placeholder: '2024-10-21 10:00:00',
	},
	{
		displayName: 'Время окончания',
		name: 'endTime',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['busyTime'],
				operation: ['create'],
			},
		},
		description: 'Время окончания (YYYY-MM-DD HH:mm:ss)',
		placeholder: '2024-10-21 11:00:00',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['busyTime'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'ID менеджера',
				name: 'managerId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadManagers',
				},
				default: '',
				description: 'ID менеджера',
			},
			{
				displayName: 'ID комнаты',
				name: 'roomId',
				type: 'string',
				default: '',
				description: 'ID комнаты',
			},
			{
				displayName: 'Комментарий',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Комментарий',
			},
		],
	},
];

