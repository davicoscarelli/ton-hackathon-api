const Ws = use('Ws')

function broadcast (id, type, data) {
  console.log("EMTRA", id, type, data)
  const channel = Ws.getChannel('room:*')
  console.log("AAA", channel)
  if (!channel) return

  const topic = channel.topic(`room:${id}`)
  if (!topic) {
    console.error('Has no topic')
    return
  }
  console.log("broadcast")
  // emit, broadcast, broadcastToAll
  topic.broadcastToAll(`message`, {
    type,
    data
  });
}

module.exports = {
  broadcast
}
