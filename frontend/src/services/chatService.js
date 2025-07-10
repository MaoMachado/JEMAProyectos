import { io } from 'socket.io-client';

let socketCliente = null;
let socketAdmin = null;

export const getSocketCliente = () => {
  if (!socketCliente) {
    socketCliente = io('http://localhost:4000', {
      query: { tipo: 'cliente' }
    })
  }

  return socketCliente;
}

export const getSocketAdmin = () => {
  if (!socketAdmin) {
    socketAdmin = io('http://localhost:4000', {
      query: { tipo: 'admin' }
    })
  }

  return socketAdmin;
}
