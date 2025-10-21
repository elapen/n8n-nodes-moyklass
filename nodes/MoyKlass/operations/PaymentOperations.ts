import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executePaymentOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'getAll') {
		endpoint = '/v1/company/payments';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const id = this.getNodeParameter('id', i) as string;
		endpoint = `/v1/company/payments/${id}`;
	} else if (operation === 'create') {
		endpoint = '/v1/company/payments';
		method = 'POST';
		
		const userId = this.getNodeParameter('userId', i) as string;
		const sum = this.getNodeParameter('sum', i) as number;
		const date = this.getNodeParameter('date', i, '') as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			userId,
			sum,
			...additionalFields,
		};
		
		if (date) body.date = date;
	} else if (operation === 'update') {
		const id = this.getNodeParameter('id', i) as string;
		endpoint = `/v1/company/payments/${id}`;
		method = 'POST';
		
		const sum = this.getNodeParameter('sum', i, 0) as number;
		const date = this.getNodeParameter('date', i, '') as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = { ...additionalFields };
		
		if (sum) body.sum = sum;
		if (date) body.date = date;
	} else if (operation === 'delete') {
		const id = this.getNodeParameter('id', i) as string;
		endpoint = `/v1/company/payments/${id}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

