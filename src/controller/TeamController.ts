"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import TeamService from "../backend/community/TeamService";
import ProjectService from "../backend/elaboration/ProjectService";

import ITeamRequest from "../backend/community/interface/ITeamRequest";

export default class TeamController extends AbstractController {

    public static async getTeams(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page = parseInt(req.query.page, 10) || 0;
        const size = parseInt(req.query.size, 10) || 25;
        try {
            const teamResponses = await TeamService.getTeams(page, size);
            res.json(teamResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("TeamService { getTeams } error"));
        }
    }

    public static async createTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamRequest: ITeamRequest = req.body;
        try {
            const teamResponse = await TeamService.createTeam(teamRequest);
            res.json(201, teamResponse);
            return next();
        }   catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("TeamService { createTeam } error"));
        }
    }

    public static async getTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const team = await TeamService.getTeam(teamId);
            res.json(team);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableError(`teamService { getTeam: teamId = ${ teamId }} error`));
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
            return next(new restifyErrors.ServiceUnavailableError(`TeamService { updateTeam: teamId = ${teamId} } error`));
        }
    }

    public static async deleteTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await TeamService.deleteTeam(teamId);
            res.send(204);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`teamService { deleteTeam: teamId = ${teamId} } error`));
        }
    }

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const userResponses = await TeamService.getUsers(teamId);
            res.json(userResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`teamService{ getUsers: teamId = ${teamId} } error`));
        }
    }

    public static async addUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        try {
            await TeamService.addUser(teamId, userId);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`teamService{ addUser: teamId = ${teamId}; userId = ${userId} } error`));
        }
    }

    public static async removeUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        try {
            await TeamService.removeUser(teamId, userId);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`teamService{ removeUser: teamId = ${teamId}; userId = ${userId} } error`));
        }
    }

    public static async getOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            const organizationResponse = await TeamService.getOrganization(teamId);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`teamService { getOrganization: teamId = ${teamId} } error`));
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
            return next(new restifyErrors.ServiceUnavailableError(`teamService { getProjects: teamId = ${teamId} } error`));
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
            return next(new restifyErrors.ServiceUnavailableError(`teamService { addProject: teamId = ${teamId}; projectId = ${projectId} } error`));
        }
    }

}
