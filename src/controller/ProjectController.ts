"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import ProjectService from "../backend/elaboration/ProjectService";

import IProjectRequest from "../backend/elaboration/interface/IProjectRequest";

export default class ProjectController extends AbstractController {


    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readProjects(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.params.page, 10) || 0;
        try {
            const projectResponses = await ProjectService.getProjects(page);
            return res.json(projectResponses);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ProjectService { getProjects } error"));
        }
    }

    public static async createProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectRequest: IProjectRequest = req.body;
        try {
            const projectResponse = await ProjectService.createProject(projectRequest);
            return res.json(201, projectResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ProjectService { createProject } error"));
        }
    }

    public static async readProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId = parseInt(req.params.id, 10);
        try {
            const projectResponse = await ProjectService.getProject(projectId);
            return res.json(projectResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableErorr(`ProjectService {readProject: projectId = ${projectId}} error`));
        }
    }

    public static async updateProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId = parseInt(req.params.id, 10);
        const projectRequest = req.body;
        return res.json(await ProjectService.updateProject(projectId, projectRequest));
    }

    public static async deleteProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const projectId = parseInt(req.body.id, 10);
        try {
            await ProjectService.deleteProject(projectId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ProjectService { deleteProject: projectId = ${projectId} } error`));
        }
    }
}
