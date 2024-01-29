import { useCallback, useEffect, useRef, useState } from "react";

interface IUseScrollButtonParams {
	appearsAfterScrolledPixels: number;
}

interface IUseScrollButtonResult {
	windowRef: any;
	isFocusing: boolean;
	isButtonVisible: boolean;
	scrollWindow: (behavior: "smooth" | "auto") => void;
}

export const useScrollButton = ({
	appearsAfterScrolledPixels
}: IUseScrollButtonParams): IUseScrollButtonResult => {
	const windowRef = useRef<HTMLElement | null>(null);
	const isFocusingRef = useRef<boolean>(false);

	const [isButtonVisible, setButtonVisible] = useState(false);

	const changeVisibility = () => {
		const windowElement = windowRef.current;

		if (windowElement) {
			const scrolledFromBottom =
				windowElement.scrollHeight -
				(windowElement.scrollTop + windowElement.offsetHeight);

			if (scrolledFromBottom > appearsAfterScrolledPixels) {
				setButtonVisible(true);
			} else {
				setButtonVisible(false);
			}
		}
	};

	const focus = () => {
		isFocusingRef.current = true;
	};

	const blur = () => {
		isFocusingRef.current = false;
	};

	const scrollWindow = useCallback((behavior: "smooth" | "auto" = "smooth") => {
		if (windowRef.current) {
			windowRef.current.scrollTo({
				top: windowRef.current.scrollHeight,
				behavior
			});

			setButtonVisible(false);
		}
	}, []);

	useEffect(() => {
		const windowElement = windowRef?.current;

		if (windowElement) {
			changeVisibility();

			windowElement.addEventListener("scroll", changeVisibility);
			windowElement.addEventListener("touchmove", changeVisibility);
			windowElement.addEventListener("mouseenter", focus);
			windowElement.addEventListener("mouseleave", blur);

			return () => {
				windowElement.removeEventListener("scroll", changeVisibility);
				windowElement.removeEventListener("touchmove", changeVisibility);
				windowElement.removeEventListener("mouseenter", focus);
				windowElement.removeEventListener("mouseleave", blur);
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		windowRef,
		isFocusing: isFocusingRef.current,
		isButtonVisible,
		scrollWindow
	};
};
