import { Spin } from "antd";

import "./index.css";

function LoadingPage() {
	return (
		<div className="loading-page">
			<Spin size="large" />
		</div>
	);
}

export default LoadingPage;
