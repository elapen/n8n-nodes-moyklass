import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MoyKlassApi implements ICredentialType {
	name = 'moyKlassApi';
	displayName = 'MoyKlass API';
	documentationUrl = 'https://api.moyklass.com/v1/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			placeholder: 'Oul76YVXXQnH3YWWidkDaHyoUBGHCOyOO0oky7y6T1EJBAWnEi',
			description: 'API ключ для доступа к MoyKlass API. Получить можно в CRM: Настройки → API',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.moyklass.com',
			required: false,
			description: 'Базовый URL API (оставьте по умолчанию)',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			baseURL: '={{$credentials?.baseUrl || "https://api.moyklass.com"}}',
			url: '/v1/company/auth/getToken',
			body: {
				apiKey: '={{$credentials.apiKey}}',
			},
		},
	};
}

