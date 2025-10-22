import { IExecuteFunctions } from 'n8n-workflow';

interface AttributeInfo {
	id: number;
	name: string;
	type: string;
	// API MoyKlass возвращает "variants" для select/multiselect атрибутов
	variants?: Array<{
		id: number;
		name: string;
	}>;
	values?: Array<{
		id: number;
		name: string;
	}>;
	selectOptions?: Array<{
		id: number;
		name: string;
	}>;
	options?: Array<{
		id: number;
		name: string;
	}>;
}

/**
 * Получить информацию об атрибуте
 */
async function getAttributeInfo(
	context: IExecuteFunctions,
	accessToken: string,
	baseUrl: string,
	attributeId: string,
): Promise<AttributeInfo | null> {
	try {
		// Получаем список всех атрибутов
		const attributes = await context.helpers.request({
			method: 'GET',
			url: `${baseUrl}/v1/company/userAttributes`,
			headers: {
				'x-access-token': accessToken,
			},
			json: true,
		}) as any[];

		// Находим нужный атрибут
		const attr = attributes.find((a: any) => a.id.toString() === attributeId.toString());
		
		return attr || null;
	} catch (error) {
		return null;
	}
}

/**
 * Нормализовать значение атрибута согласно его типу
 */
export async function normalizeAttributeValue(
	context: IExecuteFunctions,
	accessToken: string,
	baseUrl: string,
	attributeId: string,
	value: string,
): Promise<any> {
	// Получаем информацию об атрибуте
	const attrInfo = await getAttributeInfo(context, accessToken, baseUrl, attributeId);
	
	if (!attrInfo) {
		// Если не смогли получить инфо - отправляем как есть
		return { value };
	}

	const attrType = attrInfo.type;

	// Получаем список значений (может быть в разных полях)
	// API MoyKlass возвращает "variants" для select/multiselect атрибутов
	const valuesList = attrInfo.variants || attrInfo.values || attrInfo.selectOptions || attrInfo.options || [];

	// Обработка в зависимости от типа атрибута
	switch (attrType) {
		case 'select':
			// Для select нужно найти valueId по имени
			if (valuesList.length > 0) {
				// Ищем точное совпадение (case-insensitive)
				let match = valuesList.find(
					(v: any) => v.name.toLowerCase().trim() === value.toLowerCase().trim()
				);

				// Если не нашли точное совпадение, ищем частичное
				if (!match) {
					match = valuesList.find(
						(v: any) => v.name.toLowerCase().includes(value.toLowerCase().trim()) ||
						            value.toLowerCase().includes(v.name.toLowerCase())
					);
				}

				if (match) {
					// Для select API ожидает только valueId (attributeId уже в URL)
					return {
						valueId: match.id,
					};
				} else {
					// Если не нашли совпадение, пропускаем этот атрибут
					// Value not found in select options
					return null;
				}
			}
			return { value };

		case 'multiselect':
			// Для multiselect нужно массив valueIds
			if (valuesList.length > 0) {
				// Разделяем значения по запятой
				const inputValues = value.split(',').map(v => v.trim());
				const valueIds: number[] = [];

				for (const inputValue of inputValues) {
					// Ищем точное совпадение
					let match = valuesList.find(
						(v: any) => v.name.toLowerCase().trim() === inputValue.toLowerCase().trim()
					);

					// Если не нашли точное, ищем частичное
					if (!match) {
						match = valuesList.find(
							(v: any) => v.name.toLowerCase().includes(inputValue.toLowerCase()) ||
							            inputValue.toLowerCase().includes(v.name.toLowerCase())
						);
					}

					if (match) {
						valueIds.push(match.id);
					}
				}

				if (valueIds.length > 0) {
					// Для multiselect API ожидает только valueIds (attributeId уже в URL)
					return {
						valueIds: valueIds,
					};
				} else {
					// No matching values found for multiselect
					return null;
				}
			}
			return { value };

		case 'boolean':
			// Для boolean конвертируем в true/false
			const boolValue = ['true', '1', 'yes', 'да'].includes(value.toLowerCase());
			return { value: boolValue };

		case 'phone':
			// Нормализуем телефон
			let phoneValue = value.replace(/[^\d]/g, '');
			if (phoneValue.startsWith('8') && phoneValue.length === 11) {
				phoneValue = '7' + phoneValue.substring(1);
			}
			if (!phoneValue.startsWith('7') && phoneValue.length === 10) {
				phoneValue = '7' + phoneValue;
			}
			return { value: phoneValue };

		case 'email':
			return { value: value.trim().toLowerCase() };

		case 'number':
		case 'discount':
			// Для числовых полей конвертируем в число
			const numValue = parseFloat(value);
			if (!isNaN(numValue)) {
				return { value: numValue };
			}
			return { value: value };

		default:
			// Для текстовых и остальных полей - как есть
			return { value: value };
	}
}

