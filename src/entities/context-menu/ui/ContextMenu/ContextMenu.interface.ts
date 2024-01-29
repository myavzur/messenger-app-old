import { IMenuProps } from "@/shared/ui";

export interface IContextMenuProps extends IMenuProps {
	mousePosition: { x: number; y: number };
	containerElementRef: React.RefObject<HTMLDivElement>;
	onClose: () => void;
}
