import {io} from "socket.io-client"

export const socket = io("http://localhost:8000", {
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket"], 
})

// Add error handling
socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
});