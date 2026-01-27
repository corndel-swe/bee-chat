import { WebSocketServer } from 'ws'
import User from './models/User.js'

const server = new WebSocketServer({ port: 5001 })

server.on('connection', configureSocket)

function configureSocket(socket) {
  const user = new User(socket)

  console.log(`User ${user.id} created.`)

  socket.on('message', message => sendMessage(message, user))

  socket.on('close', () => {
    user.delete()
  })
}

function sendMessage(message, sender) {
  const { recipientId, content } = JSON.parse(message)

  const sendable = JSON.stringify({
    senderId: sender.id,
    content
  })

  if (recipientId) {
    const recipient = User.find(recipientId)
    sender.ws.send(sendable)
    recipient.ws.send(sendable)
  } else {
    for (let recipient of User.findAll()) {
      recipient.ws.send(sendable)
    }
  }
}
