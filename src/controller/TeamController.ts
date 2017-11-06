"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import TeamService from "../backend/community/TeamService";

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
            return next(new restifyErrors.ServiceUnavailableError(`teamService { deleteTeam: teamId = ${ teamId} } error`));
        }
    }

}
