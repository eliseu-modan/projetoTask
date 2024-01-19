import { Layout } from "antd";

function PublicLayout({ route, ...props }) {
	return (
		<Layout>
			<div>{props.children}</div>
		</Layout>
	);
}

export default PublicLayout;
