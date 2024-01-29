interface ICopyToClipboardParams {
	value: any;
	onCopy: (value: any) => void;
	onError?: (e: Error) => void;
	onCopyTimeout: () => void;
}

export const copyToClipboard = (params: ICopyToClipboardParams) => {
	const { value, onCopy, onError, onCopyTimeout } = params;

	navigator.clipboard
		.writeText(value)
		.then(() => onCopy(value))
		.catch(e => onError && onError(e));

	setTimeout(() => {
		onCopyTimeout();
	}, 2000);
};
