import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	// Reinitialize timeout on value change to debounce the change of value.
	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return debouncedValue;
};
