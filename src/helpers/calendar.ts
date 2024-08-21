import type { ISelectedDates } from "@/interfaces/ISelectedDates";
import { addLeadingZeros } from '@/helpers/global';

/**
 * Получение дня недели текущей даты в виде числа (0-6).
 * 0 - Понедельник, 6 - Воскресенье.
 * 
 * @param {Date} date - Текущая дата. 
 * 
 * @returns {number} Возвращает номер дня недели.
 */
export const getDay = (date: Date): number => {
	const day: number = date.getDay();

	return day === 0 ? 6 : day - 1;
}

/**
 * Получение класса для стилизации дат, соответствующих выбранному периоду.
 * 
 * @param {Date} date - Текущая дата. 
 * @param {ISelectedDates[]} array - Массив выбранных пользователем дат.
 * 
 * @returns {string} Возвращает класс для стилизации периодов:
 * - "from": начало периода.
 * - "between": дата, включенная в период.
 * - "to": конец периода.
 * 
 * Если дата не входит в период, возвращается пустая строка.
 */
export const isInRange = (date: Date, array: ISelectedDates[]): string => {
	const currentDate: number = date.getTime();

	for (let { from, to } of array) {
		if (from && to) {
			const fromDate: number = from.getTime();
			const toDate: number = to.getTime();
			
			if (currentDate === fromDate && toDate) return "from";
			if (currentDate === toDate) return "to";
			if (fromDate < currentDate && currentDate < toDate) return "between";
		}
	}
	
	return "";
}

/**
 * Заполнение объекта периода в зависимости от сравнения дат.
 *  
 * @param {Date} date - Выбранная дата.
 * @param {ISelectedDates} element - Исходная дата в периоде, содержащая поле "from".
 * 
 * @returns {ISelectedDates} Возвращает новый объект "ISelectedDates", где:
 * - "from": более ранняя из двух дат (date и element.from).
 * - "to": более поздняя из двух дат.
 */
export const compareDates = (date: Date, element: ISelectedDates): ISelectedDates => {
	const date1: number = element.from.getTime();
	const date2: number = date.getTime();

	return (date1 < date2) ? { from: element.from, to: date } : { from: date, to: element.from };
}

/**
 * Получение строкового представления текущей даты.
 * 
 * @param {Date} date - Текущая дата. 
 * @returns {string} Возвращает строку в формате "01.01.2024".
 */
export const getFullDate = (date: Date): string => `${addLeadingZeros(date.getDate())}.${addLeadingZeros(date.getMonth() + 1)}.${date.getFullYear()}`;
