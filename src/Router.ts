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
    server.get("/users/by", UserController.getUserBy);
    server.get("/users/:userId", UserController.getUserById);
    server.patch("/users/:userId", UserController.updateUserById);
    server.del("/users/:userId", UserController.deleteUserById);

    server.get("/users/:userId/teams", UserController.getTeams);

    // ORGANIZATIONS
    server.get("/organizations", OrganizationController.getOrganizations);
    server.post("/organizations", OrganizationController.createOrganization);
    server.get("/organizations/by", OrganizationController.getOrganizationBy);
    server.get("/organizations/:organizationId", OrganizationController.getOrganizationById);
    server.patch("/organizations/:organizationId", OrganizationController.updateOrganizationById);
    server.del("/organizations/:organizationId", OrganizationController.deleteOrganizationById);

    server.post("/organizations/:organizationId/owner/:userId", OrganizationController.setOwner);
    server.get("/organizations/:organizationId/owner", OrganizationController.getOwner);

    server.get("/organizations/:organizationId/teams", OrganizationController.getTeams);
    server.post("/organizations/:organizationId/teams/:organizationId", OrganizationController.addTeam);
    server.del("/organizations/:organizationId/teams/:organizationId", OrganizationController.removeTeam);

    // TEAMS
    server.get("/teams", TeamController.getTeams);
    server.post("/teams", TeamController.createTeam);
    server.get("/teams/by", TeamController.getTeamBy);
    server.get("/teams/:teamId", TeamController.getTeamById);
    server.patch("/teams/:teamId", TeamController.updateTeamById);
    server.del("/teams/:teamId", TeamController.deleteTeamById);

    server.get("/teams/:teamId/users", TeamController.getUsers);
    server.post("/teams/:teamId/users/:userId", TeamController.addUser);
    server.del("/teams/:teamId/users/:userId", TeamController.removeUser);

    server.get("/teams/:teamId/organization", TeamController.getOrganization);

    server.get("/teams/:teamId/projects", TeamController.getProjects);
    server.post("/teams/:teamId/projects", TeamController.createProject);
    server.post("/teams/:teamId/projects/:projectId", TeamController.addProject);

    // PROJECTS
    server.get("/projects", ProjectController.getProjects);
    server.post("/projects", ProjectController.createProject);
    server.get("/projects/by", ProjectController.getProjectBy);
    server.get("/projects/:projectId", ProjectController.getProjectById);
    server.patch("/projects/:projectId", ProjectController.updateProjectById);
    server.del("/projects/:projectId", ProjectController.deleteProjectById);

    server.get("/projects/:projectId/versions", ProjectController.getVersions);
    server.post("/projects/:projectId/versions/:versionId", ProjectController.addVersion);

    server.get("/projects/:projectId/team", ProjectController.getTeam);

    // VERSIONS
    server.get("/versions", VersionController.getVersions);
    server.post("/versions", VersionController.createVersion);
    server.get("/versions/:versionId", VersionController.getVersion);
    server.patch("/versions/:versionId", VersionController.updateVersion);
    server.del("/versions/:versionId", VersionController.deleteVersion);

    server.get("/versions/:versionId/project", VersionController.getProject);

    server.post("/versions/:versionId/components", VersionController.createComponent);
    server.get("/versions/:versionId/components", VersionController.getComponents);
    server.post("/versions/:versionId/components/:componentId", VersionController.addComponent);
    server.del("/versions/:versionId/components/:componentId", VersionController.removeComponent);

    // COMPONENTS
    server.get("/components", ComponentController.getComponents);
    server.post("/components", ComponentController.createComponent);
    server.get("/components/:componentId", ComponentController.getComponent);
    server.get("/component", ComponentController.getComponentByUUID);
    server.patch("/components/:componentId", ComponentController.updateComponent);
    server.del("/components/:componentId", ComponentController.deleteComponent);

    // MANUFACTURERS
    server.get("/manufacturers", ManufacturerController.getManufacturers);
    server.post("/manufacturers", ManufacturerController.createManufacturer);
    server.get("/manufacturers/:manufacturerId", ManufacturerController.getManufacturer);
    server.patch("/manufacturers/:manufacturerId", ManufacturerController.updateManufacturer);
    server.del("/manufacturers/:manufacturerId", ManufacturerController.deleteManufacturer);

    server.get("/manufacturers/:manufacturerId/components", ManufacturerController.getComponents);
    server.post("/manufacturers/:manufacturerId/components/:componentId", ManufacturerController.addComponent);

}
