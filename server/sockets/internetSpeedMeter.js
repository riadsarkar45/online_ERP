const speedMeter = (socket, io) => {
  socket.on('start-speed-test', () => {
    console.log(`Speed test started by ${socket.id}`);

    const results = {
      userId: socket.id,              // Include who started the test
      download: Math.floor(Math.random() * 100) + 1,
      upload: Math.floor(Math.random() * 50) + 1,
      ping: Math.floor(Math.random() * 50) + 1,
    };

    // Broadcast to all clients including sender
    io.emit('speed-test-result', results);
  });
};

module.exports = speedMeter;
