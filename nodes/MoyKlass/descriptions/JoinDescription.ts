import { INodeProperties } from 'n8n-workflow';

export const joinOperations: INodeProperties[] = [
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
				description: 'Создать запись ученика в группу',
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
		],
		default: 'getAll',
	},
];

export const joinFields: INodeProperties[] = [
	{
		displayName: 'Join ID',
		name: 'joinId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['join'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID записи',
	},
	{
		displayName: 'ID ученика',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['join'],
				operation: ['create'],
			},
		},
		description: 'ID ученика',
	},
	{
		displayName: 'ID группы',
		name: 'classId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['join'],
				operation: ['create'],
			},
		},
		description: 'ID группы',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['join'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Дата начала',
				name: 'beginDate',
				type: 'string',
				default: '',
				description: 'Дата начала обучения в формате YYYY-MM-DD',
			},
			{
				displayName: 'Комментарий',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Комментарий к записи',
			},
			{
				displayName: 'ID статуса',
				name: 'statusId',
				type: 'string',
				default: '',
				description: 'ID статуса записи',
			},
		],
	},
];

