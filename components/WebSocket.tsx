"use client";

import { WebSocketContext } from "@/app/WebSocketContext";
import { useContext, useEffect, useState } from "react";

type MessagesPayload = {
	content: string;
	msg: string;
};
const WebSocket = () => {
	const socket = useContext(WebSocketContext);
	const [text, setText] = useState("");
	const [messages, setMessages] = useState<MessagesPayload[]>([]);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected");
		});

		socket.on("onMessage", (data: MessagesPayload) => {
			console.log(data.content);
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected");
		});

		return () => {
			socket.off("connect");
			socket.off("onMessage");
			socket.off("disconnect");
		};
	}, []);

	return (
		<div className="mt-[300px]">
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button
				onClick={() => {
					socket.emit("newMessage", text);
				}}
			>
				Отправить
			</button>
			{messages.map((messages, idx) => (
				<div key={idx}>
					<p>{messages.content}</p>
				</div>
			))}
		</div>
	);
};

export default WebSocket
