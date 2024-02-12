export const checkTouchScreen = () => {
	const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
	const hasTouchPoints =
		navigator.maxTouchPoints > 0 ||
		(navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

	return ("ontouchstart" in window || hasTouchPoints) && isCoarsePointer;
};
