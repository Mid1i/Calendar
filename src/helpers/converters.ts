export const convertNumberToMonth = (month: number): string => {
	const months: Record<string, string> = {
		1: "Январь",
		2: "Февраль",
		3: "Март",
		4: "Апрель",
		5: "Май",
		6: "Июнь",
		7: "Июль",
		8: "Август",
		9: "Сентябрь",
		10: "Октябрь",
		11: "Ноябрь",
		12: "Декабрь",
	}

	return months[month];
}

export const convertDateToString = (date: Date): string => `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`;

export const convertStringToDate = (date: string | number): number => new Date(date).getTime();