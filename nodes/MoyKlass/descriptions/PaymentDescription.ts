import { INodeProperties } from 'n8n-workflow';
import { getBasicOperations, getIdField } from './CommonDescriptions';

export const paymentOperations: INodeProperties[] = [
	getBasicOperations('payment', 'платежи'),
	getIdField('payment', ['get', 'update', 'delete']),
];

export const paymentFields: INodeProperties[] = [
	// Create/Update fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'ID ученика',
	},
	{
		displayName: 'Сумма',
		name: 'sum',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create', 'update'],
			},
		},
		description: 'Сумма платежа',
	},
	{
		displayName: 'Дата',
		name: 'date',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create', 'update'],
			},
		},
		description: 'Дата платежа в формате YYYY-MM-DD',
	},
	{
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Комментарий к платежу',
			},
			{
				displayName: 'Тип платежа',
				name: 'paymentTypeId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadPaymentTypes',
				},
				default: '',
				description: 'Тип платежа',
			},
			{
				displayName: 'Касса',
				name: 'cashboxId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadCashboxes',
				},
				default: '',
				description: 'Касса для платежа',
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
				displayName: 'Invoice ID',
				name: 'invoiceId',
				type: 'string',
				default: '',
				description: 'ID счета',
			},
		],
	},
];

