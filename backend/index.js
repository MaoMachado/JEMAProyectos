import e from "express";
import dontenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import chat from "./chat.js";

dontenv.config();

const app = e();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: 'https://jemaproyectos-front.onrender.com',
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: 'https://jemaproyectos-front.onrender.com' }));

io.on('connection', (socket) => {
  console.log('Nuevo Cliente')
})

app.use(e.json());

app.get('/', (req, res) => {
  res.send('Servidor Funcionando');
})

chat(io)

server.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});