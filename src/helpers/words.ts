export const getWordByAmount = (amount: number, one: string, two: string, five: string): string => {
	const exceptionsCondition = [11, 12, 13].includes(amount);

	if (amount % 10 === 1 && !exceptionsCondition) return one;
	if ([2, 3, 4].includes(amount % 10) && !exceptionsCondition) return two;

	return five;
}