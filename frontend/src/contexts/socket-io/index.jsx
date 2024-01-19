/**
 *
 * SocketIO Context
 *
 */

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext({});

function SocketProvider(props) {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io("http://localhost:4001", {
			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
		});
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>
			{props.children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	return useContext(SocketContext);
}

export default SocketProvider;
