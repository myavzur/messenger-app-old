export interface IDropzoneProps {
	label?: string;
	caption?: string;
	iconElement?: React.ReactNode;
	onDrop: (files: File[]) => void;
}
