/**
 * @example
 * getFirstLetters("Designers Chat") // "DC"
 * getFirstLetters("myavzur") // "M"
 * getFirstLetters("Frustrated Deers and Evenings") // "FD"
 */
export const getFirstLetters = (sentence?: string) =>
	sentence
		? sentence
				.split(" ")
				.slice(0, 2)
				.map(word => word.slice(0, 1).toUpperCase())
				.join("")
		: null;
