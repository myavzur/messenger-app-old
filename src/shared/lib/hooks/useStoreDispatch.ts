import { useDispatch } from "react-redux";

import { IStoreDispatch } from "@/app/store";

export const useStoreDispatch = () => useDispatch<IStoreDispatch>();
