"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import ProjectService from "../backend/elaboration/ProjectService";

import IProjectRequest from "../backend/elaboration/interface/IProjectRequest";
import TeamService from "../backend/community/TeamService";

export default class ProjectController extends AbstractController {

    public static async getProjects(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const projectResponses = await ProjectService.getProjects(page, size);
            res.json(projectResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ProjectService { getProjects } error"));
        }
    }

    public static async createProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectRequest: IProjectRequest = req.body;
        try {
            const projectResponse = await ProjectService.createProject(projectRequest);
            res.json(201, projectResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ProjectService { createProject } error"));
        }
    }

    public static async getProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.projectId, 10);
        try {
            const projectResponse = await ProjectService.getProject(projectId);
            res.json(projectResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { getProject: projectId = ${projectId}} error`));
        }
    }

    public static async updateProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.projectId, 10);
        const projectRequest = req.body;
        try {
            const projectResponse = await ProjectService.updateProject(projectId, projectRequest);
            res.json(projectResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`UserProject { updateProject: projectId = ${projectId} } error`));
        }
    }

    public static async deleteProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.projectId, 10);
        try {
            await ProjectService.deleteProject(projectId);
            res.send(204);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { deleteProject: projectId = ${projectId} } error`));
        }
    }

    public static async getVersions(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.projectId, 10);
        try {
            const versionResponses = await ProjectService.getVersions(projectId);
            res.json(versionResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { getVersions: projectId = ${projectId} } error`));
        }
    }

    public static async addVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.projectId, 10);
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            await ProjectService.addVersion(projectId, versionId);
            res.send(201);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { addVersion: projectId = ${projectId}; versionId = ${versionId} } error`));
        }
    }

    public static async getTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.projectId, 10);
        try {
            const teamId = (await ProjectService.getProject(projectId)).id;
            const teamResponse = await TeamService.getTeam(teamId);
            res.json(teamResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { deleteProject: projectId = ${projectId} } error`));
        }
    }

}
