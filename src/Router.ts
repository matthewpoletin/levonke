"use strict";

import * as restify from "restify";

import UserController from "./controller/UserController";

export default function Router(server: restify.Server) {

    server.get("/users", UserController.readUsers);
    server.post("/users", UserController.createUser);
    server.get("/users/:id", UserController.readUser);
    server.patch("/users/:id", UserController.updateUser);
    server.del("/users/:id", UserController.deleteUser);

}
