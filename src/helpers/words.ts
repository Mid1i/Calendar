export const getWordByAmount = (amount: number, one: string, two: string, five: string): string => {
	const exceptionsCondition = amount === 11 || amount === 12 || amount === 13;

	const lastDigit = amount % 10;

	if (lastDigit === 1 && !exceptionsCondition) return one;
	if ((lastDigit === 2 || lastDigit === 3 || lastDigit === 4) && !exceptionsCondition) return two;

	return five;
}