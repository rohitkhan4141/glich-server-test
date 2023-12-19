import Redis from 'ioredis';
import Document from '../modules/documents/Document.model.mjs';

// Create Redis clients
const redisClient = new Redis({
  host: 'redis-3445ffdc-rohitkhan4141-ec69.a.aivencloud.com',
  port: 12952,
  username: 'default',
  password: 'AVNS_wompTucbkcNN7mGxy8P',
});

async function handleSocket(io) {
  io.on('connection', (socket) => {
    socket.on('get-document', async (documentId) => {
      const document = await findOrCreateDocumentFromCache(documentId);

      // If the document is not found in the cache, fetch it from the database
      if (!document) {
        const docFromDB = await findOrCreateDocumentFromDB(documentId);
        if (docFromDB) {
          // Store the document in the cache for future use
          await setDocumentInCache(documentId, docFromDB.content);
          socket.emit('load-document', docFromDB.content);
        }
      } else {
        socket.emit('load-document', document);
      }

      socket.join(documentId);

      socket.on('send-changes', (delta) => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
      });

      socket.on('save-document', async (data) => {
        await updateDocumentInDB(documentId, data);
        // Update the document in the cache as well
        await setDocumentInCache(documentId, data);
      });
    });
  });
}

async function findOrCreateDocumentFromDB(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  return document;
}

async function findOrCreateDocumentFromCache(id) {
  if (id == null) return;

  const document = await redisClient.get(`document:${id}`);
  return document ? JSON.parse(document) : null;
}

async function setDocumentInCache(id, content) {
  await redisClient.set(`document:${id}`, JSON.stringify(content));
}

async function updateDocumentInDB(id, content) {
  if (id == null) return;

  await Document.findByIdAndUpdate(id, { content });
}

export { handleSocket };

