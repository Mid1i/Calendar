export type TypeActions = "oneDate" | "severalDates" | "onePeriod" | "severalPeriods";


export interface ISelectedDates {
	from: string,
	to?: string
}