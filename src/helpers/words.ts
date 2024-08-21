/**
 * Получение правильной формы слова в зависимости от количества.
 * 
 * @param {number} amount - Количество, на основе которого выбирается форма слова.
 * @param {number} one - Форма слова, используемая с числом 1 (например, день).
 * @param {number} two - Форма слова, используемая с числами 2, 3, 4 (например, дня).
 * @param {number} five Форма слова, используемая с числами 5 и более (например, дней).
 * 
 * @returns {string} Правильная форма слова в зависимости от количества.
 */
export const getWordByAmount = (amount: number, one: string, two: string, five: string): string => {
	const exceptionsCondition: boolean = amount === 11 || amount === 12 || amount === 13;

	const lastDigit: number = amount % 10;

	if (lastDigit === 1 && !exceptionsCondition) return one;
	if ((lastDigit === 2 || lastDigit === 3 || lastDigit === 4) && !exceptionsCondition) return two;

	return five;
}