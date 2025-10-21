import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function executeUserOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<{ endpoint: string; method: IHttpRequestMethods; body: IDataObject; qs: IDataObject; customAttributes?: any[] }> {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};
	let customAttributes: any[] | undefined;

	if (operation === 'getAll') {
		endpoint = '/v1/company/users';
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
		qs = { ...additionalFields };
	} else if (operation === 'get') {
		const userId = this.getNodeParameter('userId', i) as string;
		endpoint = `/v1/company/users/${userId}`;
	} else if (operation === 'find') {
		// Поиск ученика по телефону/имени/email
		endpoint = '/v1/company/users';
		const searchBy = this.getNodeParameter('searchBy', i) as string;
		let searchValue = this.getNodeParameter('searchValue', i) as string;

		// Нормализуем телефон если поиск по телефону
		// API требует: только цифры, БЕЗ +
		if (searchBy === 'phone') {
			searchValue = searchValue.replace(/[^\d]/g, '');
			
			// Если начинается с 8, заменяем на 7
			if (searchValue.startsWith('8') && searchValue.length === 11) {
				searchValue = '7' + searchValue.substring(1);
			}
			
			// Если нет 7 в начале и длина 10, добавляем 7
			if (!searchValue.startsWith('7') && searchValue.length === 10) {
				searchValue = '7' + searchValue;
			}
		}

		// Добавляем параметр поиска
		qs = {
			[searchBy]: searchValue,
			limit: 100,
		};
	} else if (operation === 'create') {
		endpoint = '/v1/company/users';
		method = 'POST';
		
		const name = this.getNodeParameter('name', i) as string;
		const email = this.getNodeParameter('email', i, '') as string;
		let phone = this.getNodeParameter('phone', i, '') as string;
		const birthdate = this.getNodeParameter('birthdate', i, '') as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		// Нормализуем телефон согласно требованиям API MoyKlass
		// API требует: только цифры, 10-15 символов, БЕЗ +
		// Пример: 79001234567 (11 цифр для России)
		if (phone) {
			// Убираем все кроме цифр
			phone = phone.replace(/[^\d]/g, '');
			
			// Если начинается с 8, заменяем на 7
			if (phone.startsWith('8') && phone.length === 11) {
				phone = '7' + phone.substring(1);
			}
			
			// Если нет 7 в начале и длина 10, добавляем 7
			if (!phone.startsWith('7') && phone.length === 10) {
				phone = '7' + phone;
			}
			
			// Проверяем длину (должно быть 10-15 цифр)
			if (phone.length < 10 || phone.length > 15) {
				throw new Error(`Phone number must be 10-15 digits. Got: ${phone} (${phone.length} digits)`);
			}
		}

		body = {
			name,
			...additionalFields,
		};
		
		if (email) body.email = email;
		if (phone) body.phone = phone;
		if (birthdate) body.birthdate = birthdate;

		// Получаем кастомные атрибуты
		const customAttrsData = this.getNodeParameter('customAttributes', i, {}) as IDataObject;
		if (customAttrsData.attributes && Array.isArray(customAttrsData.attributes)) {
			customAttributes = customAttrsData.attributes;
		}
	} else if (operation === 'update') {
		const userId = this.getNodeParameter('userId', i) as string;
		endpoint = `/v1/company/users/${userId}`;
		method = 'POST';
		
		const surname = this.getNodeParameter('surname', i, '') as string;
		const patronymic = this.getNodeParameter('patronymic', i, '') as string;
		const email = this.getNodeParameter('email', i, '') as string;
		const phone = this.getNodeParameter('phone', i, '') as string;
		const birthdate = this.getNodeParameter('birthdate', i, '') as string;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		body = { ...additionalFields };
		
		if (surname) body.surname = surname;
		if (patronymic) body.patronymic = patronymic;
		if (email) body.email = email;
		if (phone) body.phone = phone;
		if (birthdate) body.birthdate = birthdate;

		// Получаем кастомные атрибуты
		const customAttrsData = this.getNodeParameter('customAttributes', i, {}) as IDataObject;
		if (customAttrsData.attributes && Array.isArray(customAttrsData.attributes)) {
			customAttributes = customAttrsData.attributes;
		}
	} else if (operation === 'delete') {
		const userId = this.getNodeParameter('userId', i) as string;
		endpoint = `/v1/company/users/${userId}`;
		method = 'DELETE';
	} else if (operation === 'updateStatus') {
		const userId = this.getNodeParameter('userId', i) as string;
		const statusId = this.getNodeParameter('statusId', i) as string;
		const statusReasonId = this.getNodeParameter('statusReasonId', i, '') as string;
		
		endpoint = `/v1/company/users/${userId}/status`;
		method = 'POST';
		body = { statusId };
		
		if (statusReasonId) body.statusReasonId = statusReasonId;
	} else if (operation === 'getTags') {
		const userId = this.getNodeParameter('userId', i) as string;
		endpoint = `/v1/company/users/${userId}/tags`;
	} else if (operation === 'updateTags') {
		const userId = this.getNodeParameter('userId', i) as string;
		const tagIds = this.getNodeParameter('tagIds', i) as string;
		
		endpoint = `/v1/company/users/${userId}/tags`;
		method = 'POST';
		body = { 
			tags: tagIds.split(',').map((id) => id.trim()).filter((id) => id),
		};
	} else if (operation === 'updateAttribute') {
		const userId = this.getNodeParameter('userId', i) as string;
		const attrId = this.getNodeParameter('attrId', i) as string;
		const value = this.getNodeParameter('value', i) as string;
		
		endpoint = `/v1/company/users/${userId}/attribute/${attrId}`;
		method = 'POST';
		body = { value };
	}

	return { endpoint, method, body, qs, customAttributes };
}

