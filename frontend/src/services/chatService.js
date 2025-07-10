import { io } from 'socket.io-client';

let socketCliente = null;
let socketAdmin = null;

export const getSocketCliente = () => {
  if (!socketCliente) {
    socketCliente = io(import.meta.env.VITE_SOCKET_URL, {
      query: { tipo: 'cliente' }
    })
  }

  return socketCliente;
}

export const getSocketAdmin = () => {
  if (!socketAdmin) {
    socketAdmin = io(import.meta.env.VITE_SOCKET_URL, {
      query: { tipo: 'admin' }
    })
  }

  return socketAdmin;
}

