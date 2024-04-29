import { IAttachment } from "@/entities/attachment/interfaces";

export interface ISliderSlideProps {
	defaultAvatarText?: string;
	contentType: "image" | "default-avatar";
	onImageError?: () => void;
	attachment?: IAttachment;
	isActive?: boolean;
	width: number;
	height: number;
}
