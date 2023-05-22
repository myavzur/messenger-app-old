import { Anchor as MantineAnchor } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

import { AnchorProps } from "./Anchor.interface";

const Anchor: React.FC<AnchorProps> = ({ children, to }) => {
	return (
		<MantineAnchor
			color="red"
			to={to}
			component={Link}
		>
			{children}
		</MantineAnchor>
	);
};

export default Anchor;
