export interface IModalProps {
	onClose: () => void;
	headerElement?: React.ReactNode;
	children: React.ReactNode;
	footerElement?: React.ReactNode;
}
