import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

async function getToken(context: ILoadOptionsFunctions, apiKey: string, baseUrl: string): Promise<string> {
	const response = await context.helpers.request({
		method: 'POST',
		url: `${baseUrl}/v1/company/auth/getToken`,
		body: { apiKey },
		json: true,
	}) as any;

	if (!response?.accessToken) {
		throw new Error('Failed to obtain access token from MoyKlass API');
	}

	return response.accessToken;
}

export async function loadManagers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const managers = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/managers`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return managers.map((manager: any) => ({
		name: `${manager.name || ''} ${manager.surname || ''}`.trim(),
		value: manager.id,
	}));
}

export async function loadCourses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const courses = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/courses`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return courses.map((course: any) => ({
		name: course.name,
		value: course.id,
	}));
}

export async function loadClientStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const statuses = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/clientStatuses`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return statuses.map((status: any) => ({
		name: status.name,
		value: status.id,
	}));
}

export async function loadFilials(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const filials = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/filials`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return filials.map((filial: any) => ({
		name: filial.name,
		value: filial.id,
	}));
}

export async function loadAdvSources(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const sources = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/advSources`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return sources.map((source: any) => ({
		name: source.name,
		value: source.id,
	}));
}

export async function loadCreateSources(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const sources = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/createSources`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return sources.map((source: any) => ({
		name: source.name,
		value: source.id,
	}));
}

export async function loadPaymentTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const types = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/paymentTypes`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return types.map((type: any) => ({
		name: type.name,
		value: type.id,
	}));
}

export async function loadCashboxes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const cashboxes = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/cashboxes`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return cashboxes.map((cashbox: any) => ({
		name: cashbox.name,
		value: cashbox.id,
	}));
}

export async function loadUserAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const attributes = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/userAttributes`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return attributes.map((attr: any) => ({
		name: attr.name,
		value: attr.id.toString(),
	}));
}

export async function loadClassAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const attributes = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/classAttributes`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return attributes.map((attr: any) => ({
		name: attr.name,
		value: attr.id.toString(),
	}));
}

export async function loadUserTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('moyKlassApi');
	const apiKey = credentials.apiKey as string;
	const baseUrl = (credentials.baseUrl as string) || 'https://api.moyklass.com';
	
	const accessToken = await getToken(this, apiKey, baseUrl);
	
	const tags = await this.helpers.request({
		method: 'GET',
		url: `${baseUrl}/v1/company/userTags`,
		headers: {
			'x-access-token': accessToken,
		},
		json: true,
	}) as any[];

	return tags.map((tag: any) => ({
		name: tag.name,
		value: tag.id.toString(),
	}));
}

