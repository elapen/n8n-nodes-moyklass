import { INodeProperties } from 'n8n-workflow';

export function getBasicOperations(resourceName: string, resourceDisplayName: string): INodeProperties {
	return {
		displayName: 'Операция',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [resourceName],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: `Получить все ${resourceDisplayName}`,
				action: `Получить все ${resourceDisplayName}`,
			},
			{
				name: 'Get',
				value: 'get',
				description: `Получить ${resourceDisplayName} по ID`,
				action: `Получить ${resourceDisplayName}`,
			},
			{
				name: 'Create',
				value: 'create',
				description: `Создать ${resourceDisplayName}`,
				action: `Создать ${resourceDisplayName}`,
			},
			{
				name: 'Update',
				value: 'update',
				description: `Обновить ${resourceDisplayName}`,
				action: `Обновить ${resourceDisplayName}`,
			},
			{
				name: 'Delete',
				value: 'delete',
				description: `Удалить ${resourceDisplayName}`,
				action: `Удалить ${resourceDisplayName}`,
			},
		],
		default: 'getAll',
	};
}

export function getIdField(resourceName: string, operations: string[] = ['get', 'update', 'delete']): INodeProperties {
	return {
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [resourceName],
				operation: operations,
			},
		},
		description: 'ID записи',
	};
}

export function getReturnAllField(): INodeProperties {
	return {
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
	};
}

export function getAdditionalFieldsForGetAll(): INodeProperties {
	return {
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
	};
}

