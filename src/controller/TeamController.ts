"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import TeamService from "../backend/community/TeamService";
import UserService from "../backend/community/UserService";
import ProjectService from "../backend/elaboration/ProjectService";

import IOrganizationResponse from "../backend/community/interface/IOrganizationResponse";
import ITeamRequest from "../backend/community/interface/ITeamRequest";
import ITeamResponse from "../backend/community/interface/ITeamResponse";
import IProjectRequest from "../backend/elaboration/interface/IProjectRequest";
import IProjectResponse from "../backend/elaboration/interface/IProjectResponse";
import IUserResponse from "../backend/community/interface/IUserResponse";

export default class TeamController extends AbstractController {

    public static async getTeams(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page = parseInt(req.query.page, 10) || 0;
        const size = parseInt(req.query.size, 10) || 25;
        try {
            const teamResponses = await TeamService.getTeams(page, size);
            res.json(teamResponses);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `TeamService { getTeams } error`);
        }
    }

    public static async createTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamRequest: ITeamRequest = req.body;
        try {
            const teamResponse: ITeamResponse = await TeamService.createTeam(teamRequest);
            res.json(201, teamResponse);
            return next();
        }   catch (error) {
            TeamController.errorResponse(error, res, next, `TeamService { createTeam } error`);
        }
    }

    public static async getTeamById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const teamResponse: ITeamResponse = await TeamService.getTeamById(teamId);
            res.json(teamResponse);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { getTeamById: teamId = ${ teamId }} error`);
        }
    }

    public static async getTeamBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamName: string = req.query.name;
        try {
            const teamResponse: ITeamResponse = await TeamService.getTeamBy({name: teamName});
            res.json(teamResponse);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { getTeamByName: teamId = ${ teamName }} error`);
        }
    }

    public static async updateTeamById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const teamRequest = req.body;
        try {
            const teamResponse: ITeamResponse = await TeamService.updateTeamById(teamId, teamRequest);
            res.json(teamResponse);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `TeamService { updateTeamById: teamId = ${teamId} } error`);
        }
    }

    public static async deleteTeamById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await TeamService.deleteTeamById(teamId);
            res.send(204);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { deleteTeamById: teamId = ${teamId} } error`);
        }
    }

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const userIdResponses: number[] = await TeamService.getUsers(teamId);
            const userResponsePromises = [];
            userIdResponses.forEach((userId) => {
                userResponsePromises.push(UserService.getUserById(userId));
            });
            const usersResponse: IUserResponse[] = await Promise.all(userResponsePromises);
            res.json(usersResponse);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService{ getUsers: teamId = ${teamId} } error`);
        }
    }

    public static async addUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        try {
            await TeamService.addUser(teamId, userId);
            res.send(201);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService{ addUser: teamId = ${teamId}; userId = ${userId} } error`);
        }
    }

    public static async removeUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        try {
            await TeamService.removeUser(teamId, userId);
            res.send(204);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService{ removeUser: teamId = ${teamId}; userId = ${userId} } error`);
        }
    }

    public static async getOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const organizationResponse: IOrganizationResponse = await TeamService.getOrganization(teamId);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { getOrganization: teamId = ${teamId} } error`);
        }
    }

    public static async getProjects(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await TeamService.getTeamById(teamId);
            const projectResponses = await TeamService.getProjects(teamId);
            res.json(projectResponses);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { getProjects: teamId = ${teamId} } error`);
        }
    }

    public static async createProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const projectRequest: IProjectRequest = req.body;
        try {
            let projectResponse: IProjectResponse = await ProjectService.createProject(projectRequest);
            try {
                await TeamService.getTeamById(teamId);
                projectResponse = await ProjectService.setTeam(projectResponse.id, teamId);
                res.json(201, projectResponse);
                return next();
            } catch (error) {
                await ProjectService.deleteProject(projectResponse.id);
                res.send(503);
                return next();
            }
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { createProject: teamId = ${teamId} } error`);
        }
    }

    public static async addProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const projectId: number = parseInt(req.params.projectId, 10);
        try {
            await TeamService.getTeamById(teamId);
            await ProjectService.setTeam(projectId, teamId);
            res.send(201);
            return next();
        } catch (error) {
            TeamController.errorResponse(error, res, next, `teamService { addProject: teamId = ${teamId}; projectId = ${projectId} } error`);
        }
    }
}
