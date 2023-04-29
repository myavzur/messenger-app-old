import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles(theme => ({
	svg: {
		width: "50px",
		height: "50px"
	},
	svg__background: {
		// fill: theme.colorScheme === "dark" ? "none" : theme.colors.dark[7]
	},
	svg__shape: {
		fill: theme.colors.red[5]
	}
}));

// TODO: Sizes
const Logo: React.FC = () => {
	const { classes } = useStyles();

	return (
		<svg
			className={classes.svg}
			viewBox="0 0 88 82"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g className={classes.svg__background}>
				<path d="M67.7224 46.834L39.9705 23.3304C38.3511 21.9588 35.5076 22.6543 33.6194 24.8838L16.7455 44.8077C14.8574 47.0371 14.6395 49.9563 16.2589 51.3278L44.0109 74.8315C45.6303 76.203 48.4737 75.5075 50.3619 73.278L67.2358 53.3541C69.124 51.1247 69.3418 48.2055 67.7224 46.834Z" />
				<path d="M67.7709 31.2188L23.6441 11.8249C21.0692 10.6932 18.0267 11.9488 16.8486 14.6294L6.31994 38.585C5.1418 41.2656 6.27413 44.3561 8.84905 45.4878L52.9759 64.8818C55.5508 66.0135 58.5932 64.7578 59.7714 62.0772L70.3 38.1216C71.4781 35.441 70.3458 32.3505 67.7709 31.2188Z" />
				<path d="M43.5043 64.9326L82.0151 43.1664C84.468 41.7801 85.3252 38.6549 83.9299 36.1861L71.4601 14.1234C70.0648 11.6546 66.9452 10.7771 64.4923 12.1635L25.9816 33.9297C23.5287 35.316 22.6714 38.4412 24.0668 40.91L36.5365 62.9727C37.9319 65.4415 41.0515 66.3189 43.5043 64.9326Z" />
			</g>

			<g className={classes["svg__shape"]}>
				<path d="M74.1005 8.16199C72.8902 5.25747 69.3299 4.17957 66.7117 5.925L47.7732 18.5506C46.0938 19.6703 43.9058 19.6703 42.2263 18.5507L23.2867 5.92493C20.6684 4.17955 17.1081 5.25757 15.8979 8.16217L3.34013 38.3007C2.53485 40.2334 3.01901 42.4632 4.55332 43.8878L41.5976 78.285C43.516 80.0663 46.4836 80.0663 48.402 78.285L85.4466 43.8879C86.9809 42.4632 87.4651 40.2334 86.6597 38.3006L74.1005 8.16199ZM11.2958 42.4211C9.76156 40.9963 9.27756 38.7664 10.083 36.8338L18.4805 16.6855C19.6911 13.781 23.2514 12.7033 25.8695 14.4489L42.2263 25.3548C43.9058 26.4746 46.0939 26.4747 47.7735 25.355L64.1298 14.4509C66.7478 12.7056 70.3079 13.7833 71.5185 16.6876L79.9176 36.8387C80.7232 38.7715 80.2391 41.0016 78.7045 42.4264L48.4022 70.5618C46.4837 72.3431 43.516 72.343 41.5977 70.5615L11.2958 42.4211Z" />
				<path d="M50.2118 36.4914C49.3374 36.6735 49.1222 37.8234 49.8716 38.3094L57.1075 43.0025C57.4663 43.2353 57.9334 43.2141 58.2696 42.9498L69.0026 34.5146C69.8335 33.8616 69.2154 32.5339 68.1808 32.7494L50.2118 36.4914Z" />
				<path d="M21.8176 32.7493C20.783 32.5339 20.1649 33.8616 20.9959 34.5146L31.7303 42.9499C32.0665 43.2141 32.5335 43.2353 32.8923 43.0026L40.1289 38.3094C40.8783 37.8234 40.6631 36.6735 39.7887 36.4914L21.8176 32.7493Z" />
				<path d="M42.1539 51.7262C43.5945 53.712 46.5542 53.7119 47.9946 51.726C49.7246 49.3409 48.0206 46 45.0742 46C42.1276 46 40.4237 49.3411 42.1539 51.7262Z" />
			</g>
		</svg>
	);
};

export default Logo;