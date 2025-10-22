import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executeLessonOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'getAll') {
		endpoint = '/v1/company/lessons';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const lessonId = this.getNodeParameter('lessonId', i) as string;
		endpoint = `/v1/company/lessons/${lessonId}`;
	} else if (operation === 'create') {
		endpoint = '/v1/company/lessons';
		method = 'POST';
		
		const classId = this.getNodeParameter('classId', i) as string;
		const date = this.getNodeParameter('date', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			classId,
			date,
			...additionalFields,
		};
	} else if (operation === 'update') {
		const lessonId = this.getNodeParameter('lessonId', i) as string;
		endpoint = `/v1/company/lessons/${lessonId}`;
		method = 'POST';
		
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		body = { ...additionalFields };
	} else if (operation === 'delete') {
		const lessonId = this.getNodeParameter('lessonId', i) as string;
		endpoint = `/v1/company/lessons/${lessonId}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

