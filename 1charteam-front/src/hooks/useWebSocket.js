import { useEffect, useRef, useState } from "react";

export function useWebSocket(onMessage) {
    const ws = useRef(null); //aguarda conexão websocket sem causar re-render
    const [connected, setConnected] = useState(false);
    const onMessageRef = useRef(onMessage);

    useEffect(()=> {
        console.log("Criando conexão WebSocket...");
        onMessageRef.current = onMessage;
    }, [onMessage]);

    useEffect(()=> {
        const socket = new WebSocket("ws://localhost:8080/ws");
        ws.current = socket;

        socket.onopen = () => {
            console.log("Conectado!");
            setConnected(true);
        };

        socket.onmessage = (event) => {
            console.log("Mensagem bruta recebida:", event.data);
            const data = JSON.parse(event.data);
            console.log("Mensagem parseada:", data);
            onMessage(data);
        };

        socket.onclose = () => {
            console.log("Desconectado!");
            setConnected(false);
        };

        return () => {
            console.log("Limpando conexão...");
            socket.close();
        };
    }, []);

    const sendMessage = (msg) => {
        console.log("readyState:", ws.current?.readyState);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(msg));
        }
    };

    return { sendMessage, connected };
}