"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import VersionService from "../backend/elaboration/VersionService";

import IVersionRequest from "../backend/elaboration/interface/IVersionRequest";
import ComponentService from "../backend/supply/ComponentService";

interface ProjectResponse {
}

export default class VersionController extends AbstractController {

    public static async getVersions(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const versionResponses = await VersionService.getVersions(page, size);
            res.json(versionResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("VersionService { getVersions } error"));
        }
    }

    public static async createVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionRequest: IVersionRequest = req.body;
        try {
            const versionResponse = await VersionService.createVersion(versionRequest);
            res.json(201, versionResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("VersionService { createVersion } error"));
        }
    }

    public static async getVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            const versionResponse = await VersionService.getVersion(versionId);
            res.json(versionResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { getVersion: versionId = ${versionId}} error`));
        }
    }

    public static async updateVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId = parseInt(req.params.versionId, 10);
        const versionRequest = req.body;
        try {
            const versionResponse = await VersionService.updateVersion(versionId, versionRequest);
            res.json(versionResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { updateVersion: versionId = ${versionId} } error`));
        }
    }

    public static async deleteVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            await VersionService.deleteVersion(versionId);
            res.send(204);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { deleteVersion: versionId = ${versionId} } error`));
        }
    }

    public static async getProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            const projectResponse = await VersionService.getProject(versionId);
            res.json(projectResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { deleteVersion: versionId = ${versionId} } error`));
        }
    }

    // TODO: uuid
    public static async getComponents(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            const componentResponses = await VersionService.getComponents(versionId);
            res.json(componentResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { getComponents: versionId = ${versionId} } error`));
        }
    }

    public static async addComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        const componentId: number = parseInt(req.params.componentId, 10);
        try {
            const componentRequest = await ComponentService.getComponent(componentId);
            await VersionService.addComponent(versionId, componentRequest);
            res.send(201);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { addComponent: versionId = ${versionId}; componentId = ${componentId} } error`));
        }
    }

    public static async removeComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        const componentId: number = parseInt(req.params.componentId, 10);
        try {
            const componentRequest = await ComponentService.getComponent(componentId);
            await VersionService.removeComponent(versionId, componentRequest);
            res.send(201);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { removeComponent: versionId = ${versionId}; componentId = ${componentId} } error`));
        }
    }

}
