"use strict";

import * as restify from "restify";

import TeamController from "./controller/TeamController";
import UserController from "./controller/UserController";

export default function Router(server: restify.Server) {

    // USERS
    server.get("/users", UserController.readUsers);
    server.post("/users", UserController.createUser);
    server.get("/users/:id", UserController.readUser);
    server.patch("/users/:id", UserController.updateUser);
    server.del("/users/:id", UserController.deleteUser);

    // ORGANIZATIONS
    // TODO: implement routing
    // server.get("/organizations", OrganizationController.readOrganizations);
    // server.post("/organizations", OrganizationController.createOrganization);
    // server.get("/organizations/:id", OrganizationController.readOrganization);
    // server.patch("/organizations/:id", OrganizationController.updateOrganization);
    // server.del("/organizations/:id", OrganizationController.deleteOrganization);

    // TEAMS
    server.get("/teams", TeamController.readTeams);
    server.post("/teams", TeamController.createTeam);
    server.get("/teams/:id", TeamController.readTeam);
    server.patch("/teams/:id", TeamController.updateTeam);
    server.del("/teams/:id", TeamController.deleteTeam);

}
