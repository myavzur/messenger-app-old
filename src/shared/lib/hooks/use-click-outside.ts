import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface IUseClickOutsideParams {
	initialVisible?: boolean;
	onUnmount?: () => void;
}

type IUseClickOutsideResult<T extends HTMLElement> = [
	ref: React.RefObject<T>,
	isVisible: boolean,
	setVisible: Dispatch<SetStateAction<boolean>>
];

export const useClickOutside = <T extends HTMLElement>(
	params?: IUseClickOutsideParams
): IUseClickOutsideResult<T> => {
	const [isVisible, setVisible] = useState(params?.initialVisible || false);
	const ref = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setVisible(false);

				if (params?.onUnmount) {
					params.onUnmount();
				}
			}
		};

		document.addEventListener("click", handleClickOutside, true);
		document.addEventListener("contextmenu", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
			document.removeEventListener("contextmenu", handleClickOutside, true);
		};
	}, [params]);

	return [ref, isVisible, setVisible];
};
