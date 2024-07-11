export interface IDay {
	date: string,
	isMuted: boolean,
	isToday: boolean
}

export type TypeActions = "oneDate" | "severalDates" | "onePeriod" | "severalPeriods";