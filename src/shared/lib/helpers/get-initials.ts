/**
 * @default length - 2
 * @example
 * getInitials("Designers Chat", 2) // "DC"
 * getInitials("myavzur", 2) // "MY"
 * getInitials("Frustrated Deers and Evenings", 2) // "FD"
 * getInitials("Frustrated Deers and Evenings", 3) // "FDA"
 */
export const getInitials = (sentence: string, length = 2): string => {
	const words = sentence.split(" ").slice(0, length);

	// For only one word - create initials from first letters.
	if (words.length === 1) {
		return words[0].slice(0, length).toUpperCase();
	}

	return words.map(word => word[0].toUpperCase()).join("");
};
