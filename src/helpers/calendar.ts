import type { ISelectedDates } from "@/interfaces/ISelectedDates";
import { addLeadingZeros } from '@/helpers/global';


export const getDay = (date: Date): number => {
	const day = date.getDay();

	return day === 0 ? 6 : day - 1;
}

export const isInRange = (date: Date, array: ISelectedDates[]): string => {
	const currentDate = date.getTime();

	for (let { from, to } of array) {
		if (from && to) {
			const fromDate = from.getTime();
			const toDate = to.getTime();
			
			if (currentDate === fromDate && toDate) return "from";
			if (currentDate === toDate) return "to";
			if (fromDate < currentDate && currentDate < toDate) return "between";
		}
	}
	
	return "";
}

export const compareDates = (date: Date, element: ISelectedDates): ISelectedDates => {
	const date1 = element.from.getTime();
	const date2 = date.getTime();

	return (date1 < date2) ? { from: element.from, to: date } : { from: date, to: element.from };
}

export const getFullDate = (date: Date): string => `${addLeadingZeros(date.getDate())}.${addLeadingZeros(date.getMonth() + 1)}.${date.getFullYear()}`;
