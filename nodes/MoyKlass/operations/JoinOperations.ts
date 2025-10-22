import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executeJoinOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'getAll') {
		endpoint = '/v1/company/joins';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const joinId = this.getNodeParameter('joinId', i) as string;
		endpoint = `/v1/company/joins/${joinId}`;
	} else if (operation === 'create') {
		endpoint = '/v1/company/joins';
		method = 'POST';
		
		const userId = this.getNodeParameter('userId', i) as string;
		const classId = this.getNodeParameter('classId', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			userId,
			classId,
			...additionalFields,
		};
	} else if (operation === 'update') {
		const joinId = this.getNodeParameter('joinId', i) as string;
		endpoint = `/v1/company/joins/${joinId}`;
		method = 'POST';
		
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		body = { ...additionalFields };
	} else if (operation === 'delete') {
		const joinId = this.getNodeParameter('joinId', i) as string;
		endpoint = `/v1/company/joins/${joinId}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

