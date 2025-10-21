import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MoyKlassApi implements ICredentialType {
	name = 'moyKlassApi';
	displayName = 'MoyKlass API';
	documentationUrl = 'https://api.moyklass.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API ключ для доступа к MoyKlass API. Получить можно в настройках CRM.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.moyklass.com',
			url: '/v1/company/managers',
			method: 'GET',
		},
	};
}

