import {Server} from "socket.io";

let io;

export function initSocket(server){
    if (io) return io;

    io = new Server(server, {
        path: "/api/socket",
        cors:{
            origin: "*",

        },

    });

    io.on("connection", (socket)=>{
        console.log("Socket connected:", socket.id);

        socket.on("disconnect", ()=>{
            console.log("Socket disconnected:", socket.id);
        });

        socket.on("join", (room)=>{
            socket.join(room);
            console.log("Socket joined room:", room);
        }); 

        socket.on("leave", (room)=>{
            socket.leave(room);
            console.log("Socket left room:", room);
        });

        socket.on("booking-update", ({bookingId, status})=>{
            io.to(bookingId).emit("booking-status", status);
        })
    })  

    return io;
}