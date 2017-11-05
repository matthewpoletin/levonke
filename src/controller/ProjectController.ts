"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import ProjectService from "../backend/elaboration/ProjectService";

import IProjectRequest from "../backend/elaboration/interface/IProjectRequest";

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
        const projectId: number = parseInt(req.params.id, 10);
        try {
            const projectResponse = await ProjectService.getProject(projectId);
            res.json(projectResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { getProject: projectId = ${projectId}} error`));
        }
    }

    public static async updateProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.params.id, 10);
        const projectRequest = req.body;
        try {
            const projectResponse = await ProjectService.updateProject(projectId, projectRequest)
            res.json(projectResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`UserProject { updateProject: projectId = ${projectId} } error`));
        }
    }

    public static async deleteProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId: number = parseInt(req.body.id, 10);
        try {
            await ProjectService.deleteProject(projectId);
            res.send(204);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { deleteProject: projectId = ${projectId} } error`));
        }
    }
}
