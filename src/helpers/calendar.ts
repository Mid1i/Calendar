export const getMonth = (month: number): string => {
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


export const getDay = (date: Date): number => {
	const day: number = date.getDay();

	return day === 0 ? 6 : day - 1;
}