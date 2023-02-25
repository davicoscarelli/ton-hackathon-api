'use strict';

// const uuidv4 = require('uuid/v4');

const Room = use('App/Models/Room');
const axios = use('axios')



const { broadcast } = require('../../Utils/socket.utils');
const { generateToken } = require('../../Utils/room.token');

class RoomController {
  async select ({ params, response }) {
    const room = await Room
      .query()
      .where('uuid', params.id)
      .with('messages')
      .first();

    if (!room) {
      return response.notFound(`The room doesn't exist`)
    }

    return room;
  }

  async create () {
    const room = new Room();
    // const uuid = uuidv4();
    const uuid = await generateToken({byteLength: 6});

    room.uuid = uuid;
    console.log(room)
    await room.save();
    return Room.find(uuid)
  }

  async createMessage ({ params, request, response }) {
    const room = await Room.find(params.id);
    if (!room) {
      return response.notFound(`The room doesn't exist`)
    }

    const data = request.only(['name', 'message']);
    const message = await room.messages().create(data);

    // send the message upon new message creation
    // define a type for the frontend app - "room:newMessage"
    broadcast(room.uuid, 'room:newMessage', message);

    return message
  }

  async compile ({ params, request, response }) {
    try {
      console.log("AAA", request)
      console.log("BBB", params)
      let payload = { 
        ...request.all(),
        clientId: "48b0b68b0be94ad3587d4c7065a023c7",
        clientSecret: "11b8bb4e2e1875a981560ecb7be82456022c08d601c284a9cf8f4cffa3a5ccf7"
    
      }
      console.log(payload)
      let response = axios.post('https://api.jdoodle.com/v1/execute', payload, {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
      });
      return response
    } catch (error) {
      console.log(error)
      return {output: error}
    }
  }
}

module.exports = RoomController;
