import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

const resourceEndpoints: { [key: string]: string } = {
	invoice: '/v1/company/invoices',
	manager: '/v1/company/managers',
	lesson: '/v1/company/lessons',
	class: '/v1/company/classes',
	join: '/v1/company/joins',
	task: '/v1/company/tasks',
	file: '/v1/company/files',
	subscription: '/v1/company/subscriptions',
	userSubscription: '/v1/company/userSubscriptions',
	comment: '/v1/company/userComments',
	cashbox: '/v1/company/cashboxes',
	family: '/v1/company/families',
	room: '/v1/company/rooms',
	lessonRecord: '/v1/company/lessonRecords',
	contract: '/v1/company/contracts',
	rate: '/v1/company/rates',
	taskCategory: '/v1/company/taskCategories',
	subscriptionGrouping: '/v1/company/subscriptionGroupings',
	classAttribute: '/v1/company/classAttributes',
	busyTime: '/v1/company/busyTimes',
};

export async function executeGenericOperation(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const baseEndpoint = resourceEndpoints[resource];
	
	if (!baseEndpoint) {
		throw new Error(`Unknown resource: ${resource}`);
	}

	if (operation === 'getAll') {
		endpoint = baseEndpoint;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const id = this.getNodeParameter('id', i) as string;
		endpoint = `${baseEndpoint}/${id}`;
	} else if (operation === 'create') {
		endpoint = baseEndpoint;
		method = 'POST';
		
		// Для ресурсов с нормальными полями
		if (['contract', 'rate', 'taskCategory', 'subscriptionGrouping', 'classAttribute'].includes(resource)) {
			const name = this.getNodeParameter('name', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
			body = { name, ...additionalFields };
		} else if (resource === 'busyTime') {
			const beginTime = this.getNodeParameter('beginTime', i) as string;
			const endTime = this.getNodeParameter('endTime', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
			body = { beginTime, endTime, ...additionalFields };
		} else {
			// Для остальных ресурсов используем старый bodyData (если есть)
			const bodyData = this.getNodeParameter('bodyData', i, {}) as IDataObject;
			body = { ...bodyData };
		}
	} else if (operation === 'update') {
		const id = this.getNodeParameter('id', i) as string;
		endpoint = `${baseEndpoint}/${id}`;
		method = 'POST';
		
		// Для всех ресурсов используем additionalFields при update
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		body = { ...additionalFields };
	} else if (operation === 'delete') {
		const id = this.getNodeParameter('id', i) as string;
		endpoint = `${baseEndpoint}/${id}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

