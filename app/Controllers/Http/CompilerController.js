'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = use('axios')

/**
 * Resourceful controller for interacting with compilers
 */
class CompilerController {
  /**
   * Show a list of all compilers.
   * GET compilers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new compiler.
   * GET compilers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new compiler.
   * POST compilers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
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
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return {output: error}
    }
  }

  /**
   * Display a single compiler.
   * GET compilers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing compiler.
   * GET compilers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update compiler details.
   * PUT or PATCH compilers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a compiler with id.
   * DELETE compilers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CompilerController
