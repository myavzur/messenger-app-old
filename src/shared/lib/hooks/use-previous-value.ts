import { useLayoutEffect, useRef } from "react";

export const usePreviousValue = (value: unknown) => {
	const valueRef = useRef(value);

	useLayoutEffect(() => {
		valueRef.current = value;
	});

	return valueRef.current;
};
