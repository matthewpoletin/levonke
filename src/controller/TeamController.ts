"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import TeamService from "../backend/community/TeamService";
import ProjectService from "../backend/elaboration/ProjectService";

import ITeamRequest from "../backend/community/interface/ITeamRequest";
import IUserResponse from "../backend/community/interface/IUserResponse";
import IProjectRequest from "../backend/elaboration/interface/IProjectRequest";

export default class TeamController extends AbstractController {

    public static async getTeams(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page = parseInt(req.query.page, 10) || 0;
        const size = parseInt(req.query.size, 10) || 25;
        try {
            const teamResponses = await TeamService.getTeams(page, size);
            res.json(teamResponses);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `TeamService { getTeams } error`);
        }
    }

    public static async createTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamRequest: ITeamRequest = req.body;
        try {
            const teamResponse = await TeamService.createTeam(teamRequest);
            res.json(201, teamResponse);
            return next();
        }   catch (error) {
            this.errorResponse(error, res, next, `TeamService { createTeam } error`);
        }
    }

    public static async getTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const team = await TeamService.getTeam(teamId);
            res.json(team);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService { getTeam: teamId = ${ teamId }} error`);
        }
    }

    public static async updateTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const teamRequest = req.body;
        try {
            const teamResponse = await TeamService.updateTeam(teamId, teamRequest);
            res.json(teamResponse);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `TeamService { updateTeam: teamId = ${teamId} } error`);
        }
    }

    public static async deleteTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await TeamService.deleteTeam(teamId);
            res.send(204);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService { deleteTeam: teamId = ${teamId} } error`);
        }
    }

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const userResponses: IUserResponse[] = await TeamService.getUsers(teamId);
            res.json(userResponses);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService{ getUsers: teamId = ${teamId} } error`);
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
            this.errorResponse(error, res, next, `teamService{ addUser: teamId = ${teamId}; userId = ${userId} } error`);
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
            this.errorResponse(error, res, next, `teamService{ removeUser: teamId = ${teamId}; userId = ${userId} } error`);
        }
    }

    public static async getOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const organizationResponse = await TeamService.getOrganization(teamId);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService { getOrganization: teamId = ${teamId} } error`);
        }
    }

    public static async getProjects(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await TeamService.getTeam(teamId);
            const projectResponses = await TeamService.getProjects(teamId);
            res.json(projectResponses);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService { getProjects: teamId = ${teamId} } error`);
        }
    }

    public static async createProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const projectRequest: IProjectRequest = req.body;
        try {
            await TeamService.getTeam(teamId);
            let projectResponse = await ProjectService.createProject(projectRequest);
            projectResponse = await ProjectService.setTeam(projectResponse.id, teamId);
            res.json(201, projectResponse);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService { createProject: teamId = ${teamId} } error`);
        }
    }

    public static async addProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const projectId: number = parseInt(req.params.projectId, 10);
        try {
            await TeamService.getTeam(teamId);
            await ProjectService.setTeam(projectId, teamId);
            res.send(201);
            return next();
        } catch (error) {
            this.errorResponse(error, res, next, `teamService { addProject: teamId = ${teamId}; projectId = ${projectId} } error`);
        }
    }

}
