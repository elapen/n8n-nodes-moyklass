import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';

import { getAccessToken } from './helpers/TokenHelper';
import { normalizeAttributeValue } from './helpers/AttributeHelper';
import { 
	loadManagers, 
	loadCourses, 
	loadClientStatuses, 
	loadFilials, 
	loadAdvSources,
	loadCreateSources,
	loadPaymentTypes,
	loadCashboxes,
	loadUserAttributes,
	loadClassAttributes,
	loadUserTags,
	loadRoles,
} from './helpers/LoadOptionsHelper';

import { resourceList } from './descriptions/ResourceList';
import { userOperations, userFields } from './descriptions/UserDescription';
import { paymentOperations, paymentFields } from './descriptions/PaymentDescription';
import { managerOperations, managerFields } from './descriptions/ManagerDescription';
import { classOperations, classFields } from './descriptions/ClassDescription';
import { lessonOperations, lessonFields } from './descriptions/LessonDescription';
import { joinOperations, joinFields } from './descriptions/JoinDescription';
import { userCommentOperations, userCommentFields } from './descriptions/UserCommentDescription';
import { 
	contractOperations,
	contractFields,
	rateOperations,
	rateFields,
	taskCategoryOperations,
	taskCategoryFields,
	subscriptionGroupingOperations,
	subscriptionGroupingFields,
	classAttributeOperations,
	classAttributeFields,
	busyTimeOperations,
	busyTimeFields,
} from './descriptions/NewResourcesDescription';
import { 
	getBasicOperations, 
	getIdField, 
	getReturnAllField, 
	getAdditionalFieldsForGetAll,
} from './descriptions/CommonDescriptions';

import { executeUserOperation } from './operations/UserOperations';
import { executePaymentOperation } from './operations/PaymentOperations';
import { executeManagerOperation } from './operations/ManagerOperations';
import { executeClassOperation } from './operations/ClassOperations';
import { executeLessonOperation } from './operations/LessonOperations';
import { executeJoinOperation } from './operations/JoinOperations';
import { executeUserCommentOperation } from './operations/UserCommentOperations';
import { executeGenericOperation } from './operations/GenericOperations';

export class MoyKlass implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MoyKlass',
		name: 'moyKlass',
		icon: 'file:moyklass.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Работа с CRM MoyKlass',
		defaults: {
			name: 'MoyKlass',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'moyKlassApi',
				required: true,
			},
		],
		properties: [
			// Resource selection
			resourceList,

			// User
			...userOperations,
			...userFields,

			// Payment
			...paymentOperations,
			...paymentFields,

			// Manager
			...managerOperations,
			...managerFields,

			// Class
			...classOperations,
			...classFields,

			// Lesson
			...lessonOperations,
			...lessonFields,

			// Join
			...joinOperations,
			...joinFields,

			// User Comment
			...userCommentOperations,
			...userCommentFields,

			// Invoice
			getBasicOperations('invoice', 'счета'),
			getIdField('invoice'),

			// Task
			getBasicOperations('task', 'задачи'),
			getIdField('task'),

			// File
			getBasicOperations('file', 'файлы'),
			getIdField('file'),

			// Subscription
			getBasicOperations('subscription', 'виды абонементов'),
			getIdField('subscription'),

			// User Subscription
			getBasicOperations('userSubscription', 'абонементы учеников'),
			getIdField('userSubscription'),

			// Comment
			getBasicOperations('comment', 'комментарии'),
			getIdField('comment'),

			// Cashbox
			getBasicOperations('cashbox', 'кассы'),
			getIdField('cashbox'),

			// Family
			getBasicOperations('family', 'семьи'),
			getIdField('family'),

			// Room
			getBasicOperations('room', 'помещения'),
			getIdField('room'),

			// Lesson Record
			getBasicOperations('lessonRecord', 'отметки о посещении'),
			getIdField('lessonRecord'),

			// Contract
			...contractOperations,
			...contractFields,

			// Rate
			...rateOperations,
			...rateFields,

			// Task Category
			...taskCategoryOperations,
			...taskCategoryFields,

			// Subscription Grouping
			...subscriptionGroupingOperations,
			...subscriptionGroupingFields,

			// Class Attribute
			...classAttributeOperations,
			...classAttributeFields,

			// Busy Time
			...busyTimeOperations,
			...busyTimeFields,

			// Company operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['company'],
					},
				},
				options: [
					{
						name: 'Get Adv Sources',
						value: 'getAdvSources',
						description: 'Получить источники рекламы',
						action: 'Получить источники рекламы',
					},
					{
						name: 'Get Create Sources',
						value: 'getCreateSources',
						description: 'Получить источники создания',
						action: 'Получить источники создания',
					},
					{
						name: 'Get Status Reasons',
						value: 'getStatusReasons',
						description: 'Получить причины статусов',
						action: 'Получить причины статусов',
					},
					{
						name: 'Get Filials',
						value: 'getFilials',
						description: 'Получить филиалы',
						action: 'Получить филиалы',
					},
					{
						name: 'Get User Attributes',
						value: 'getUserAttributes',
						description: 'Получить атрибуты учеников',
						action: 'Получить атрибуты',
					},
					{
						name: 'Get Courses',
						value: 'getCourses',
						description: 'Получить курсы',
						action: 'Получить курсы',
					},
					{
						name: 'Get Join Statuses',
						value: 'getJoinStatuses',
						description: 'Получить статусы записей',
						action: 'Получить статусы записей',
					},
					{
						name: 'Get Client Statuses',
						value: 'getClientStatuses',
						description: 'Получить статусы клиентов',
						action: 'Получить статусы клиентов',
					},
					{
						name: 'Get Join Tags',
						value: 'getJoinTags',
						description: 'Получить теги записей',
						action: 'Получить теги записей',
					},
					{
						name: 'Get Payment Types',
						value: 'getPaymentTypes',
						description: 'Получить типы платежей',
						action: 'Получить типы платежей',
					},
					{
						name: 'Get Roles',
						value: 'getRoles',
						description: 'Получить роли',
						action: 'Получить роли',
					},
					{
						name: 'Get User Tags',
						value: 'getUserTags',
						description: 'Получить теги учеников',
						action: 'Получить теги учеников',
					},
				],
				default: 'getAdvSources',
			},

			// Bonus Program operations
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['bonusProgram'],
					},
				},
				options: [
					{
						name: 'Get Levels',
						value: 'getLevels',
						description: 'Получить уровни бонусной программы',
						action: 'Получить уровни',
					},
					{
						name: 'Get Payments',
						value: 'getPayments',
						description: 'Получить бонусные платежи',
						action: 'Получить бонусные платежи',
					},
				],
				default: 'getLevels',
			},

			// Body data for remaining generic resources (without proper fields yet)
			// Note: User, Payment, Manager, Class, Lesson, Join, Comment, Contract, Rate, TaskCategory, SubscriptionGrouping, ClassAttribute, BusyTime have proper fields
			{
				displayName: 'Данные',
				name: 'bodyData',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: [
							'invoice', 'task', 
							'file', 'subscription', 'userSubscription', 
							'cashbox', 'family', 'room', 'lessonRecord',
						],
						operation: ['create', 'update'],
					},
				},
				description: 'Данные для создания/обновления записи в формате JSON',
			},

			// Common fields
			getAdditionalFieldsForGetAll(),
			getReturnAllField(),
		],
	};

	methods = {
		loadOptions: {
			loadManagers,
			loadCourses,
			loadClientStatuses,
			loadFilials,
			loadAdvSources,
			loadCreateSources,
			loadPaymentTypes,
			loadCashboxes,
			loadUserAttributes,
			loadClassAttributes,
			loadUserTags,
			loadRoles,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		// Получаем credentials
		const credentials = await this.getCredentials('moyKlassApi') as ICredentialDataDecryptedObject;
		const apiKey = credentials.apiKey as string;
		const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';

		// Получаем access token
		const accessToken = await getAccessToken.call(this, apiKey, baseUrl);

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let endpoint = '';
				let method = 'GET' as any;
				let body: IDataObject = {};
				let qs: IDataObject = {};

				// Route to appropriate operation handler
				let customAttributes: any[] | undefined;
				
				if (resource === 'user') {
					const result = await executeUserOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
					customAttributes = result.customAttributes;
				} else if (resource === 'payment') {
					const result = await executePaymentOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				} else if (resource === 'manager') {
					const result = await executeManagerOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				} else if (resource === 'class') {
					const result = await executeClassOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				} else if (resource === 'lesson') {
					const result = await executeLessonOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				} else if (resource === 'join') {
					const result = await executeJoinOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				} else if (resource === 'comment') {
					const result = await executeUserCommentOperation.call(this, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				} else if (resource === 'company') {
					// Company dictionary operations
					const operationMap: { [key: string]: string } = {
						getAdvSources: '/v1/company/advSources',
						getCreateSources: '/v1/company/createSources',
						getStatusReasons: '/v1/company/statusReasons',
						getFilials: '/v1/company/filials',
						getUserAttributes: '/v1/company/userAttributes',
						getCourses: '/v1/company/courses',
						getJoinStatuses: '/v1/company/joinStatuses',
						getClientStatuses: '/v1/company/clientStatuses',
						getJoinTags: '/v1/company/joinTags',
						getPaymentTypes: '/v1/company/paymentTypes',
						getRoles: '/v1/company/roles',
						getUserTags: '/v1/company/userTags',
					};
					endpoint = operationMap[operation] || '';
				} else if (resource === 'bonusProgram') {
					if (operation === 'getLevels') {
						endpoint = '/v1/company/bonusProgram/levels';
					} else if (operation === 'getPayments') {
						endpoint = '/v1/company/bonusProgram/payments';
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						qs = { ...additionalFields };
					}
				} else {
					// Generic CRUD operations for other resources
					const result = await executeGenericOperation.call(this, resource, operation, i);
					endpoint = result.endpoint;
					method = result.method;
					body = result.body;
					qs = result.qs;
				}

				// Make the API request
				let responseData = await this.helpers.request({
					method,
					url: `${baseUrl}${endpoint}`,
					headers: {
						'x-access-token': accessToken,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body,
					qs,
					json: true,
				});

				// Handle custom attributes for user create/update operations
				if (resource === 'user' && (operation === 'create' || operation === 'update') && customAttributes && customAttributes.length > 0) {
					const userId = responseData.id || (operation === 'update' ? this.getNodeParameter('userId', i) : null);
					
					if (userId) {
						const attributeResults: string[] = [];
						
						// Update each custom attribute
						for (const attr of customAttributes) {
							if (attr.attributeId && attr.value !== undefined) {
								try {
									// Нормализуем значение атрибута согласно его типу
									const normalizedValue = await normalizeAttributeValue(
										this,
										accessToken,
										baseUrl,
										attr.attributeId,
										attr.value.toString()
									);

									// Если нормализация вернула null (не нашли совпадение), пропускаем
									if (normalizedValue === null) {
										attributeResults.push(`⚠ Attribute ${attr.attributeId}: value "${attr.value}" not found in available options`);
										continue;
									}

									await this.helpers.request({
										method: 'POST',
										url: `${baseUrl}/v1/company/users/${userId}/attribute/${attr.attributeId}`,
										headers: {
											'x-access-token': accessToken,
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										},
										body: normalizedValue,
										json: true,
									});
									
									// Успешно обновлен атрибут
									attributeResults.push(`✓ Attribute ${attr.attributeId} updated (sent: ${JSON.stringify(normalizedValue)})`);
								} catch (error) {
									const errorMessage = error instanceof Error ? error.message : String(error);
									attributeResults.push(`✗ Attribute ${attr.attributeId}: ${errorMessage}`);
								}
							}
						}
						
						// Добавляем результаты в ответ для debug
						if (attributeResults.length > 0 && responseData) {
							responseData._attributeDebug = attributeResults;
						}
						
						// Refresh user data to get updated attributes
						if (operation === 'create' || operation === 'update') {
							responseData = await this.helpers.request({
								method: 'GET',
								url: `${baseUrl}/v1/company/users/${userId}`,
								headers: {
									'x-access-token': accessToken,
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
								json: true,
							});
						}
					}
				}

				// Handle pagination for getAll operations
				if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
					let allData = Array.isArray(responseData) ? responseData : [responseData];

					if (returnAll && Array.isArray(responseData)) {
						let hasMore = responseData.length === (qs.limit as number || 100);
						let offset = (qs.limit as number || 100);

						while (hasMore) {
							const additionalData = await this.helpers.request({
								method: 'GET',
								url: `${baseUrl}${endpoint}`,
								headers: {
									'x-access-token': accessToken,
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
								qs: { ...qs, offset },
								json: true,
							});

							if (Array.isArray(additionalData) && additionalData.length > 0) {
								allData.push(...additionalData);
								offset += additionalData.length;
								hasMore = additionalData.length === (qs.limit as number || 100);
							} else {
								hasMore = false;
							}
						}
					}

					returnData.push(...allData);
				} else {
					if (Array.isArray(responseData)) {
						returnData.push(...responseData);
					} else {
						returnData.push(responseData as IDataObject);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ error: errorMessage });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

