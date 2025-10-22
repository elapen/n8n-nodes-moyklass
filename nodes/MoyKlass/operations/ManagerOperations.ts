import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executeManagerOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'getAll') {
		endpoint = '/v1/company/managers';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const managerId = this.getNodeParameter('managerId', i) as string;
		endpoint = `/v1/company/managers/${managerId}`;
	} else if (operation === 'create') {
		endpoint = '/v1/company/managers';
		method = 'POST';
		
		const name = this.getNodeParameter('name', i) as string;
		const email = this.getNodeParameter('email', i, '') as string;
		const phone = this.getNodeParameter('phone', i, '') as string;
		const filials = this.getNodeParameter('filials', i) as number[];
		const roles = this.getNodeParameter('roles', i, []) as number[];
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			name,
			filials,
			...additionalFields,
		};
		
		if (email) body.email = email;
		if (phone) body.phone = phone;
		if (roles && roles.length > 0) body.roles = roles;
	} else if (operation === 'update') {
		const managerId = this.getNodeParameter('managerId', i) as string;
		endpoint = `/v1/company/managers/${managerId}`;
		method = 'POST';
		
		const name = this.getNodeParameter('name', i, '') as string;
		const email = this.getNodeParameter('email', i, '') as string;
		const phone = this.getNodeParameter('phone', i, '') as string;
		const filials = this.getNodeParameter('filials', i, []) as number[];
		const roles = this.getNodeParameter('roles', i, []) as number[];
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = { ...additionalFields };
		
		if (name) body.name = name;
		if (email) body.email = email;
		if (phone) body.phone = phone;
		if (filials && filials.length > 0) body.filials = filials;
		if (roles && roles.length > 0) body.roles = roles;
	} else if (operation === 'delete') {
		const managerId = this.getNodeParameter('managerId', i) as string;
		endpoint = `/v1/company/managers/${managerId}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

