export default function (io) {
  const salas = new Map();
  const nombres = new Map();
  const admins = new Set();

  io.on('connection', (socket) => {
    const tipo = socket.handshake.query.tipo;

    if (tipo === 'admin') {
      // Conexión de admin
      admins.add(socket.id);
      console.log(`Admin conectado: ${socket.id}`)

      // Enviar salas existentes al admin
      salas.forEach((sala, salaId) => {
        if (!admins.has(salaId)) {
          const nombre = nombres.get(salaId) || salaId;
          socket.emit('nuevaSala', { salaId, nombre });
          console.log(`Enviando sala existente al admin: ${salaId} - ${nombre}`);
        }
      });

      socket.on('adminEntraSala', ({ salaId }) => {
        if (!salaId) return;
        socket.join(salaId);
        io.to(salaId).emit('chatHabilitado');
        console.log(`Admin ${socket.id} entró a sala: ${salaId}`);
      });

      socket.on('mensajePrivado', ({ salaId, texto, usuario }) => {
        if (!salaId || !texto || !usuario) return;
        io.to(salaId).emit('mensajePrivado', { salaId, texto, usuario });
      });

      socket.on('cerrarSalaManual', ({ salaId }) => {
        io.to(salaId).emit('chatCerrado');
        io.socketsLeave(salaId);

        // Limpiar datos de la sala cerrada
        salas.delete(salaId);
        nombres.delete(salaId);

        // Notificar a otros admins
        admins.forEach(adminId => {
          if (adminId !== socket.id) {
            io.to(adminId).emit('salaCerrada', { salaId });
          }
        });
      });

      socket.on('disconnect', () => {
        // El admin no tiene sala propia, solo limpiamos si por error se creó
        if (salas.has(socket.id)) {
          console.log(`Admin desconectado: ${socket.id}`);
          admins.delete(socket.id);
        }
      });

    } else {
      // Conexión de cliente
      const sala = socket.id;
      socket.join(sala);
      salas.set(socket.id, sala);
      console.log(`Cliente conectado: ${socket.id}`);

      socket.emit('asignarSala', { salaId: sala });

      admins.forEach(adminId => {
        io.to(adminId).emit('nuevaSala', { salaId: sala, nombre: sala });
      });

      socket.on('nombreCliente', ({ salaId, nombre }) => {
        if (!salaId || !nombre) return;

        nombres.set(salaId, nombre);
        console.log(`Cliente ${salaId} estableció nombre: ${nombre}`);

        admins.forEach(adminId => {
          io.to(adminId).emit('actualizarNombreSala', { salaId, nombre });
        });
      });

      socket.on('mensajePrivado', ({ salaId, texto, usuario }) => {
        if (!salaId || !texto || !usuario) return;
        io.to(salaId).emit('mensajePrivado', { salaId, texto, usuario });
      });

      socket.on('verificarSala', ({ socketId }) => {
        const sala = salas.get(socketId);

        if (sala) {
          socket.emit('asignarSala', { salaId: sala });
        }
      });

      socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
        salas.delete(socket.id);
        nombres.delete(socket.id);
        admins.forEach(adminId => {
          io.to(adminId).emit('salaCerrada', { salaId: socket.id });
        });
      });
    }
  });
}
