import { useCallback, useEffect, useRef, useState } from "react";

import { getAccessToken } from "../helpers";

import {
	IUseUploadFileParams,
	IUseUploadFileResult,
	IUseUploadFileState
} from "./use-upload-file.interface";

const UPLOADS_SERVER_URL = import.meta.env.VITE_UPLOADS_SERVER_URL;

export const useUploadFile = <ResponseType extends object>(
	params: IUseUploadFileParams
): IUseUploadFileResult<ResponseType> => {
	const xhrRef = useRef<XMLHttpRequest | null>(null);

	const [state, setState] = useState<IUseUploadFileState<ResponseType>>({
		progress: 0,
		data: null,
		status: "idle",
		errorText: null
	});

	const upload = useCallback(async (file: File, url: string) => {
		setState({
			progress: 0,
			data: null,
			status: "loading",
			errorText: null
		});

		return new Promise((resolve, reject) => {
			xhrRef.current = new XMLHttpRequest();
			xhrRef.current.upload.addEventListener("progress", e => {
				if (!e.lengthComputable) return;
				setState(state => ({
					...state,
					progress: Math.round((e.loaded / e.total) * 100)
				}));
			});

			xhrRef.current.addEventListener("load", () => {
				if (!xhrRef.current) return;

				if (xhrRef.current.status >= 200 && xhrRef.current.status < 300) {
					const data = JSON.parse(xhrRef.current.response);
					setState({
						data,
						progress: 100,
						status: "success",
						errorText: null
					});
					resolve(data);
					params.onLoadEnded?.(data);
					return;
				}

				setState({
					data: null,
					errorText: xhrRef.current.responseText,
					progress: 0,
					status: "error"
				});
				reject(xhrRef.current.responseText);
			});

			xhrRef.current.addEventListener("error", () => {
				if (!xhrRef.current) return;

				setState({
					data: null,
					errorText: xhrRef.current.statusText,
					status: "error",
					progress: 0
				});
				reject(xhrRef.current.statusText);
			});

			const formData = new FormData();
			formData.set("file", file);

			xhrRef.current.open("POST", UPLOADS_SERVER_URL + url);
			xhrRef.current.setRequestHeader("Authorization", `Bearer ${getAccessToken()}`);
			xhrRef.current.send(formData);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const abort = useCallback(() => {
		xhrRef.current?.abort();
	}, []);

	useEffect(() => {
		if (params.uploadOnMount && params.file) {
			upload(params.file, params.url);
			return;
		}

		return () => {
			abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.url]);

	return [state, upload, abort];
};
