export default function (io) {
  const salas = new Map();
  const nombres = new Map();
  const admins = new Set();

  io.on('connection', (socket) => {
    const tipo = socket.handshake.query.tipo;

    if (tipo === 'admin') {
      // Conexión de admin
      admins.add(socket.id);

      // Enviar salas existentes al admin
      salas.forEach((sala, salaId) => {
        const nombre = nombres.get(salaId) || salaId;
        socket.emit('nuevaSala', { salaId, nombre });
      });

      // Evento admin selecciona una sala
      socket.on('adminEntraSala', ({ salaId }) => {
        if (!salaId) return;
        socket.join(salaId);
        io.to(salaId).emit('chatHabilitado');
      });

      // Recibir mensaje desde el admin
      socket.on('mensajePrivado', ({ salaId, texto, usuario }) => {
        if (!salaId || !texto || !usuario) return;
        io.to(salaId).emit('mensajePrivado', { salaId, texto, usuario });
      });

      socket.on('disconnect', () => {
        admins.delete(socket.id);
      });

    } else {
      // Conexión de cliente
      const sala = socket.id;
      socket.join(sala);
      salas.set(socket.id, sala);

      // Enviar al cliente su sala
      socket.emit('asignarSala', { salaId: sala });

      // Avisar a todos los admins sobre la nueva sala
      admins.forEach(adminId => {
        io.to(adminId).emit('nuevaSala', { salaId: sala });
      });

      socket.on('nombreCliente', ({ salaId, nombre }) => {
        if (!salaId || !nombre) return;
        nombres.set(salaId, nombre);
        // Emitir actualización con el nombre a todos los admins
        admins.forEach(adminId => {
          io.to(adminId).emit('nuevaSala', { salaId, nombre });
        });
      });

      // Recibir mensaje desde el cliente
      socket.on('mensajePrivado', ({ salaId, texto, usuario }) => {
        if (!salaId || !texto || !usuario) return;
        io.to(salaId).emit('mensajePrivado', { salaId, texto, usuario });
      });

      // Verificar sala (debug)
      socket.on('verificarSala', ({ socketId }) => {
        const sala = salas.get(socketId);
        if (sala) {
          socket.emit('asignarSala', { salaId: sala });
        }
      });

      socket.on('disconnect', () => {
        salas.delete(socket.id);
        nombres.delete(socket.id);
        // Avisar a todos los admins sobre la sala cerrada
        admins.forEach(adminId => {
          io.to(adminId).emit('salaCerrada', { salaId: socket.id });
        });
      });
    }
  });
}