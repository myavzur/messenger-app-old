import { TypedUseSelectorHook, useSelector } from "react-redux";

import { IStoreState } from "@/app/store";

export const useStoreSelector: TypedUseSelectorHook<IStoreState> = useSelector;
