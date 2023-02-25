"use strict";

const User = use("App/Models/User");
const Database = use("Database");
const ModelHelper = require("../../Helpers/ModelHelper");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response, auth }) {
    try {
        console.log("entrou")
    } catch (error) {
      console.log(error)
    }
    
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    console.log("YAY")
    const trx = await Database.beginTransaction();
    try {
        let user = request.only(User.fillable);

        const all = request.all();
        console.log(all)

        
        
        await User.create(user, trx);
        await trx.commit();

        return response.status(201).send("Created");
    } catch (e) {
      console.log(e);
      trx.rollback();
      return response.status(400).send("NotCreated");
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);
    return response.send(user);
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  
  
  async update({ params, request, response, auth }) {
    try{
      const allRequest = request.all();
     
      const user = ModelHelper.fillable(allRequest, [...User.fillable, "id"]);

      let loggedUser =  await auth.getUser();

      
    //   if (loggedUser.id !== user.id && loggedUser.role !== "admin")
    //     return response.status(401).send({ message: "Unauthorized" });

        
      const userToUpdate = await User.find(user.id);
      const trx = await Database.beginTransaction();
      
      userToUpdate.merge(user);

      console.log(user)

      await userToUpdate.save(trx);
      await trx.commit();

      return response.status(201).send("Updated");

      

      
    } catch (e) {
      console.log(e)
      trx.rollback();
      return response.status(400).send("NotUpdated");
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UserController;
