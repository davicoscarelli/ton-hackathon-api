'use strict'

class RoomUpdateController {
  constructor ({ socket, request }) {
    console.log("FILHA DA PUTA")
    this.socket = socket
    this.request = request
    
    console.log('A new subscription for room topic', socket.topic)
  }
  onReady () {
    console.log('ready');
    this.socket.toMe().emit('my:id', this.socket.socket.id)
  }

  onMessage (message) {
    console.log('got message', message)
  }

  onClose () {
    console.log('Closing subscription for room topic', this.socket.topic)
  }
}

module.exports = RoomUpdateController

