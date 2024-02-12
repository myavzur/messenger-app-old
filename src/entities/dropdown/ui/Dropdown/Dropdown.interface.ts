type PosY = "top" | "bottom";
type PosX = "start" | "end";

export interface IDropdownProps {
	position: `${PosY}-${PosX}`;
	spacingFromContainerPx?: number;
	containerElementRef: React.RefObject<HTMLElement>;
	onMouseOut?: React.MouseEventHandler<HTMLDivElement>;
	children: React.ReactNode;
}
