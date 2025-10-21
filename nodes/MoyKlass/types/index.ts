import { INodeProperties } from 'n8n-workflow';

export type ResourceType = 
	| 'user' 
	| 'payment' 
	| 'invoice' 
	| 'manager' 
	| 'lesson'
	| 'class'
	| 'join'
	| 'task'
	| 'file'
	| 'subscription'
	| 'userSubscription'
	| 'comment'
	| 'cashbox'
	| 'bonusProgram'
	| 'family'
	| 'company'
	| 'room'
	| 'lessonRecord'
	| 'contract'
	| 'rate'
	| 'taskCategory'
	| 'subscriptionGrouping'
	| 'classAttribute'
	| 'busyTime';

export type OperationType = 
	| 'getAll' 
	| 'get' 
	| 'create' 
	| 'update' 
	| 'delete'
	| 'updateStatus'
	| 'getTags'
	| 'updateTags'
	| 'updateAttribute'
	| 'freeze'
	| 'markStudent'
	| 'getLevels'
	| 'getPayments'
	| 'getByUser';

export interface IResourceDescription {
	value: string;
	name: string;
}

export interface IOperationDescription {
	value: string;
	name: string;
	description: string;
	action: string;
}

export function getAdditionalFieldsForGetAll(): INodeProperties {
	return {
		displayName: 'Дополнительные поля',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Добавить поле',
		default: {},
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

