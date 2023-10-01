export interface IAvatarProps {
	children: string;
	src?: string;
	alt?: string;
	className?: string;
	size?: "xs" | "sm" | "base";
	status?: 0 | 1 | null;
}
