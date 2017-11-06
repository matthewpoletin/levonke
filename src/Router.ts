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
    server.get("/users/:userId", UserController.getUser);
    server.patch("/users/:userId", UserController.updateUser);
    server.del("/users/:userId", UserController.deleteUser);

    // TODO:
    // server.get("/users/:userId/teams", UserController.getTeams);
    // server.post("/users/:userId/teams/:teamId", UserController.addTeam);
    // server.del("/users/:userId/teams/:teamId", UserController.removeTeam);

    // ORGANIZATIONS
    server.get("/organizations", OrganizationController.getOrganizations);
    server.post("/organizations", OrganizationController.createOrganization);
    server.get("/organizations/:organizationId", OrganizationController.getOrganization);
    server.patch("/organizations/:organizationId", OrganizationController.updateOrganization);
    server.del("/organizations/:organizationId", OrganizationController.deleteOrganization);

    // TODO:
    // server.get("/organizations/:id/owner", OrganizationController.getOwner);
    // server.post("/organizations/:id/owner/:userId", OrganizationController.setOwner);
    // server.del("/organizations/:id/owner/:userId", OrganizationController.removeOwner);

    // TEAMS
    server.get("/teams", TeamController.getTeams);
    server.post("/teams", TeamController.createTeam);
    server.get("/teams/:teamId", TeamController.getTeam);
    server.patch("/teams/:teamId", TeamController.updateTeam);
    server.del("/teams/:teamId", TeamController.deleteTeam);

    // TODO:
    // server.get("/teams/:id/organization", TeamController.getOrganization);
    // server.post("/teams/:id/organization/:organizationId", TeamController.setOrganization);
    // server.del("/teams/:id/organization/:organizationId", TeamController.deleteOrganization);

    // TODO:
    // server.get("/teams/:teamId/users", TeamController.getUsers);
    // server.post("/teams/:teamId/users/:userId", TeamController.addUser);
    // server.del("/teams/:teamId/users/:userId", TeamController.removeUser);

    // TODO:
    server.get("/teams/:teamId/projects", TeamController.getProjects);
    // server.post("/teams/:teamId/projects/:projectId", TeamController.addProject);
    // server.del("/teams/:teamId/projects/:projectId", TeamController.removeProject);

    // PROJECTS
    server.get("/projects", ProjectController.getProjects);
    server.post("/projects", ProjectController.createProject);
    server.get("/projects/:projectId", ProjectController.getProject);
    server.patch("/projects/:projectId", ProjectController.updateProject);
    server.del("/projects/:projectId", ProjectController.deleteProject);

    // TODO:
    // server.get("/projects/:id/versions", ProjectController.deleteProject);
    // server.post("/projects/:id/versions/:id", ProjectController.deleteProject);
    // server.del("/projects/:id/versions/:id", ProjectController.deleteProject);

    // TODO:
    server.get("/projects/:projectId/team", ProjectController.getTeam);

    // VERSIONS
    server.get("/versions", VersionController.getVersions);
    server.post("/versions", VersionController.createVersion);
    server.get("/versions/:versionId", VersionController.getVersion);
    server.patch("/versions/:versionId", VersionController.updateVersion);
    server.del("/versions/:versionId", VersionController.deleteVersion);

    // TODO:
    // server.get("/versions/:id/project", VersionController.getProject);
    // server.post("/versions/:versionId/project/:projectId", VersionController.addProject);
    // server.del("/versions/:versionId/project/:projectId", VersionController.removeVersion);

    // TODO:
    // server.get("/versions/:id/components", VersionController.getComponents);
    // server.post("/versions/:versionId/components/:componentId", VersionController.addComponent);
    // server.del("/versions/:versionId/components/:componentId", VersionController.removeComponent);

    // COMPONENTS
    server.get("/components", ComponentController.getComponents);
    server.post("/components", ComponentController.createComponent);
    server.get("/components/:componentId", ComponentController.getComponent);
    server.patch("/components/:componentId", ComponentController.updateComponent);
    server.del("/components/:componentId", ComponentController.deleteComponent);

    // MANUFACTURERS
    server.get("/manufacturers", ManufacturerController.getManufacturers);
    server.post("/manufacturers", ManufacturerController.createManufacturer);
    server.get("/manufacturers/:manufacturerId", ManufacturerController.getManufacturer);
    server.patch("/manufacturers/:manufacturerId", ManufacturerController.updateManufacturer);
    server.del("/manufacturers/:manufacturerId", ManufacturerController.deleteManufacturer);

    // TODO:
    // server.get("/manufacturers/:manufacturerId/components", ManufacturerController.getComponent);
    // server.post("/manufacturers/:manufacturerId/components/:componentId", ManufacturerController.getComponent);
    // server.del("/manufacturers/:manufacturerId/components/:componentId", ManufacturerController.removeComponent);

}
