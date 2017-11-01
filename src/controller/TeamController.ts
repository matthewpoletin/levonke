"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import TeamService from "../backend/community/TeamService";
import {error} from "util";
import ITeamRequest from "../backend/community/interface/ITeamRequest";

export default class TeamController extends AbstractController {

    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readTeams(req: restify.Request, res: restify.Response, next: restify.Next) {
        throw new Error("Method is not implemented yet");
    }

    public static async createTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamRequest: ITeamRequest = req.body;
        try {
            const teamResponse = await TeamService.createTeam(teamRequest);
            return res.json(201, teamResponse);
        }   catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("Method is not implemented yet"));
        }
    }

    public static async readTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId: number = parseInt(req.params.id, 10);
        try {
            const team = await TeamService.getTeam(teamId);
            return res.json(team);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableError(`teamService {readTeam: teamId = ${ teamId }} error`));
        }
    }

    public static async updateTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId = parseInt(req.params.id, 10);
        const teamRequest = req.body;
        return res.json(await TeamService.updateTeam(teamId, teamRequest));
    }

    public static async deleteTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const teamId = parseInt(req.params.id, 10);
        try {
            await TeamService.deleteTeam(teamId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`teamService { deleteTeam: teamId = ${ teamId} } error`));
        }
    }

}
