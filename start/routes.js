'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
    Route.post("login", "AuthController.login").as("auth.login");
    Route.post("refresh", "AuthController.refresh").as("auth.refresh");
    Route.post("logout", "AuthController.logout").as("auth.logout");
    Route.post("me", "AuthController.me").as("auth.me");

}).prefix("v1/auth")


Route.group(() => {
    Route.put("users", "UserController.update").as("users.update");
    Route.post("users", "UserController.store").as("users.store");
    Route.get("users/:id", "UserController.show").as("users.show");

}).prefix("v1")

Route.group(() => {
    Route.post("compiler", "CompilerController.store").as("compiler.store");

}).prefix("v1")

// Route.group(() => {
//     Route.put("rooms", "RoomController.update").as("rooms.update");
//     Route.post("rooms", "RoomController.store").as("rooms.store");
//     Route.get("rooms/:id", "RoomController.show").as("rooms.show");

// }).prefix("v1")

Route.group(() => {
    Route.post('room', 'RoomController.create')

    Route.get('room/:id', 'RoomController.select')
    Route.post('room/:id', 'RoomController.createMessage')
  })
  .prefix('v1')


