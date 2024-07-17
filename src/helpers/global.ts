export const getLastElement = <T>(array: T[]): T => array[array.length - 1]; 

export const addLeadingZeros = (date: number): string => String(date).padStart(2, "0");
