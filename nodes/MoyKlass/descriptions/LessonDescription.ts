import { INodeProperties } from 'n8n-workflow';

export const lessonOperations: INodeProperties[] = [
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
		],
		default: 'getAll',
	},
];

export const lessonFields: INodeProperties[] = [
	{
		displayName: 'Lesson ID',
		name: 'lessonId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['lesson'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID урока',
	},
	{
		displayName: 'ID группы',
		name: 'classId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['lesson'],
				operation: ['create'],
			},
		},
		description: 'ID группы для которой создается урок',
	},
	{
		displayName: 'Дата и время',
		name: 'date',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['lesson'],
				operation: ['create'],
			},
		},
		description: 'Дата и время урока в формате ISO 8601',
		placeholder: '2025-10-23T10:00:00+00:00',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['lesson'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Тема',
				name: 'topic',
				type: 'string',
				default: '',
				description: 'Тема урока',
			},
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Описание урока',
			},
			{
				displayName: 'ID преподавателя',
				name: 'teacherId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadManagers',
				},
				default: '',
				description: 'ID преподавателя',
			},
			{
				displayName: 'ID помещения',
				name: 'roomId',
				type: 'string',
				default: '',
				description: 'ID помещения',
			},
			{
				displayName: 'Длительность (минуты)',
				name: 'duration',
				type: 'number',
				default: 60,
				description: 'Длительность урока в минутах',
			},
		],
	},
];

