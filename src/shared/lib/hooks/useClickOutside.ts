import {
	Dispatch,
	LegacyRef,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from "react";

interface IUseClickOutsideParams {
	initialVisible?: boolean;
	onUnmount?: () => void;
}

type IUseClickOutsideResult = [
	ref: LegacyRef<HTMLDivElement>,
	isVisible: boolean,
	setVisible: Dispatch<SetStateAction<boolean>>
];

export const useClickOutside = (
	params?: IUseClickOutsideParams
): IUseClickOutsideResult => {
	const [isVisible, setVisible] = useState(params?.initialVisible || false);
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setVisible(false);

			if (params?.onUnmount) {
				params.onUnmount();
			}
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return [ref, isVisible, setVisible];
};
