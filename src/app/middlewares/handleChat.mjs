import Redis from 'ioredis';

const pub = new Redis({
  host: 'redis-3445ffdc-rohitkhan4141-ec69.a.aivencloud.com',
  port: 12952,
  username: 'default',
  password: 'AVNS_wompTucbkcNN7mGxy8P',
});

const sub = new Redis({
  host: 'redis-3445ffdc-rohitkhan4141-ec69.a.aivencloud.com',
  port: 12952,
  username: 'default',
  password: 'AVNS_wompTucbkcNN7mGxy8P',
});

async function handleChat(io) {
  sub.subscribe('CHAT_MESSAGES');

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('join-chat', (userId) => {
      // Join a room based on the userId or any identifier
      socket.join(userId);
    });

    socket.on('chat-message', async ({ userId, message }) => {
      // Publish the chat message to Redis
      await pub.publish('CHAT_MESSAGES', JSON.stringify({ userId, message }));
    });
  });

  sub.on('message', async (channel, message) => {
    if (channel === 'CHAT_MESSAGES') {
      const { userId, message: chatMessage } = JSON.parse(message);

      // Emit the received chat message to the respective room (user's room)
      io.to(userId).emit('new-chat-message', chatMessage);
    }
  });
}

export { handleChat };

