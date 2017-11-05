"use strict";

import * as restify from "restify";

import ComponentController from "./controller/ComponentController";
import ManufacturerController from "./controller/ManufacturerController";
import OrganizationController from "./controller/OrganizationController";
import ProjectController from "./controller/ProjectController";
import TeamController from "./controller/TeamController";
import UserController from "./controller/UserController";
import VersionController from "./controller/VersionController";

export default function Router(server: restify.Server) {

    // USERS
    server.get("/users", UserController.getUsers);
    server.post("/users", UserController.createUser);
    server.get("/users/:id", UserController.getUser);
    server.patch("/users/:id", UserController.updateUser);
    server.del("/users/:id", UserController.deleteUser);

    // ORGANIZATIONS
    server.get("/organizations", OrganizationController.getOrganizations);
    server.post("/organizations", OrganizationController.createOrganization);
    server.get("/organizations/:id", OrganizationController.getOrganization);
    server.patch("/organizations/:id", OrganizationController.updateOrganization);
    server.del("/organizations/:id", OrganizationController.deleteOrganization);

    // TEAMS
    server.get("/teams", TeamController.getTeams);
    server.post("/teams", TeamController.createTeam);
    server.get("/teams/:id", TeamController.getTeam);
    server.patch("/teams/:id", TeamController.updateTeam);
    server.del("/teams/:id", TeamController.deleteTeam);

    // PROJECTS
    server.get("/projects", ProjectController.getProjects);
    server.post("/projects", ProjectController.createProject);
    server.get("/projects/:id", ProjectController.getProject);
    server.patch("/projects/:id", ProjectController.updateProject);
    server.del("/projects/:id", ProjectController.deleteProject);

    // VERSIONS
    server.get("/versions", VersionController.getVersions);
    server.post("/versions", VersionController.createVersion);
    server.get("/versions/:id", VersionController.getVersion);
    server.patch("/versions/:id", VersionController.updateVersion);
    server.del("/versions/:id", VersionController.deleteVersion);

    // COMPONENTS
    server.get("/components", ComponentController.getComponents);
    server.post("/components", ComponentController.createComponent);
    server.get("/components/:id", ComponentController.getComponent);
    server.patch("/components/:id", ComponentController.updateComponent);
    server.del("/components/:id", ComponentController.deleteComponent);

    // MANUFACTURERS
    server.get("/manufacturers", ManufacturerController.getManufacturers);
    server.post("/manufacturers", ManufacturerController.createManufacturer);
    server.get("/manufacturers/:id", ManufacturerController.getManufacturer);
    server.patch("/manufacturers/:id", ManufacturerController.updateManufacturer);
    server.del("/manufacturers/:id", ManufacturerController.deleteManufacturer);

}
