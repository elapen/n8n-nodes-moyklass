import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executeClassOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'getAll') {
		endpoint = '/v1/company/classes';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const classId = this.getNodeParameter('classId', i) as string;
		endpoint = `/v1/company/classes/${classId}`;
	} else if (operation === 'create') {
		endpoint = '/v1/company/classes';
		method = 'POST';
		
		const name = this.getNodeParameter('name', i) as string;
		const filialId = this.getNodeParameter('filialId', i) as number;
		const beginDate = this.getNodeParameter('beginDate', i, '') as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			name,
			filialId,
			...additionalFields,
		};
		
		if (beginDate) body.beginDate = beginDate;

		// Handle managerIds array
		if (additionalFields.managerIds && Array.isArray(additionalFields.managerIds)) {
			body.managerIds = additionalFields.managerIds;
		}
	} else if (operation === 'update') {
		const classId = this.getNodeParameter('classId', i) as string;
		endpoint = `/v1/company/classes/${classId}`;
		method = 'POST';
		
		const name = this.getNodeParameter('name', i, '') as string;
		const filialId = this.getNodeParameter('filialId', i, '') as number;
		const beginDate = this.getNodeParameter('beginDate', i, '') as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = { ...additionalFields };
		
		if (name) body.name = name;
		if (filialId) body.filialId = filialId;
		if (beginDate) body.beginDate = beginDate;

		// Handle managerIds array
		if (additionalFields.managerIds && Array.isArray(additionalFields.managerIds)) {
			body.managerIds = additionalFields.managerIds;
		}
	} else if (operation === 'delete') {
		const classId = this.getNodeParameter('classId', i) as string;
		endpoint = `/v1/company/classes/${classId}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

