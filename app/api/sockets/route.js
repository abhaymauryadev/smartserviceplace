import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      socket.on("join-booking", (bookingId) => {
        socket.join(bookingId);
      });

      socket.on("booking-update", ({ bookingId, status }) => {
        io.to(bookingId).emit("booking-status", status);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
