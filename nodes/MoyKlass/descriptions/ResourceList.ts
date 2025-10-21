import { INodeProperties } from 'n8n-workflow';

export const resourceList: INodeProperties = {
	displayName: 'Ресурс',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'User (Ученик)',
			value: 'user',
		},
		{
			name: 'Payment (Платеж)',
			value: 'payment',
		},
		{
			name: 'Invoice (Счет)',
			value: 'invoice',
		},
		{
			name: 'Manager (Сотрудник)',
			value: 'manager',
		},
		{
			name: 'Lesson (Урок)',
			value: 'lesson',
		},
		{
			name: 'Class (Группа)',
			value: 'class',
		},
		{
			name: 'Join (Запись в группу)',
			value: 'join',
		},
		{
			name: 'Task (Задача)',
			value: 'task',
		},
		{
			name: 'File (Файл)',
			value: 'file',
		},
		{
			name: 'Subscription (Вид абонемента)',
			value: 'subscription',
		},
		{
			name: 'User Subscription (Абонемент ученика)',
			value: 'userSubscription',
		},
		{
			name: 'Comment (Комментарий)',
			value: 'comment',
		},
		{
			name: 'Cashbox (Касса)',
			value: 'cashbox',
		},
		{
			name: 'Bonus Program (Бонусная программа)',
			value: 'bonusProgram',
		},
		{
			name: 'Family (Семья)',
			value: 'family',
		},
		{
			name: 'Company (Компания)',
			value: 'company',
		},
		{
			name: 'Room (Помещение)',
			value: 'room',
		},
		{
			name: 'Lesson Record (Отметка о посещении)',
			value: 'lessonRecord',
		},
		{
			name: 'Contract (Договор)',
			value: 'contract',
		},
		{
			name: 'Rate (Тариф)',
			value: 'rate',
		},
		{
			name: 'Task Category (Категория задач)',
			value: 'taskCategory',
		},
		{
			name: 'Subscription Grouping (Группировка абонементов)',
			value: 'subscriptionGrouping',
		},
		{
			name: 'Class Attribute (Атрибут группы)',
			value: 'classAttribute',
		},
		{
			name: 'Busy Time (Занятое время)',
			value: 'busyTime',
		},
	],
	default: 'user',
};

