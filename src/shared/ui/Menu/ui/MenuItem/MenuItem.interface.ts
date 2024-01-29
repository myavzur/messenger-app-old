export interface IMenuItemProps {
	iconElement: React.ReactNode;
	label: string;
	onClick?: () => void;
	isDangerous?: boolean;
}
