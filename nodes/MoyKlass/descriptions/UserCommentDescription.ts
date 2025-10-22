import { INodeProperties } from 'n8n-workflow';

export const userCommentOperations: INodeProperties[] = [
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
];

export const userCommentFields: INodeProperties[] = [
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID комментария',
	},
	{
		displayName: 'ID ученика',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create'],
			},
		},
		description: 'ID ученика, к которому относится комментарий',
	},
	{
		displayName: 'Комментарий',
		name: 'comment',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create', 'update'],
			},
		},
		description: 'Текст комментария',
		typeOptions: {
			rows: 4,
		},
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Показывать ученику',
				name: 'showToUser',
				type: 'boolean',
				default: false,
				description: 'Видимость комментария для ученика',
			},
			{
				displayName: 'ID занятия',
				name: 'lessonId',
				type: 'string',
				default: '',
				description: 'ID занятия, к которому относится комментарий',
			},
			{
				displayName: 'ID группы',
				name: 'classId',
				type: 'string',
				default: '',
				description: 'ID группы, к которой относится комментарий',
			},
			{
				displayName: 'ID менеджера',
				name: 'managerId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadManagers',
				},
				default: '',
				description: 'ID менеджера, создающего комментарий',
			},
		],
	},
];

