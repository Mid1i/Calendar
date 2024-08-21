import type { TypeActions } from "@/types/TypeActions";


/**
 * Добавление ведущих нулей к числу, состоящего из одной цифры, чтобы привести его к двухзначному формату.
 * 
 * @param {number} date - Текущий месяц или число. 
 * 
 * @returns {string} Строка, представляющая число в двухзначном формате.
 */
export const addLeadingZeros = (date: number): string => String(date).padStart(2, "0");

/**
 * Проверка, является ли текущий режим календаря периодом или нет.
 * 
 * @param {TypeActions} action - Текущий режим календаря. 
 * 
 * @returns {boolean} True, если режим содержит периоды; в противном случае, false.
 */
export const isPeriodAction = (action: TypeActions): boolean => action === "ONE_PERIOD" || action === "SEVERAL_PERIODS";
