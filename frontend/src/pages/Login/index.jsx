import { Card } from "antd";
import { LoginForm } from "../../components/Login";

import Logo from "../../assets/images/icon.png";
import Task from "../../assets/images/task.jpg";

import "./index.css";

const Login = () => {
	return (
		<div className="login-container">
			<div className="text-center" style={{ lineHeight: "150px" }}>
				<img
					src={Task}
					alt="Task"
					style={{
						maxWidth: "100%",
						maxHeight: "10%",
						position: "relative",
						opacity: "63.4%",
					}}
				/>
				<Card
					className="login-card"
					style={{
						width: "30%",
						height: "35%",
						top: "40%",
						position: "absolute",
						left: "34%",
						opacity: "85%",
					}}
				>
					<h3>Login - Task </h3>
					<LoginForm />
				</Card>
			</div>
		</div>
	);
};

export default Login;
