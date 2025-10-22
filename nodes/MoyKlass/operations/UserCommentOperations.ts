import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executeUserCommentOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'getAll') {
		endpoint = '/v1/company/userComments';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const commentId = this.getNodeParameter('commentId', i) as string;
		endpoint = `/v1/company/userComments/${commentId}`;
	} else if (operation === 'create') {
		endpoint = '/v1/company/userComments';
		method = 'POST';
		
		const userId = this.getNodeParameter('userId', i) as string;
		const comment = this.getNodeParameter('comment', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			userId,
			comment,
			...additionalFields,
		};
	} else if (operation === 'update') {
		const commentId = this.getNodeParameter('commentId', i) as string;
		endpoint = `/v1/company/userComments/${commentId}`;
		method = 'POST';
		
		const comment = this.getNodeParameter('comment', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = {
			comment,
			...additionalFields,
		};
	} else if (operation === 'delete') {
		const commentId = this.getNodeParameter('commentId', i) as string;
		endpoint = `/v1/company/userComments/${commentId}`;
		method = 'DELETE';
	}

	return { endpoint, method, body, qs };
}

