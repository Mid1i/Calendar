import type { TypeActions } from "@/types/TypeActions";


export const addLeadingZeros = (date: number): string => String(date).padStart(2, "0");

export const isPeriodAction = (action: TypeActions): boolean => action === "ONE_PERIOD" || action === "SEVERAL_PERIODS";
