import type { ISelectedDates } from "@/interfaces/IDay";
import { convertStringToDate } from "@/helpers/converters";


export const getDay = (date: Date): number => {
	const day = date.getDay();

	return day === 0 ? 6 : day - 1;
}

export const isInRange = (date: string, array: ISelectedDates[]): string => {
	const currentDate = convertStringToDate(date);

	for (let { from, to } of array) {
		if (from && to) {
			const fromDate = convertStringToDate(from);
			const toDate = convertStringToDate(to);
			
			if (currentDate === fromDate && toDate) return "from";
			if (currentDate === toDate) return "to";
			if (fromDate < currentDate && currentDate < toDate) return "between";
		}
	}
	
	return "";
}

export const compareDates = (date: string, element: ISelectedDates): ISelectedDates => {
	const date1 = convertStringToDate(element.from);
	const date2 = convertStringToDate(date);

	return (date1 < date2) ? { from: element.from, to: date } : { from: date, to: element.from };
}
