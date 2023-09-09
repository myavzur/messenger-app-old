export const getElementFromArrayByStringHash = <T>(array: T[], str: string) => {
	const generateHash = (str: string) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
		}
		return hash;
	};

	const hashedStr = generateHash(str);
	const index = Math.abs(hashedStr % array.length);

	return array[index];
};
