import e from "express";
import dontenv from 'dotenv';
import http from 'http';
import { Server } from "socket.io";
import chat from "./chat.js";

dontenv.config();

const app = e();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(e.json());
app.get('/', (req, res) => {
  res.send('Servidor Funcionando');
})

chat(io)

server.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});