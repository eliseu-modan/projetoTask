import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { PrivateSider, PrivateHeader } from "./components";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

function PrivateLayout({ route, ...props }) {
	const { page } = route;
	const location = useLocation();

	const [isCollapsed, setIsCollapsed] = useState(true);

	useEffect(() => {
		setIsCollapsed(true);
	}, [location]);

	function toggleCollapsed() {
		setIsCollapsed(!isCollapsed);
	}

	function onCollapse() {
		setIsCollapsed(!isCollapsed);
	}

	return (
		<Layout className="layout-container private-container">
			<Layout
				className={`layout-main layout-${page?.title.toLowerCase()}`}
			>
				<PrivateHeader
					route={route}
					isCollapsed={isCollapsed}
					toggleCollapsed={toggleCollapsed}
				/>
				<Content
					id="layout-main-content"
					className="layout-content layout-content-height"
					style={route.layoutContentStyle}
				>
					{props.children}
				</Content>
			</Layout>
			<PrivateSider
				onCollapse={onCollapse}
				collapsed={isCollapsed}
				toggleCollapsed={toggleCollapsed}
			/>
		</Layout>
	);
}

export default PrivateLayout;
