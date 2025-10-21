import { IExecuteFunctions } from 'n8n-workflow';

interface TokenCache {
	token: string;
	expiresAt: number;
}

const tokenCache = new Map<string, TokenCache>();

export async function getAccessToken(
	this: IExecuteFunctions,
	apiKey: string,
	baseUrl: string = 'https://api.moyklass.com',
): Promise<string> {
	// Проверяем кеш
	const cacheKey = `${apiKey}_${baseUrl}`;
	const cached = tokenCache.get(cacheKey);
	
	if (cached && cached.expiresAt > Date.now()) {
		return cached.token;
	}

	// Получаем новый токен
	try {
		const response = await this.helpers.request({
			method: 'POST',
			url: `${baseUrl}/v1/company/auth/getToken`,
			body: { apiKey },
			json: true,
		}) as any;

		if (!response?.accessToken) {
			throw new Error('Failed to obtain access token from MoyKlass API');
		}

		// Кешируем токен (на 6 дней, хотя живет 7)
		const expiresAt = Date.now() + (6 * 24 * 60 * 60 * 1000);
		tokenCache.set(cacheKey, {
			token: response.accessToken,
			expiresAt,
		});

		return response.accessToken;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		throw new Error(`Failed to authenticate with MoyKlass API: ${errorMessage}`);
	}
}

export async function revokeAccessToken(
	this: IExecuteFunctions,
	accessToken: string,
	baseUrl: string = 'https://api.moyklass.com',
): Promise<void> {
	try {
		await this.helpers.request({
			method: 'POST',
			url: `${baseUrl}/v1/company/auth/revokeToken`,
			headers: {
				'x-access-token': accessToken,
			},
		});
	} catch (error) {
		// Игнорируем ошибки при удалении токена
		// (no action needed)
	}
}

