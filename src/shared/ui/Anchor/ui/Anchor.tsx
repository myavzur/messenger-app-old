import React from "react";
import { Anchor as MantineAnchor } from "@mantine/core";


import { AnchorProps } from "./Anchor.interface";
import { Link } from "react-router-dom";

const Anchor: React.FC<AnchorProps> = ({ children, to }) => {
	return (
		<MantineAnchor color="red" to={to} component={Link}>{children}</MantineAnchor>
	);
};

export default Anchor;